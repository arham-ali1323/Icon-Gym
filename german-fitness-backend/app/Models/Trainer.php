<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Trainer extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'image',
        'specialization',
        'experience',
        'bio',
        'facebook',
        'instagram',
        'twitter',
        'linkedin',
        'education',
        'certifications',
        'skills',
        'work_experience',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'experience' => 'integer',
        'certifications' => 'array',
        'skills' => 'array',
        'work_experience' => 'array',
        'is_active' => 'boolean',
    ];

    /**
     * Get trainer's workout plans
     */
    public function workoutPlans(): HasMany
    {
        return $this->hasMany(WorkoutPlan::class);
    }

    /**
     * Get trainer's class schedules
     */
    public function classSchedules(): HasMany
    {
        return $this->hasMany(ClassSchedule::class);
    }

    /**
     * Get full trainer profile with formatted data
     */
    public function fullProfile(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'image' => $this->image,
            'specialization' => $this->specialization,
            'experience' => $this->experience,
            'bio' => $this->bio,
            'social' => [
                'facebook' => $this->facebook,
                'instagram' => $this->instagram,
                'twitter' => $this->twitter,
                'linkedin' => $this->linkedin,
            ],
            'education' => $this->education,
            'certifications' => $this->certifications ?? [],
            'skills' => $this->skills ?? [],
            'work_experience' => $this->work_experience ?? [],
            'is_active' => $this->is_active,
            'classes_count' => $this->classSchedules()->count(),
            'workout_plans_count' => $this->workoutPlans()->count(),
            'created_at' => $this->created_at,
        ];
    }

    /**
     * Scope for active trainers
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope for searching by specialization
     */
    public function scopeBySpecialization($query, string $specialization)
    {
        return $query->where('specialization', 'LIKE', "%{$specialization}%");
    }
}
