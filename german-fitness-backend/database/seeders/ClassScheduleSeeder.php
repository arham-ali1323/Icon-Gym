<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ClassSchedule;
use App\Models\Trainer;

class ClassScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $classes = [
            [
                'class_name' => 'HIIT Blast',
                'slug' => 'hiit-blast',
                'description' => 'High-intensity interval training to maximize calorie burn and improve cardiovascular fitness.',
                'category' => 'cardio',
                'day_of_week' => 1, // Monday
                'start_time' => '09:00',
                'end_time' => '10:00',
                'duration' => 60,
                'capacity' => 20,
                'difficulty' => 'intermediate',
                'location' => 'Main Studio',
            ],
            [
                'class_name' => 'Power Yoga',
                'slug' => 'power-yoga',
                'description' => 'Dynamic yoga flow focusing on strength, flexibility, and mindfulness.',
                'category' => 'yoga',
                'day_of_week' => 1,
                'start_time' => '18:00',
                'end_time' => '19:00',
                'duration' => 60,
                'capacity' => 15,
                'difficulty' => 'intermediate',
                'location' => 'Yoga Room',
            ],
            [
                'class_name' => 'Strength Training',
                'slug' => 'strength-training',
                'description' => 'Full-body strength workout using free weights and machines.',
                'category' => 'strength',
                'day_of_week' => 2, // Tuesday
                'start_time' => '10:00',
                'end_time' => '11:00',
                'duration' => 60,
                'capacity' => 12,
                'difficulty' => 'advanced',
                'location' => 'Weight Room',
            ],
            [
                'class_name' => 'Boxing Fitness',
                'slug' => 'boxing-fitness',
                'description' => 'Cardio boxing workout combining punches, footwork, and conditioning.',
                'category' => 'boxing',
                'day_of_week' => 2,
                'start_time' => '19:00',
                'end_time' => '20:00',
                'duration' => 60,
                'capacity' => 16,
                'difficulty' => 'intermediate',
                'location' => 'Boxing Studio',
            ],
            [
                'class_name' => 'Pilates Core',
                'slug' => 'pilates-core',
                'description' => 'Core-strengthening Pilates exercises for stability and posture.',
                'category' => 'pilates',
                'day_of_week' => 3, // Wednesday
                'start_time' => '09:00',
                'end_time' => '10:00',
                'duration' => 60,
                'capacity' => 14,
                'difficulty' => 'beginner',
                'location' => 'Studio B',
            ],
            [
                'class_name' => 'CrossFit WOD',
                'slug' => 'crossfit-wod',
                'description' => 'High-intensity functional training with varied daily workouts.',
                'category' => 'crossfit',
                'day_of_week' => 3,
                'start_time' => '18:00',
                'end_time' => '19:30',
                'duration' => 90,
                'capacity' => 12,
                'difficulty' => 'advanced',
                'location' => 'CrossFit Area',
            ],
            [
                'class_name' => 'Spin Cycle',
                'slug' => 'spin-cycle',
                'description' => 'Indoor cycling class with music and interval training.',
                'category' => 'cycling',
                'day_of_week' => 4, // Thursday
                'start_time' => '07:00',
                'end_time' => '08:00',
                'duration' => 60,
                'capacity' => 25,
                'difficulty' => 'intermediate',
                'location' => 'Spin Studio',
            ],
            [
                'class_name' => 'Zumba Dance',
                'slug' => 'zumba-dance',
                'description' => 'Fun dance workout with Latin and international music.',
                'category' => 'dance',
                'day_of_week' => 4,
                'start_time' => '19:00',
                'end_time' => '20:00',
                'duration' => 60,
                'capacity' => 30,
                'difficulty' => 'beginner',
                'location' => 'Main Studio',
            ],
            [
                'class_name' => 'Body Pump',
                'slug' => 'body-pump',
                'description' => 'Barbell-based strength training for all major muscle groups.',
                'category' => 'strength',
                'day_of_week' => 5, // Friday
                'start_time' => '17:00',
                'end_time' => '18:00',
                'duration' => 60,
                'capacity' => 20,
                'difficulty' => 'intermediate',
                'location' => 'Weight Room',
            ],
            [
                'class_name' => 'Weekend Warrior',
                'slug' => 'weekend-warrior',
                'description' => 'Full-body conditioning workout to start your weekend strong.',
                'category' => 'strength',
                'day_of_week' => 6, // Saturday
                'start_time' => '10:00',
                'end_time' => '11:30',
                'duration' => 90,
                'capacity' => 18,
                'difficulty' => 'intermediate',
                'location' => 'Main Studio',
            ],
        ];

        $trainers = Trainer::all();

        foreach ($classes as $class) {
            $class['trainer_id'] = $trainers->random()->id ?? null;
            ClassSchedule::create($class);
        }
    }
}
