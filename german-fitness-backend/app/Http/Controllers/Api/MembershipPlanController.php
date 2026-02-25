<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MembershipPlan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MembershipPlanController extends Controller
{
    /**
     * Get all membership plans
     * GET /api/membership-plans
     */
    public function index(Request $request)
    {
        $query = MembershipPlan::query();
        
        // Filter active only
        if ($request->boolean('active_only', true)) {
            $query->active();
        }
        
        // Get popular plans
        if ($request->boolean('popular_only', false)) {
            $query->popular();
        }
        
        $plans = $query->orderBy('price')->get();
        
        return response()->json([
            'success' => true,
            'data' => $plans->map(fn($plan) => [
                'id' => $plan->id,
                'name' => $plan->name,
                'description' => $plan->description,
                'price' => $plan->price,
                'formatted_price' => $plan->formatted_price,
                'duration' => $plan->duration,
                'duration_in_months' => $plan->duration_in_months,
                'features' => $plan->features,
                'is_popular' => $plan->is_popular,
                'max_classes_per_week' => $plan->max_classes_per_week,
                'includes_personal_training' => $plan->includes_personal_training,
                'includes_nutrition_plan' => $plan->includes_nutrition_plan,
            ])
        ]);
    }

    /**
     * Get single membership plan
     * GET /api/membership-plans/{id}
     */
    public function show($id)
    {
        $plan = MembershipPlan::findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => [
                'id' => $plan->id,
                'name' => $plan->name,
                'description' => $plan->description,
                'price' => $plan->price,
                'formatted_price' => $plan->formatted_price,
                'duration' => $plan->duration,
                'duration_in_months' => $plan->duration_in_months,
                'features' => $plan->features,
                'is_popular' => $plan->is_popular,
                'max_classes_per_week' => $plan->max_classes_per_week,
                'includes_personal_training' => $plan->includes_personal_training,
                'includes_nutrition_plan' => $plan->includes_nutrition_plan,
                'active_subscribers_count' => $plan->activeSubscribersCount(),
            ]
        ]);
    }

    /**
     * Create new membership plan (Admin only)
     * POST /api/membership-plans
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'duration' => 'required|integer|min:1',
            'features' => 'required|array',
            'features.*' => 'string',
            'is_popular' => 'boolean',
            'max_classes_per_week' => 'nullable|integer|min:1',
            'includes_personal_training' => 'boolean',
            'includes_nutrition_plan' => 'boolean',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $plan = MembershipPlan::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Membership plan created successfully',
            'data' => $plan
        ], 201);
    }

    /**
     * Update membership plan (Admin only)
     * PUT /api/membership-plans/{id}
     */
    public function update(Request $request, $id)
    {
        $plan = MembershipPlan::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'price' => 'sometimes|numeric|min:0',
            'duration' => 'sometimes|integer|min:1',
            'features' => 'sometimes|array',
            'features.*' => 'string',
            'is_popular' => 'boolean',
            'max_classes_per_week' => 'nullable|integer|min:1',
            'includes_personal_training' => 'boolean',
            'includes_nutrition_plan' => 'boolean',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $plan->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Membership plan updated successfully',
            'data' => $plan->fresh()
        ]);
    }

    /**
     * Delete membership plan (Admin only)
     * DELETE /api/membership-plans/{id}
     */
    public function destroy($id)
    {
        $plan = MembershipPlan::findOrFail($id);
        
        // Check for active subscriptions
        if ($plan->subscriptions()->where('status', 'ACTIVE')->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete plan with active subscriptions'
            ], 400);
        }
        
        $plan->delete();

        return response()->json([
            'success' => true,
            'message' => 'Membership plan deleted successfully'
        ]);
    }
}

