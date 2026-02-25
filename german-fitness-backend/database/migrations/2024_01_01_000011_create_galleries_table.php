<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * Creates gallery table for gym photos and media
     */
    public function up(): void
    {
        Schema::create('galleries', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('image'); // URL to the image
            
            // Categorization
            $table->enum('category', [
                'facilities',
                'equipment',
                'classes',
                'events',
                'trainers',
                'members',
                'transformations',
                'other'
            ])->default('other');
            
            // Display order
            $table->integer('display_order')->default(0);
            
            // Status
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            
            // Metadata
            $table->string('alt_text')->nullable(); // For accessibility
            $table->json('tags')->nullable();
            
            // Uploaded by
            $table->foreignId('uploaded_by')
                  ->nullable()
                  ->constrained('users')
                  ->onDelete('set null');
            
            $table->timestamps();
            
            // Indexes
            $table->index('category');
            $table->index('is_featured');
            $table->index('is_active');
            $table->index('display_order');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('galleries');
    }
};
