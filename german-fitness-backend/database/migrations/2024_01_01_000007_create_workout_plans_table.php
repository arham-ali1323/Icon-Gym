<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * Creates workout plans table for personalized training programs
     */
    public function up(): void
    {
        Schema::create('workout_plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            
            // Plan structure
            $table->json('exercises'); // Detailed exercise list with sets, reps, rest
            $table->integer('duration'); // in minutes
            $table->enum('difficulty', ['beginner', 'intermediate', 'advanced']);
            $table->enum('goal', [
                'weight_loss',
                'muscle_gain',
                'endurance',
                'strength',
                'flexibility',
                'general_fitness'
            ])->default('general_fitness');
            
            // Frequency
            $table->integer('days_per_week');
            $table->integer('weeks_duration'); // How many weeks the plan lasts
            
            // Relationships
            $table->foreignId('trainer_id')
                  ->nullable()
                  ->constrained('trainers')
                  ->onDelete('set null');
            $table->foreignId('user_id')
                  ->nullable()
                  ->constrained('users')
                  ->onDelete('cascade');
            
            // Plan type
            $table->boolean('is_template')->default(false); // Template for reuse
            $table->boolean('is_public')->default(false); // Share with other users
            
            // Tracking
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->enum('status', [
                'DRAFT',
                'ACTIVE',
                'COMPLETED',
                'ARCHIVED'
            ])->default('DRAFT');
            
            $table->timestamps();
            
            // Indexes
            $table->index('trainer_id');
            $table->index('user_id');
            $table->index('difficulty');
            $table->index('goal');
            $table->index('is_template');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('workout_plans');
    }
};
