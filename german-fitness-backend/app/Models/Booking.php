<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'class_schedule_id',
        'booking_date',
        'status',
        'checked_in_at',
        'checked_out_at',
        'cancelled_at',
        'cancellation_reason',
        'refund_status',
        'notes',
        'is_guest',
        'guest_fee',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'booking_date' => 'date',
        'checked_in_at' => 'datetime',
        'checked_out_at' => 'datetime',
        'cancelled_at' => 'datetime',
        'is_guest' => 'boolean',
        'guest_fee' => 'decimal:2',
    ];

    /**
     * Get the user who made this booking
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the class schedule
     */
    public function classSchedule(): BelongsTo
    {
        return $this->belongsTo(ClassSchedule::class, 'class_schedule_id');
    }

    /**
     * Check if booking is confirmed
     */
    public function isConfirmed(): bool
    {
        return $this->status === 'CONFIRMED';
    }

    /**
     * Check if booking is cancelled
     */
    public function isCancelled(): bool
    {
        return $this->status === 'CANCELLED';
    }

    /**
     * Check if user has checked in
     */
    public function hasCheckedIn(): bool
    {
        return !is_null($this->checked_in_at);
    }

    /**
     * Check if booking can be cancelled (24 hours before class)
     */
    public function canBeCancelled(): bool
    {
        if ($this->isCancelled()) {
            return false;
        }
        
        $classDateTime = $this->booking_date->copy()->setTimeFromTimeString(
            $this->classSchedule->start_time
        );
        
        return now()->diffInHours($classDateTime, false) >= 24;
    }

    /**
     * Scope for confirmed bookings
     */
    public function scopeConfirmed($query)
    {
        return $query->where('status', 'CONFIRMED');
    }

    /**
     * Scope for upcoming bookings
     */
    public function scopeUpcoming($query)
    {
        return $query->where('booking_date', '>=', now()->startOfDay())
                     ->where('status', 'CONFIRMED');
    }

    /**
     * Scope for past bookings
     */
    public function scopePast($query)
    {
        return $query->where('booking_date', '<', now()->startOfDay());
    }
}
