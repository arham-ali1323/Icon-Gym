<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * Creates bookings table for class reservations
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                  ->constrained('users')
                  ->onDelete('cascade');
            $table->foreignId('class_schedule_id')
                  ->constrained('class_schedules')
                  ->onDelete('cascade');
            
            // Booking details
            $table->date('booking_date'); // The specific date of the class
            $table->enum('status', [
                'CONFIRMED',
                'PENDING',
                'CANCELLED',
                'COMPLETED',
                'NO_SHOW'
            ])->default('PENDING');
            
            // Check-in tracking
            $table->timestamp('checked_in_at')->nullable();
            $table->timestamp('checked_out_at')->nullable();
            
            // Cancellation
            $table->timestamp('cancelled_at')->nullable();
            $table->text('cancellation_reason')->nullable();
            $table->enum('refund_status', [
                'NOT_APPLICABLE',
                'PENDING',
                'PROCESSED',
                'DENIED'
            ])->default('NOT_APPLICABLE');
            
            // Notes
            $table->text('notes')->nullable();
            
            // Guest booking (for non-members)
            $table->boolean('is_guest')->default(false);
            $table->decimal('guest_fee', 10, 2)->nullable();
            
            $table->timestamps();
            
            // Prevent duplicate bookings
            $table->unique(['user_id', 'class_schedule_id', 'booking_date'], 'unique_booking');
            
            // Indexes
            $table->index(['user_id', 'status']);
            $table->index(['class_schedule_id', 'booking_date']);
            $table->index('booking_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
