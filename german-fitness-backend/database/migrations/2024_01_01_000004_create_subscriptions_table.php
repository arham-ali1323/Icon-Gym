<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * Creates subscriptions table linking users to membership plans
     */
    public function up(): void
    {
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                  ->constrained('users')
                  ->onDelete('cascade');
            $table->foreignId('plan_id')
                  ->constrained('membership_plans')
                  ->onDelete('restrict');
            
            // Subscription status
            $table->enum('status', [
                'ACTIVE', 
                'PENDING', 
                'CANCELLED', 
                'EXPIRED', 
                'SUSPENDED'
            ])->default('PENDING');
            
            // Date tracking
            $table->date('start_date');
            $table->date('end_date');
            $table->date('cancelled_at')->nullable();
            $table->string('cancellation_reason')->nullable();
            
            // Payment tracking
            $table->string('stripe_subscription_id')->nullable();
            $table->string('payment_method')->nullable();
            $table->decimal('amount_paid', 10, 2);
            
            // Auto-renewal
            $table->boolean('auto_renew')->default(true);
            
            $table->timestamps();
            
            // Indexes for common queries
            $table->index(['user_id', 'status']);
            $table->index(['plan_id', 'status']);
            $table->index('end_date');
            $table->index('stripe_subscription_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subscriptions');
    }
};
