<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Get all users (Admin only)
     * GET /api/users
     */
    public function index(Request $request)
    {
        $query = User::query();
        
        // Filter by role
        if ($request->has('role')) {
            $query->where('role', $request->role);
        }
        
        // Search by name or email
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                  ->orWhere('email', 'LIKE', "%{$search}%");
            });
        }
        
        $users = $query->orderBy('created_at', 'desc')->paginate(20);
        
        return response()->json([
            'success' => true,
            'data' => $users
        ]);
    }

    /**
     * Get single user (Admin or self)
     * GET /api/users/{id}
     */
    public function show(Request $request, $id)
    {
        // Users can only view their own profile unless admin
        $user = $request->user();
        
        if ($user->id != $id && !$user->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }
        
        $targetUser = User::findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => $targetUser->fullProfile()
        ]);
    }

    /**
     * Update user (Admin or self)
     * PUT /api/users/{id}
     */
    public function update(Request $request, $id)
    {
        // Users can only update their own profile unless admin
        $user = $request->user();
        
        if ($user->id != $id && !$user->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }
        
        $targetUser = User::findOrFail($id);
        
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'email' => [
                'sometimes',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($targetUser->id),
            ],
            'phone' => 'nullable|string|max:20',
            'date_of_birth' => 'nullable|date',
            'gender' => 'nullable|in:male,female,other',
            'image' => 'nullable|url',
            'role' => 'sometimes|in:USER,TRAINER,ADMIN',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $targetUser->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'User updated successfully',
            'data' => $targetUser->fresh()->fullProfile()
        ]);
    }

    /**
     * Delete user (Admin only)
     * DELETE /api/users/{id}
     */
    public function destroy(Request $request, $id)
    {
        if (!$request->user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized - Admin access required'
            ], 403);
        }
        
        $targetUser = User::findOrFail($id);
        
        // Prevent deleting yourself
        if ($request->user()->id == $id) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete your own account'
            ], 400);
        }
        
        $targetUser->delete();

        return response()->json([
            'success' => true,
            'message' => 'User deleted successfully'
        ]);
    }

    /**
     * Get user's subscriptions
     * GET /api/users/{id}/subscriptions
     */
    public function subscriptions(Request $request, $id)
    {
        if ($request->user()->id != $id && !$request->user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }
        
        $subscriptions = User::findOrFail($id)->subscriptions()->with('plan')->get();
        
        return response()->json([
            'success' => true,
            'data' => $subscriptions
        ]);
    }

    /**
     * Get user's attendance
     * GET /api/users/{id}/attendance
     */
    public function attendance(Request $request, $id)
    {
        if ($request->user()->id != $id && !$request->user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }
        
        $attendance = User::findOrFail($id)->attendance()
            ->orderBy('date', 'desc')
            ->paginate(30);
        
        return response()->json([
            'success' => true,
            'data' => $attendance
        ]);
    }

    /**
     * Get user's workout plans
     * GET /api/users/{id}/workout-plans
     */
    public function workoutPlans(Request $request, $id)
    {
        if ($request->user()->id != $id && !$request->user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }
        
        $workoutPlans = User::findOrFail($id)->workoutPlans()
            ->with('trainer')
            ->orderBy('created_at', 'desc')
            ->get();
        
        return response()->json([
            'success' => true,
            'data' => $workoutPlans
        ]);
    }

    /**
     * Get user's diet plans
     * GET /api/users/{id}/diet-plans
     */
    public function dietPlans(Request $request, $id)
    {
        if ($request->user()->id != $id && !$request->user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }
        
        $dietPlans = User::findOrFail($id)->dietPlans()
            ->orderBy('created_at', 'desc')
            ->get();
        
        return response()->json([
            'success' => true,
            'data' => $dietPlans
        ]);
    }

    /**
     * Get user's bookings
     * GET /api/users/{id}/bookings
     */
    public function bookings(Request $request, $id)
    {
        if ($request->user()->id != $id && !$request->user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }
        
        $bookings = User::findOrFail($id)->bookings()
            ->with('classSchedule')
            ->orderBy('booking_date', 'desc')
            ->get();
        
        return response()->json([
            'success' => true,
            'data' => $bookings
        ]);
    }

    /**
     * Get user's payments
     * GET /api/users/{id}/payments
     */
    public function payments(Request $request, $id)
    {
        if ($request->user()->id != $id && !$request->user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }
        
        $payments = User::findOrFail($id)->payments()
            ->orderBy('created_at', 'desc')
            ->paginate(20);
        
        return response()->json([
            'success' => true,
            'data' => $payments
        ]);
    }
}

