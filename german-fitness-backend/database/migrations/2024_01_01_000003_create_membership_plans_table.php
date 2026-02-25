<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * Creates membership plans table for different subscription tiers
     */
    public function up(): void
    {
        Schema::create('membership_plans', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // e.g., "Basic", "Premium", "Elite"
            $table->text('description');
            $table->decimal('price', 10, 2); // Monthly price
            $table->integer('duration'); // Duration in days (30, 90, 365, etc.)
            $table->json('features'); // Array of included features
            $table->boolean('is_popular')->default(false); // Highlight on pricing page
            $table->integer('max_classes_per_week')->nullable(); // Class attendance limit
            $table->boolean('includes_personal_training')->default(false);
            $table->boolean('includes_nutrition_plan')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            // Indexes
            $table->index('is_active');
            $table->index('is_popular');
            $table->index('price');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('membership_plans');
    }
};
