<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ClassSchedule extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'class_name',
        'slug',
        'description',
        'image',
        'category',
        'day_of_week',
        'start_time',
        'end_time',
        'duration',
        'trainer_id',
        'instructor_name',
        'capacity',
        'booked_count',
        'difficulty',
        'location',
        'room',
        'is_recurring',
        'is_active',
        'specific_date',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'day_of_week' => 'integer',
        'duration' => 'integer',
        'capacity' => 'integer',
        'booked_count' => 'integer',
        'is_recurring' => 'boolean',
        'is_active' => 'boolean',
        'specific_date' => 'date',
    ];

    /**
     * Get the trainer for this class
     */
    public function trainer(): BelongsTo
    {
        return $this->belongsTo(Trainer::class);
    }

    /**
     * Get bookings for this class
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class, 'class_schedule_id');
    }

    /**
     * Get attendance records for this class
     */
    public function attendance(): HasMany
    {
        return $this->hasMany(Attendance::class, 'class_schedule_id');
    }

    /**
     * Check if class is full
     */
    public function isFull(): bool
    {
        return $this->booked_count >= $this->capacity;
    }

    /**
     * Get available spots
     */
    public function availableSpots(): int
    {
        return max(0, $this->capacity - $this->booked_count);
    }

    /**
     * Get day name
     */
    public function getDayNameAttribute(): string
    {
        $days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return $days[$this->day_of_week] ?? 'Unknown';
    }

    /**
     * Scope for active classes
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope for specific day of week
     */
    public function scopeOnDay($query, int $dayOfWeek)
    {
        return $query->where('day_of_week', $dayOfWeek);
    }

    /**
     * Scope for specific category
     */
    public function scopeByCategory($query, string $category)
    {
        return $query->where('category', $category);
    }

    /**
     * Scope for classes with available spots
     */
    public function scopeWithAvailableSpots($query)
    {
        return $query->whereRaw('booked_count < capacity');
    }
}
