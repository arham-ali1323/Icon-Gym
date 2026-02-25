<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DietPlan extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'meals',
        'daily_calories',
        'protein',
        'carbs',
        'fats',
        'fiber',
        'diet_type',
        'user_id',
        'duration_days',
        'is_template',
        'start_date',
        'end_date',
        'status',
        'allergies',
        'restrictions',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'meals' => 'array',
        'daily_calories' => 'integer',
        'protein' => 'integer',
        'carbs' => 'integer',
        'fats' => 'integer',
        'fiber' => 'integer',
        'duration_days' => 'integer',
        'start_date' => 'date',
        'end_date' => 'date',
        'is_template' => 'boolean',
        'allergies' => 'array',
        'restrictions' => 'array',
    ];

    /**
     * Get the user this plan is assigned to
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get total macros
     */
    public function getTotalMacrosAttribute(): array
    {
        return [
            'calories' => $this->daily_calories,
            'protein' => $this->protein,
            'carbs' => $this->carbs,
            'fats' => $this->fats,
            'fiber' => $this->fiber,
        ];
    }

    /**
     * Scope for active plans
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'ACTIVE');
    }

    /**
     * Scope for templates
     */
    public function scopeTemplates($query)
    {
        return $query->where('is_template', true);
    }

    /**
     * Scope by diet type
     */
    public function scopeByDietType($query, string $type)
    {
        return $query->where('diet_type', $type);
    }
}
