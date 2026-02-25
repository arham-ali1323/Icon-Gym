<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * Creates diet plans table for nutrition programs
     */
    public function up(): void
    {
        Schema::create('diet_plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            
            // Meal structure
            $table->json('meals'); // Array of meals with ingredients, portions, timing
            
            // Nutritional targets
            $table->integer('daily_calories');
            $table->integer('protein'); // in grams
            $table->integer('carbs'); // in grams
            $table->integer('fats'); // in grams
            $table->integer('fiber')->nullable(); // in grams
            
            // Diet type
            $table->enum('diet_type', [
                'balanced',
                'keto',
                'paleo',
                'vegan',
                'vegetarian',
                'mediterranean',
                'low_carb',
                'high_protein',
                'intermittent_fasting',
                'other'
            ])->default('balanced');
            
            // Relationships
            $table->foreignId('user_id')
                  ->nullable()
                  ->constrained('users')
                  ->onDelete('cascade');
            
            // Plan details
            $table->integer('duration_days');
            $table->boolean('is_template')->default(false);
            
            // Tracking
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->enum('status', [
                'DRAFT',
                'ACTIVE',
                'COMPLETED',
                'ARCHIVED'
            ])->default('DRAFT');
            
            // Allergies and restrictions
            $table->json('allergies')->nullable();
            $table->json('restrictions')->nullable();
            
            $table->timestamps();
            
            // Indexes
            $table->index('user_id');
            $table->index('diet_type');
            $table->index('is_template');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('diet_plans');
    }
};
