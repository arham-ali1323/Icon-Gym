<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * Creates class schedules table for gym classes and workouts
     */
    public function up(): void
    {
        Schema::create('class_schedules', function (Blueprint $table) {
            $table->id();
            $table->string('class_name'); // e.g., "HIIT Blast", "Yoga Flow"
            $table->string('slug')->unique(); // URL-friendly name
            
            // Class details
            $table->text('description');
            $table->string('image')->nullable();
            $table->enum('category', [
                'strength',
                'cardio',
                'yoga',
                'pilates',
                'boxing',
                'crossfit',
                'dance',
                'cycling',
                'swimming',
                'other'
            ])->default('other');
            
            // Schedule
            $table->tinyInteger('day_of_week'); // 0-6 (Sunday to Saturday)
            $table->time('start_time');
            $table->time('end_time');
            $table->integer('duration'); // in minutes
            
            // Instructor
            $table->foreignId('trainer_id')
                  ->nullable()
                  ->constrained('trainers')
                  ->onDelete('set null');
            $table->string('instructor_name')->nullable(); // Backup if trainer not assigned
            
            // Capacity and booking
            $table->integer('capacity');
            $table->integer('booked_count')->default(0);
            $table->enum('difficulty', ['beginner', 'intermediate', 'advanced'])->default('beginner');
            
            // Location
            $table->string('location')->default('Main Studio');
            $table->string('room')->nullable();
            
            // Status
            $table->boolean('is_recurring')->default(true); // Weekly recurring
            $table->boolean('is_active')->default(true);
            $table->date('specific_date')->nullable(); // For one-time classes
            
            $table->timestamps();
            
            // Indexes for efficient querying
            $table->index(['day_of_week', 'start_time']);
            $table->index('category');
            $table->index('trainer_id');
            $table->index('is_active');
            $table->index('slug');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('class_schedules');
    }
};
