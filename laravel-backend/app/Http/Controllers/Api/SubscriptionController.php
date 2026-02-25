<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Subscription;
use App\Models\MembershipPlan;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class SubscriptionController extends Controller
{
    /**
     * Get user's subscriptions
     * GET /api/subscriptions
     */
    public function index(Request $request)
    {
        $subscriptions = Subscription::where('user_id', $request->user()->id)
            ->with('plan')
            ->orderBy('created_at', 'desc')
            ->get();
        
        return response()->json([
            'success' => true,
            'data' => $subscriptions->map(fn($sub) => [
                'id' => $sub->id,
                'status' => $sub->status,
                'start_date' => $sub->start_date,
                'end_date' => $sub->end_date,
                'days_remaining' => $sub->daysRemaining(),
                'is_active' => $sub->isActive(),
                'is_expiring_soon' => $sub->isExpiringSoon(),
                'auto_renew' => $sub->auto_renew,
                'plan' => $sub->plan ? [
                    'id' => $sub->plan->id,
                    'name' => $sub->plan->name,
                    'price' => $sub->plan->price,
                    'formatted_price' => $sub->plan->formatted_price,
                    'duration' => $sub->plan->duration,
                ] : null,
            ])
        ]);
    }

    /**
     * Get user's active subscription
     * GET /api/subscriptions/active
     */
    public function active(Request $request)
    {
        $subscription = Subscription::where('user_id', $request->user()->id)
            ->active()
            ->with('plan')
            ->first();
        
        if (!$subscription) {
            return response()->json([
                'success' => false,
                'message' => 'No active subscription found'
            ], 404);
        }
        
        return response()->json([
            'success' => true,
            'data' => [
                'id' => $subscription->id,
                'status' => $subscription->status,
                'start_date' => $subscription->start_date,
                'end_date' => $subscription->end_date,
                'days_remaining' => $subscription->daysRemaining(),
                'is_expiring_soon' => $subscription->isExpiringSoon(),
                'auto_renew' => $subscription->auto_renew,
                'plan' => [
                    'id' => $subscription->plan->id,
                    'name' => $subscription->plan->name,
                    'description' => $subscription->plan->description,
                    'price' => $subscription->plan->price,
                    'formatted_price' => $subscription->plan->formatted_price,
                    'duration' => $subscription->plan->duration,
                    'features' => $subscription->plan->features,
                    'max_classes_per_week' => $subscription->plan->max_classes_per_week,
                    'includes_personal_training' => $subscription->plan->includes_personal_training,
                    'includes_nutrition_plan' => $subscription->plan->includes_nutrition_plan,
                ],
            ]
        ]);
    }

    /**
     * Create new subscription
     * POST /api/subscriptions
     */
    public function store(Request $request)
    {
        $user = $request->user();
        
        $validator = Validator::make($request->all(), [
            'plan_id' => 'required|exists:membership_plans,id',
            'payment_method' => 'required|string',
            'stripe_payment_method_id' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        // Check for existing active subscription
        $existingActive = Subscription::where('user_id', $user->id)
            ->active()
            ->first();
            
        if ($existingActive) {
            return response()->json([
                'success' => false,
                'message' => 'You already have an active subscription'
            ], 400);
        }

        $plan = MembershipPlan::findOrFail($request->plan_id);
        
        if (!$plan->is_active) {
            return response()->json([
                'success' => false,
                'message' => 'This plan is not available'
            ], 400);
        }

        try {
            DB::beginTransaction();
            
            // Calculate subscription dates
            $startDate = now();
            $endDate = now()->addDays($plan->duration);
            
            // Create subscription
            $subscription = Subscription::create([
                'user_id' => $user->id,
                'plan_id' => $plan->id,
                'status' => 'ACTIVE',
                'start_date' => $startDate,
                'end_date' => $endDate,
                'payment_method' => $request->payment_method,
                'amount_paid' => $plan->price,
                'auto_renew' => true,
            ]);
            
            // Create payment record
            Payment::create([
                'user_id' => $user->id,
                'subscription_id' => $subscription->id,
                'amount' => $plan->price,
                'status' => 'COMPLETED',
                'type' => 'SUBSCRIPTION',
                'payment_method' => $request->payment_method,
                'description' => "Subscription to {$plan->name} plan",
            ]);
            
            DB::commit();
            
            return response()->json([
                'success' => true,
                'message' => 'Subscription created successfully',
                'data' => [
                    'id' => $subscription->id,
                    'status' => $subscription->status,
                    'start_date' => $subscription->start_date,
                    'end_date' => $subscription->end_date,
                    'days_remaining' => $subscription->daysRemaining(),
                    'plan' => [
                        'name' => $plan->name,
                        'price' => $plan->price,
                    ],
                ]
            ], 201);
            
        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to create subscription: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Cancel subscription
     * POST /api/subscriptions/{id}/cancel
     */
    public function cancel(Request $request, $id)
    {
        $subscription = Subscription::where('user_id', $request->user()->id)
            ->findOrFail($id);
        
        if ($subscription->status !== 'ACTIVE') {
            return response()->json([
                'success' => false,
                'message' => 'Only active subscriptions can be cancelled'
            ], 400);
        }
        
        $validator = Validator::make($request->all(), [
            'cancellation_reason' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }
        
        $subscription->update([
            'status' => 'CANCELLED',
            'cancelled_at' => now(),
            'auto_renew' => false,
            'cancellation_reason' => $request->cancellation_reason,
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'Subscription cancelled successfully',
            'data' => [
                'id' => $subscription->id,
                'status' => $subscription->status,
                'end_date' => $subscription->end_date,
            ]
        ]);
    }

    /**
     * Renew subscription
     * POST /api/subscriptions/{id}/renew
     */
    public function renew(Request $request, $id)
    {
        $subscription = Subscription::where('user_id', $request->user()->id)
            ->with('plan')
            ->findOrFail($id);
        
        if ($subscription->status !== 'CANCELLED' && $subscription->status !== 'EXPIRED') {
            return response()->json([
                'success' => false,
                'message' => 'Only cancelled or expired subscriptions can be renewed'
            ], 400);
        }
        
        $plan = $subscription->plan;
        
        try {
            DB::beginTransaction();
            
            // Calculate new dates
            $startDate = now();
            $endDate = now()->addDays($plan->duration);
            
            // Update subscription
            $subscription->update([
                'status' => 'ACTIVE',
                'start_date' => $startDate,
                'end_date' => $endDate,
                'cancelled_at' => null,
                'cancellation_reason' => null,
                'auto_renew' => true,
            ]);
            
            // Create payment record
            Payment::create([
                'user_id' => $request->user()->id,
                'subscription_id' => $subscription->id,
                'amount' => $plan->price,
                'status' => 'COMPLETED',
                'type' => 'SUBSCRIPTION',
                'payment_method' => $subscription->payment_method,
                'description' => "Renewed subscription to {$plan->name} plan",
            ]);
            
            DB::commit();
            
            return response()->json([
                'success' => true,
                'message' => 'Subscription renewed successfully',
                'data' => [
                    'id' => $subscription->id,
                    'status' => $subscription->status,
                    'start_date' => $subscription->start_date,
                    'end_date' => $subscription->end_date,
                    'days_remaining' => $subscription->daysRemaining(),
                ]
            ]);
            
        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to renew subscription: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Change subscription plan
     * POST /api/subscriptions/{id}/change-plan
     */
    public function changePlan(Request $request, $id)
    {
        $subscription = Subscription::where('user_id', $request->user()->id)
            ->findOrFail($id);
        
        $validator = Validator::make($request->all(), [
            'new_plan_id' => 'required|exists:membership_plans,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }
        
        $newPlan = MembershipPlan::findOrFail($request->new_plan_id);
        
        if (!$newPlan->is_active) {
            return response()->json([
                'success' => false,
                'message' => 'This plan is not available'
            ], 400);
        }
        
        // Calculate remaining days and prorate
        $remainingDays = $subscription->daysRemaining();
        $currentPlan = $subscription->plan;
        $prorateAmount = ($currentPlan->price / $currentPlan->duration) * $remainingDays;
        $newAmount = max(0, $newPlan->price - $prorateAmount);
        
        try {
            DB::beginTransaction();
            
            // Update subscription
            $subscription->update([
                'plan_id' => $newPlan->id,
                'amount_paid' => $newPlan->price,
            ]);
            
            // If there's additional charge, create payment
            if ($newAmount > 0) {
                Payment::create([
                    'user_id' => $request->user()->id,
                    'subscription_id' => $subscription->id,
                    'amount' => $newAmount,
                    'status' => 'COMPLETED',
                    'type' => 'SUBSCRIPTION',
                    'description' => "Plan change to {$newPlan->name}",
                ]);
            }
            
            DB::commit();
            
            return response()->json([
                'success' => true,
                'message' => 'Plan changed successfully',
                'data' => [
                    'id' => $subscription->id,
                    'plan' => [
                        'name' => $newPlan->name,
                        'price' => $newPlan->price,
                    ],
                ]
            ]);
            
        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to change plan: ' . $e->getMessage()
            ], 500);
        }
    }
}

