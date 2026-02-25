<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * Creates the trainers table with detailed profile information
     */
    public function up(): void
    {
        Schema::create('trainers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone');
            $table->string('image')->nullable();
            $table->string('specialization'); // e.g., "Strength & Conditioning"
            $table->integer('experience'); // Years of experience
            $table->text('bio')->nullable();
            
            // Social media links
            $table->string('facebook')->nullable();
            $table->string('instagram')->nullable();
            $table->string('twitter')->nullable();
            $table->string('linkedin')->nullable();
            
            // Additional professional info
            $table->string('education')->nullable();
            $table->json('certifications')->nullable(); // Array of certifications
            $table->json('skills')->nullable(); // Array of skills with percentages
            $table->json('work_experience')->nullable(); // Array of work history
            
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            // Indexes
            $table->index('email');
            $table->index('specialization');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trainers');
    }
};
