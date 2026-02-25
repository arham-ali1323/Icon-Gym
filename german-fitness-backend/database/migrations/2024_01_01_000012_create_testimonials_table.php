<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * Creates testimonials table for member reviews
     */
    public function up(): void
    {
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Person giving testimonial
            $table->string('image')->nullable();
            $table->tinyInteger('rating')->default(5); // 1-5 stars
            $table->text('content'); // Testimonial text
            $table->string('position')->nullable(); // Job title or role
            
            // Optional link to user account
            $table->foreignId('user_id')
                  ->nullable()
                  ->constrained('users')
                  ->onDelete('set null');
            
            // Display settings
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_approved')->default(false); // Moderation
            $table->integer('display_order')->default(0);
            
            // Additional info
            $table->string('location')->nullable(); // City or gym location
            $table->date('member_since')->nullable();
            $table->json('transformation_photos')->nullable(); // Before/after
            
            $table->timestamps();
            
            // Indexes
            $table->index('is_featured');
            $table->index('is_approved');
            $table->index('rating');
            $table->index('display_order');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('testimonials');
    }
};
