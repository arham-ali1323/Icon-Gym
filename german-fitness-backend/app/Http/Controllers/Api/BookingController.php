<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\ClassSchedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class BookingController extends Controller
{
    /**
     * Get user's bookings
     * GET /api/bookings
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        $query = Booking::where('user_id', $user->id)
            ->with(['classSchedule.trainer']);
        
        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        
        // Get upcoming bookings
        if ($request->boolean('upcoming', false)) {
            $query->upcoming();
        }
        
        // Get past bookings
        if ($request->boolean('past', false)) {
            $query->past();
        }
        
        $bookings = $query->orderBy('booking_date', 'desc')->get();
        
        return response()->json([
            'success' => true,
            'data' => $bookings->map(fn($booking) => [
                'id' => $booking->id,
                'booking_date' => $booking->booking_date,
                'status' => $booking->status,
                'class' => $booking->classSchedule ? [
                    'id' => $booking->classSchedule->id,
                    'class_name' => $booking->classSchedule->class_name,
                    'day_name' => $booking->classSchedule->day_name,
                    'start_time' => $booking->classSchedule->start_time,
                    'end_time' => $booking->classSchedule->end_time,
                    'duration' => $booking->classSchedule->duration,
                    'location' => $booking->classSchedule->location,
                    'trainer' => $booking->classSchedule->trainer ? [
                        'name' => $booking->classSchedule->trainer->name,
                        'image' => $booking->classSchedule->trainer->image,
                    ] : null,
                ] : null,
                'checked_in_at' => $booking->checked_in_at,
                'checked_out_at' => $booking->checked_out_at,
                'can_cancel' => $booking->canBeCancelled(),
            ])
        ]);
    }

    /**
     * Create new booking
     * POST /api/bookings
     */
    public function store(Request $request)
    {
        $user = $request->user();
        
        $validator = Validator::make($request->all(), [
            'class_schedule_id' => 'required|exists:class_schedules,id',
            'booking_date' => 'required|date|after_or_equal:today',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $classSchedule = ClassSchedule::findOrFail($request->class_schedule_id);
        
        // Check if class is active
        if (!$classSchedule->is_active) {
            return response()->json([
                'success' => false,
                'message' => 'This class is not currently available'
            ], 400);
        }
        
        // Check if class is full
        if ($classSchedule->isFull()) {
            return response()->json([
                'success' => false,
                'message' => 'This class is fully booked'
            ], 400);
        }
        
        // Check for duplicate booking
        $existingBooking = Booking::where('user_id', $user->id)
            ->where('class_schedule_id', $request->class_schedule_id)
            ->where('booking_date', $request->booking_date)
            ->whereIn('status', ['PENDING', 'CONFIRMED'])
            ->first();
            
        if ($existingBooking) {
            return response()->json([
                'success' => false,
                'message' => 'You already have a booking for this class on this date'
            ], 400);
        }

        try {
            DB::beginTransaction();
            
            // Create booking
            $booking = Booking::create([
                'user_id' => $user->id,
                'class_schedule_id' => $request->class_schedule_id,
                'booking_date' => $request->booking_date,
                'status' => 'CONFIRMED',
            ]);
            
            // Increment booked count
            $classSchedule->increment('booked_count');
            
            DB::commit();
            
            return response()->json([
                'success' => true,
                'message' => 'Booking created successfully',
                'data' => [
                    'id' => $booking->id,
                    'booking_date' => $booking->booking_date,
                    'status' => $booking->status,
                    'class' => [
                        'class_name' => $classSchedule->class_name,
                        'start_time' => $classSchedule->start_time,
                        'end_time' => $classSchedule->end_time,
                    ],
                ]
            ], 201);
            
        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to create booking: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get single booking
     * GET /api/bookings/{id}
     */
    public function show(Request $request, $id)
    {
        $booking = Booking::where('user_id', $request->user()->id)
            ->with(['classSchedule.trainer'])
            ->findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => [
                'id' => $booking->id,
                'booking_date' => $booking->booking_date,
                'status' => $booking->status,
                'class' => $booking->classSchedule ? [
                    'id' => $booking->classSchedule->id,
                    'class_name' => $booking->classSchedule->class_name,
                    'description' => $booking->classSchedule->description,
                    'day_name' => $booking->classSchedule->day_name,
                    'start_time' => $booking->classSchedule->start_time,
                    'end_time' => $booking->classSchedule->end_time,
                    'duration' => $booking->classSchedule->duration,
                    'location' => $booking->classSchedule->location,
                    'trainer' => $booking->classSchedule->trainer ? [
                        'name' => $booking->classSchedule->trainer->name,
                        'image' => $booking->classSchedule->trainer->image,
                        'specialization' => $booking->classSchedule->trainer->specialization,
                    ] : null,
                ] : null,
                'checked_in_at' => $booking->checked_in_at,
                'checked_out_at' => $booking->checked_out_at,
                'can_cancel' => $booking->canBeCancelled(),
            ]
        ]);
    }

    /**
     * Cancel booking
     * DELETE /api/bookings/{id}
     */
    public function destroy(Request $request, $id)
    {
        $booking = Booking::where('user_id', $request->user()->id)->findOrFail($id);
        
        // Check if booking can be cancelled
        if (!$booking->canBeCancelled()) {
            return response()->json([
                'success' => false,
                'message' => 'This booking cannot be cancelled (less than 24 hours before class)'
            ], 400);
        }
        
        if ($booking->isCancelled()) {
            return response()->json([
                'success' => false,
                'message' => 'This booking is already cancelled'
            ], 400);
        }
        
        try {
            DB::beginTransaction();
            
            $booking->update([
                'status' => 'CANCELLED',
                'cancelled_at' => now(),
            ]);
            
            // Decrement booked count
            $booking->classSchedule->decrement('booked_count');
            
            DB::commit();
            
            return response()->json([
                'success' => true,
                'message' => 'Booking cancelled successfully'
            ]);
            
        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to cancel booking: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Check in to a class
     * POST /api/bookings/{id}/check-in
     */
    public function checkIn(Request $request, $id)
    {
        $booking = Booking::where('user_id', $request->user()->id)->findOrFail($id);
        
        if ($booking->hasCheckedIn()) {
            return response()->json([
                'success' => false,
                'message' => 'Already checked in'
            ], 400);
        }
        
        if ($booking->isCancelled()) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot check in to a cancelled booking'
            ], 400);
        }
        
        $booking->update([
            'checked_in_at' => now(),
            'status' => 'COMPLETED',
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'Checked in successfully',
            'data' => [
                'checked_in_at' => $booking->checked_in_at,
            ]
        ]);
    }

    /**
     * Get all bookings for a class (Admin/Trainer)
     * GET /api/admin/bookings/class/{class_id}
     */
    public function classBookings(Request $request, $classId)
    {
        $bookings = Booking::where('class_schedule_id', $classId)
            ->where('booking_date', $request->date ?? today())
            ->with('user')
            ->get();
        
        return response()->json([
            'success' => true,
            'data' => $bookings
        ]);
    }
}

