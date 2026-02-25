<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MembershipPlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $plans = [
            [
                'name' => 'Basic',
                'description' => 'Perfect for beginners starting their fitness journey',
                'price' => 29.99,
                'duration' => 30,
                'features' => json_encode([
                    'Access to gym equipment',
                    'Locker room access',
                    'Free WiFi',
                    '2 group classes per week',
                    'Basic fitness assessment'
                ]),
                'is_popular' => false,
                'max_classes_per_week' => 2,
                'includes_personal_training' => false,
                'includes_nutrition_plan' => false,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Premium',
                'description' => 'Most popular choice for serious fitness enthusiasts',
                'price' => 59.99,
                'duration' => 30,
                'features' => json_encode([
                    'Unlimited gym access',
                    'Unlimited group classes',
                    'Locker room with towel service',
                    'Free WiFi',
                    '1 personal training session per month',
                    'Nutrition consultation',
                    'Access to sauna & spa',
                    'Guest passes (2 per month)'
                ]),
                'is_popular' => true,
                'max_classes_per_week' => null,
                'includes_personal_training' => true,
                'includes_nutrition_plan' => true,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Elite',
                'description' => 'Ultimate fitness experience with premium benefits',
                'price' => 99.99,
                'duration' => 30,
                'features' => json_encode([
                    '24/7 gym access',
                    'Unlimited group classes',
                    'Premium locker room',
                    'Free WiFi',
                    '4 personal training sessions per month',
                    'Custom nutrition plan',
                    'Unlimited sauna & spa access',
                    'Unlimited guest passes',
                    'Priority class booking',
                    'Recovery room access',
                    'Monthly body composition analysis'
                ]),
                'is_popular' => false,
                'max_classes_per_week' => null,
                'includes_personal_training' => true,
                'includes_nutrition_plan' => true,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Student',
                'description' => 'Special rate for students with valid ID',
                'price' => 19.99,
                'duration' => 30,
                'features' => json_encode([
                    'Access to gym equipment',
                    '3 group classes per week',
                    'Locker room access',
                    'Free WiFi',
                    'Study lounge access'
                ]),
                'is_popular' => false,
                'max_classes_per_week' => 3,
                'includes_personal_training' => false,
                'includes_nutrition_plan' => false,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('membership_plans')->insert($plans);
    }
}
