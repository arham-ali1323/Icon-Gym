<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Event extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'description',
        'slug',
        'image',
        'start_date',
        'end_date',
        'is_all_day',
        'location',
        'address',
        'room',
        'category',
        'capacity',
        'registered_count',
        'requires_registration',
        'registration_fee',
        'organizer_id',
        'organizer_name',
        'status',
        'tags',
        'additional_info',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'is_all_day' => 'boolean',
        'capacity' => 'integer',
        'registered_count' => 'integer',
        'requires_registration' => 'boolean',
        'registration_fee' => 'decimal:2',
        'tags' => 'array',
    ];

    /**
     * Get the organizer
     */
    public function organizer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'organizer_id');
    }

    /**
     * Check if event is upcoming
     */
    public function isUpcoming(): bool
    {
        return $this->start_date > now();
    }

    /**
     * Check if event is ongoing
     */
    public function isOngoing(): bool
    {
        return $this->start_date <= now() && $this->end_date >= now();
    }

    /**
     * Check if event is past
     */
    public function isPast(): bool
    {
        return $this->end_date < now();
    }

    /**
     * Check if event is full
     */
    public function isFull(): bool
    {
        if (!$this->capacity) {
            return false;
        }
        return $this->registered_count >= $this->capacity;
    }

    /**
     * Scope for published events
     */
    public function scopePublished($query)
    {
        return $query->where('status', 'PUBLISHED');
    }

    /**
     * Scope for upcoming events
     */
    public function scopeUpcoming($query)
    {
        return $query->where('start_date', '>', now());
    }

    /**
     * Scope by category
     */
    public function scopeByCategory($query, string $category)
    {
        return $query->where('category', $category);
    }
}
