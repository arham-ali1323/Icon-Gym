<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\TrainerController;
use App\Http\Controllers\Api\ClassController;
use App\Http\Controllers\Api\MembershipPlanController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\SubscriptionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| German Fitness API Endpoints
| All routes are prefixed with /api
|
*/

// ============================================
// Public Routes (No authentication required)
// ============================================

// Authentication
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public endpoints
Route::get('/trainers', [TrainerController::class, 'index']);
Route::get('/trainers/{id}', [TrainerController::class, 'show']);
Route::get('/classes', [ClassController::class, 'index']);
Route::get('/classes/{id}', [ClassController::class, 'show']);
Route::get('/classes/weekly-schedule', [ClassController::class, 'weeklySchedule']);
Route::get('/classes/schedule/{day}', [ClassController::class, 'scheduleByDay']);
Route::get('/membership-plans', [MembershipPlanController::class, 'index']);
Route::get('/membership-plans/{id}', [MembershipPlanController::class, 'show']);


// ============================================
// Protected Routes (Authentication required)
// ============================================

Route::middleware('auth:sanctum')->group(function () {
    
    // Authentication
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);
    Route::post('/change-password', [AuthController::class, 'changePassword']);
    
    // Bookings
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/bookings/{id}', [BookingController::class, 'show']);
    Route::delete('/bookings/{id}', [BookingController::class, 'destroy']);
    Route::post('/bookings/{id}/check-in', [BookingController::class, 'checkIn']);
    
    // Subscriptions
    Route::get('/subscriptions', [SubscriptionController::class, 'index']);
    Route::get('/subscriptions/active', [SubscriptionController::class, 'active']);
    Route::post('/subscriptions', [SubscriptionController::class, 'store']);
    Route::post('/subscriptions/{id}/cancel', [SubscriptionController::class, 'cancel']);
    Route::post('/subscriptions/{id}/renew', [SubscriptionController::class, 'renew']);
    Route::post('/subscriptions/{id}/change-plan', [SubscriptionController::class, 'changePlan']);
    
    // User Management
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::get('/users/{id}/subscriptions', [UserController::class, 'subscriptions']);
    Route::get('/users/{id}/attendance', [UserController::class, 'attendance']);
    Route::get('/users/{id}/workout-plans', [UserController::class, 'workoutPlans']);
    Route::get('/users/{id}/diet-plans', [UserController::class, 'dietPlans']);
    Route::get('/users/{id}/bookings', [UserController::class, 'bookings']);
    Route::get('/users/{id}/payments', [UserController::class, 'payments']);
});


// ============================================
// Admin Routes (Admin only)
// ============================================

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    
    // User Management (Admin)
    Route::get('/admin/users', [UserController::class, 'index']);
    Route::delete('/admin/users/{id}', [UserController::class, 'destroy']);
    
    // Trainer Management (Admin)
    Route::post('/admin/trainers', [TrainerController::class, 'store']);
    Route::put('/admin/trainers/{id}', [TrainerController::class, 'update']);
    Route::delete('/admin/trainers/{id}', [TrainerController::class, 'destroy']);
    
    // Class Management (Admin)
    Route::post('/admin/classes', [ClassController::class, 'store']);
    Route::put('/admin/classes/{id}', [ClassController::class, 'update']);
    Route::delete('/admin/classes/{id}', [ClassController::class, 'destroy']);
    Route::get('/admin/bookings/class/{classId}', [BookingController::class, 'classBookings']);
    
    // Membership Plan Management (Admin)
    Route::post('/admin/membership-plans', [MembershipPlanController::class, 'store']);
    Route::put('/admin/membership-plans/{id}', [MembershipPlanController::class, 'update']);
    Route::delete('/admin/membership-plans/{id}', [MembershipPlanController::class, 'destroy']);
});


// ============================================
// Health Check
// ============================================

Route::get('/health', function () {
    return response()->json([
        'success' => true,
        'message' => 'German Fitness API is running',
        'timestamp' => now()->toIso8601String(),
    ]);
});

/*
|--------------------------------------------------------------------------
| API Response Format
|--------------------------------------------------------------------------
|
| Success Response:
| {
|     "success": true,
|     "message": "Operation successful",
|     "data": { ... }
| }
|
| Error Response:
| {
|     "success": false,
|     "message": "Error message",
|     "errors": { ... }
| }
|
*/

