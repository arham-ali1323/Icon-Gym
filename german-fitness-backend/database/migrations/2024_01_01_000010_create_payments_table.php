<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * Creates payments table for transaction tracking
     */
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                  ->constrained('users')
                  ->onDelete('cascade');
            
            // Payment details
            $table->decimal('amount', 10, 2);
            $table->string('currency', 3)->default('USD');
            $table->enum('status', [
                'PENDING',
                'COMPLETED',
                'FAILED',
                'REFUNDED',
                'CANCELLED',
                'DISPUTED'
            ])->default('PENDING');
            
            // Payment type
            $table->enum('type', [
                'SUBSCRIPTION',
                'CLASS_BOOKING',
                'PERSONAL_TRAINING',
                'PRODUCT',
                'GUEST_FEE',
                'OTHER'
            ])->default('OTHER');
            
            // Related records
            $table->foreignId('subscription_id')
                  ->nullable()
                  ->constrained('subscriptions')
                  ->onDelete('set null');
            $table->foreignId('booking_id')
                  ->nullable()
                  ->constrained('bookings')
                  ->onDelete('set null');
            
            // Stripe integration
            $table->string('stripe_payment_intent_id')->nullable();
            $table->string('stripe_charge_id')->nullable();
            $table->string('stripe_customer_id')->nullable();
            
            // Payment method
            $table->string('payment_method')->nullable(); // card, bank_transfer, cash, etc.
            $table->string('payment_method_details')->nullable(); // Last 4 digits, etc.
            
            // Description and metadata
            $table->text('description')->nullable();
            $table->json('metadata')->nullable();
            
            // Refund tracking
            $table->decimal('refunded_amount', 10, 2)->default(0);
            $table->timestamp('refunded_at')->nullable();
            
            // Receipt
            $table->string('receipt_url')->nullable();
            $table->string('invoice_number')->nullable();
            
            $table->timestamps();
            
            // Indexes
            $table->index('user_id');
            $table->index('status');
            $table->index('type');
            $table->index('stripe_payment_intent_id');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
