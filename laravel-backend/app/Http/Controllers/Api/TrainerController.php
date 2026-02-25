<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Trainer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class TrainerController extends Controller
{
    /**
     * Get all trainers
     * GET /api/trainers
     */
    public function index(Request $request)
    {
        $query = Trainer::query();
        
        // Filter by specialization
        if ($request->has('specialization')) {
            $query->bySpecialization($request->specialization);
        }
        
        // Filter active only
        if ($request->boolean('active_only', true)) {
            $query->active();
        }
        
        $trainers = $query->orderBy('name')->get();
        
        return response()->json([
            'success' => true,
            'data' => $trainers->map(fn($trainer) => $trainer->fullProfile())
        ]);
    }

    /**
     * Get single trainer
     * GET /api/trainers/{id}
     */
    public function show($id)
    {
        $trainer = Trainer::findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => $trainer->fullProfile()
        ]);
    }

    /**
     * Create new trainer (Admin only)
     * POST /api/trainers
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:trainers',
            'phone' => 'required|string|max:20',
            'image' => 'nullable|url',
            'specialization' => 'required|string|max:255',
            'experience' => 'required|integer|min:0',
            'bio' => 'nullable|string',
            'facebook' => 'nullable|url',
            'instagram' => 'nullable|url',
            'twitter' => 'nullable|url',
            'linkedin' => 'nullable|url',
            'education' => 'nullable|string',
            'certifications' => 'nullable|array',
            'skills' => 'nullable|array',
            'work_experience' => 'nullable|array',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $trainer = Trainer::create([
            ...$request->all(),
            'slug' => Str::slug($request->name) . '-' . uniqid()
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Trainer created successfully',
            'data' => $trainer->fullProfile()
        ], 201);
    }

    /**
     * Update trainer (Admin only)
     * PUT /api/trainers/{id}
     */
    public function update(Request $request, $id)
    {
        $trainer = Trainer::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|unique:trainers,email,' . $id,
            'phone' => 'sometimes|string|max:20',
            'image' => 'nullable|url',
            'specialization' => 'sometimes|string|max:255',
            'experience' => 'sometimes|integer|min:0',
            'bio' => 'nullable|string',
            'facebook' => 'nullable|url',
            'instagram' => 'nullable|url',
            'twitter' => 'nullable|url',
            'linkedin' => 'nullable|url',
            'education' => 'nullable|string',
            'certifications' => 'nullable|array',
            'skills' => 'nullable|array',
            'work_experience' => 'nullable|array',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $trainer->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Trainer updated successfully',
            'data' => $trainer->fresh()->fullProfile()
        ]);
    }

    /**
     * Delete trainer (Admin only)
     * DELETE /api/trainers/{id}
     */
    public function destroy($id)
    {
        $trainer = Trainer::findOrFail($id);
        $trainer->delete();

        return response()->json([
            'success' => true,
            'message' => 'Trainer deleted successfully'
        ]);
    }

    /**
     * Get trainer's workout plans
     * GET /api/trainers/{id}/workout-plans
     */
    public function workoutPlans($id)
    {
        $trainer = Trainer::findOrFail($id);
        $workoutPlans = $trainer->workoutPlans()->get();

        return response()->json([
            'success' => true,
            'data' => $workoutPlans
        ]);
    }

    /**
     * Get trainer's classes
     * GET /api/trainers/{id}/classes
     */
    public function classes($id)
    {
        $trainer = Trainer::findOrFail($id);
        $classes = $trainer->classSchedules()->active()->get();

        return response()->json([
            'success' => true,
            'data' => $classes
        ]);
    }
}

