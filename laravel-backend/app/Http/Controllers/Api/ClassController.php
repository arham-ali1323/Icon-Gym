<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ClassSchedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ClassController extends Controller
{
    /**
     * Get all classes
     * GET /api/classes
     */
    public function index(Request $request)
    {
        $query = ClassSchedule::query()->with('trainer');
        
        // Filter by category
        if ($request->has('category')) {
            $query->byCategory($request->category);
        }
        
        // Filter by day of week
        if ($request->has('day')) {
            $query->onDay($request->day);
        }
        
        // Filter by difficulty
        if ($request->has('difficulty')) {
            $query->where('difficulty', $request->difficulty);
        }
        
        // Filter active only
        if ($request->boolean('active_only', true)) {
            $query->active();
        }
        
        // Filter classes with available spots
        if ($request->boolean('available_only', false)) {
            $query->withAvailableSpots();
        }
        
        $classes = $query->orderBy('day_of_week')->orderBy('start_time')->get();
        
        return response()->json([
            'success' => true,
            'data' => $classes->map(fn($class) => [
                'id' => $class->id,
                'class_name' => $class->class_name,
                'slug' => $class->slug,
                'description' => $class->description,
                'image' => $class->image,
                'category' => $class->category,
                'day_of_week' => $class->day_of_week,
                'day_name' => $class->day_name,
                'start_time' => $class->start_time,
                'end_time' => $class->end_time,
                'duration' => $class->duration,
                'trainer' => $class->trainer ? $class->trainer->fullProfile() : null,
                'capacity' => $class->capacity,
                'booked_count' => $class->booked_count,
                'available_spots' => $class->availableSpots(),
                'is_full' => $class->isFull(),
                'difficulty' => $class->difficulty,
                'location' => $class->location,
                'room' => $class->room,
            ])
        ]);
    }

    /**
     * Get single class
     * GET /api/classes/{id}
     */
    public function show($id)
    {
        $class = ClassSchedule::with('trainer')->findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => [
                'id' => $class->id,
                'class_name' => $class->class_name,
                'slug' => $class->slug,
                'description' => $class->description,
                'image' => $class->image,
                'category' => $class->category,
                'day_of_week' => $class->day_of_week,
                'day_name' => $class->day_name,
                'start_time' => $class->start_time,
                'end_time' => $class->end_time,
                'duration' => $class->duration,
                'trainer' => $class->trainer ? $class->trainer->fullProfile() : null,
                'capacity' => $class->capacity,
                'booked_count' => $class->booked_count,
                'available_spots' => $class->availableSpots(),
                'is_full' => $class->isFull(),
                'difficulty' => $class->difficulty,
                'location' => $class->location,
                'room' => $class->room,
                'is_recurring' => $class->is_recurring,
                'is_active' => $class->is_active,
            ]
        ]);
    }

    /**
     * Create new class (Admin/Trainer only)
     * POST /api/classes
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'class_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|url',
            'category' => 'nullable|in:strength,cardio,yoga,pilates,boxing,crossfit,dance,cycling,swimming,other',
            'day_of_week' => 'required|integer|min:0|max:6',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'trainer_id' => 'nullable|exists:trainers,id',
            'instructor_name' => 'nullable|string|max:255',
            'capacity' => 'required|integer|min:1',
            'difficulty' => 'nullable|in:beginner,intermediate,advanced',
            'location' => 'nullable|string|max:255',
            'room' => 'nullable|string|max:255',
            'is_recurring' => 'boolean',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $class = ClassSchedule::create([
            ...$request->all(),
            'slug' => Str::slug($request->class_name) . '-' . uniqid(),
            'duration' => $this->calculateDuration($request->start_time, $request->end_time),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Class created successfully',
            'data' => $class
        ], 201);
    }

    /**
     * Update class (Admin/Trainer only)
     * PUT /api/classes/{id}
     */
    public function update(Request $request, $id)
    {
        $class = ClassSchedule::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'class_name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|url',
            'category' => 'nullable|in:strength,cardio,yoga,pilates,boxing,crossfit,dance,cycling,swimming,other',
            'day_of_week' => 'sometimes|integer|min:0|max:6',
            'start_time' => 'sometimes|date_format:H:i',
            'end_time' => 'sometimes|date_format:H:i',
            'trainer_id' => 'nullable|exists:trainers,id',
            'instructor_name' => 'nullable|string|max:255',
            'capacity' => 'sometimes|integer|min:1',
            'difficulty' => 'nullable|in:beginner,intermediate,advanced',
            'location' => 'nullable|string|max:255',
            'room' => 'nullable|string|max:255',
            'is_recurring' => 'boolean',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->all();
        
        // Recalculate duration if times changed
        if ($request->has('start_time') && $request->has('end_time')) {
            $data['duration'] = $this->calculateDuration($request->start_time, $request->end_time);
        }

        $class->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Class updated successfully',
            'data' => $class->fresh()
        ]);
    }

    /**
     * Delete class (Admin only)
     * DELETE /api/classes/{id}
     */
    public function destroy($id)
    {
        $class = ClassSchedule::findOrFail($id);
        
        // Check for existing bookings
        if ($class->bookings()->where('status', 'CONFIRMED')->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete class with confirmed bookings'
            ], 400);
        }
        
        $class->delete();

        return response()->json([
            'success' => true,
            'message' => 'Class deleted successfully'
        ]);
    }

    /**
     * Get class schedule by day
     * GET /api/classes/schedule/{day}
     */
    public function scheduleByDay($day)
    {
        $classes = ClassSchedule::active()
            ->onDay($day)
            ->with('trainer')
            ->orderBy('start_time')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $classes
        ]);
    }

    /**
     * Get weekly schedule
     * GET /api/classes/weekly-schedule
     */
    public function weeklySchedule()
    {
        $schedule = [];
        
        for ($day = 0; $day < 7; $day++) {
            $schedule[$day] = ClassSchedule::active()
                ->onDay($day)
                ->with('trainer')
                ->orderBy('start_time')
                ->get();
        }

        return response()->json([
            'success' => true,
            'data' => $schedule
        ]);
    }

    /**
     * Calculate duration in minutes
     */
    private function calculateDuration(string $startTime, string $endTime): int
    {
        $start = \Carbon\Carbon::parse($startTime);
        $end = \Carbon\Carbon::parse($endTime);
        return $end->diffInMinutes($start);
    }
}

