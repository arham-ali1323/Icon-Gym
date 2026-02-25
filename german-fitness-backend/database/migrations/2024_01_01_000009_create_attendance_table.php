<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * Creates attendance tracking table for gym visits
     */
    public function up(): void
    {
        Schema::create('attendance', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                  ->constrained('users')
                  ->onDelete('cascade');
            
            // Attendance details
            $table->date('date');
            $table->timestamp('check_in');
            $table->timestamp('check_out')->nullable();
            
            // Status
            $table->enum('status', [
                'PRESENT',
                'LATE',
                'ABSENT',
                'EXCUSED'
            ])->default('PRESENT');
            
            // Class or general gym visit
            $table->foreignId('class_schedule_id')
                  ->nullable()
                  ->constrained('class_schedules')
                  ->onDelete('set null');
            $table->boolean('is_class_attendance')->default(false);
            
            // Location tracking
            $table->string('check_in_method')->default('manual'); // manual, qr_code, rfid, app
            $table->string('check_out_method')->nullable();
            
            // Notes
            $table->text('notes')->nullable();
            
            $table->timestamps();
            
            // Prevent duplicate attendance entries per day
            $table->unique(['user_id', 'date', 'class_schedule_id'], 'unique_daily_attendance');
            
            // Indexes
            $table->index(['user_id', 'date']);
            $table->index('date');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendance');
    }
};
