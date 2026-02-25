<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * Creates events table for gym events and activities
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('slug')->unique();
            $table->string('image')->nullable();
            
            // Event timing
            $table->dateTime('start_date');
            $table->dateTime('end_date')->nullable();
            $table->boolean('is_all_day')->default(false);
            
            // Location
            $table->string('location');
            $table->string('address')->nullable();
            $table->string('room')->nullable();
            
            // Category and type
            $table->enum('category', [
                'workshop',
                'competition',
                'seminar',
                'social',
                'charity',
                'challenge',
                'open_house',
                'other'
            ])->default('other');
            
            // Capacity and registration
            $table->integer('capacity')->nullable();
            $table->integer('registered_count')->default(0);
            $table->boolean('requires_registration')->default(false);
            $table->decimal('registration_fee', 10, 2)->nullable();
            
            // Organizer
            $table->foreignId('organizer_id')
                  ->nullable()
                  ->constrained('users')
                  ->onDelete('set null');
            $table->string('organizer_name')->nullable();
            
            // Status
            $table->enum('status', [
                'DRAFT',
                'PUBLISHED',
                'CANCELLED',
                'COMPLETED'
            ])->default('DRAFT');
            
            // Additional info
            $table->json('tags')->nullable();
            $table->text('additional_info')->nullable();
            
            $table->timestamps();
            
            // Indexes
            $table->index('start_date');
            $table->index('category');
            $table->index('status');
            $table->index('slug');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
