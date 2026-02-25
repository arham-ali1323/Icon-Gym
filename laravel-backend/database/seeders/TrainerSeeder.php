<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TrainerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $trainers = [
            [
                'name' => 'Marcus Stone',
                'email' => 'marcus.stone@germanfitness.com',
                'phone' => '+78 911 987 321',
                'image' => 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=500&fit=crop',
                'specialization' => 'Strength & Conditioning',
                'experience' => 12,
                'bio' => 'Marcus is a certified strength and conditioning specialist with over 12 years of experience helping athletes and fitness enthusiasts achieve their peak performance.',
                'facebook' => 'https://facebook.com/marcusstone',
                'instagram' => 'https://instagram.com/marcusstone',
                'twitter' => 'https://twitter.com/marcusstone',
                'linkedin' => null,
                'education' => "Bachelor's in Exercise Science, University of Sports Medicine",
                'certifications' => json_encode(['NSCA-CSCS', 'ACSM-CPT']),
                'skills' => json_encode([
                    ['name' => 'Strength Training', 'percentage' => 95],
                    ['name' => 'Olympic Lifting', 'percentage' => 88],
                    ['name' => 'Sports Conditioning', 'percentage' => 92],
                    ['name' => 'Injury Prevention', 'percentage' => 85]
                ]),
                'work_experience' => json_encode([
                    'HEAD STRENGTH COACH AT BERLIN PERFORMANCE CENTER',
                    'ASSISTANT STRENGTH COACH AT NATIONAL SPORTS ACADEMY',
                    'PERSONAL TRAINER AT ELITE FITNESS STUDIO'
                ]),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Alex Rivera',
                'email' => 'alex.rivera@germanfitness.com',
                'phone' => '+78 922 876 432',
                'image' => 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=500&fit=crop',
                'specialization' => 'HIIT & Performance',
                'experience' => 8,
                'bio' => 'Alex specializes in high-intensity interval training and performance coaching, helping clients burn fat and build endurance efficiently.',
                'facebook' => 'https://facebook.com/alexrivera',
                'instagram' => 'https://instagram.com/alexrivera',
                'twitter' => 'https://twitter.com/alexrivera',
                'linkedin' => null,
                'education' => "Master's in Kinesiology, German Sports University",
                'certifications' => json_encode(['ACSM-CPT', 'FMS']),
                'skills' => json_encode([
                    ['name' => 'HIIT Training', 'percentage' => 98],
                    ['name' => 'Metabolic Conditioning', 'percentage' => 91],
                    ['name' => 'Cardio Programming', 'percentage' => 87],
                    ['name' => 'Group Fitness', 'percentage' => 84]
                ]),
                'work_experience' => json_encode([
                    'HIIT SPECIALIST AT URBAN FITNESS HUB',
                    'PERFORMANCE COACH AT ATHLETIC DEVELOPMENT CENTER',
                    'GROUP FITNESS INSTRUCTOR AT POWERHOUSE GYM'
                ]),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Sarah Mitchell',
                'email' => 'sarah.mitchell@germanfitness.com',
                'phone' => '+78 933 765 543',
                'image' => 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&h=500&fit=crop',
                'specialization' => 'Yoga & Flexibility',
                'experience' => 10,
                'bio' => 'Sarah is a certified yoga instructor and flexibility expert, guiding clients through mindful movement and stress relief practices.',
                'facebook' => 'https://facebook.com/sarahmitchell',
                'instagram' => 'https://instagram.com/sarahmitchell',
                'twitter' => 'https://twitter.com/sarahmitchell',
                'linkedin' => null,
                'education' => 'Advanced Yoga Teacher Training, International Yoga Federation',
                'certifications' => json_encode(['RYT-500', 'CYT']),
                'skills' => json_encode([
                    ['name' => 'Hatha Yoga', 'percentage' => 96],
                    ['name' => 'Vinyasa Flow', 'percentage' => 93],
                    ['name' => 'Flexibility Training', 'percentage' => 90],
                    ['name' => 'Meditation', 'percentage' => 88]
                ]),
                'work_experience' => json_encode([
                    'SENIOR YOGA INSTRUCTOR AT MINDFULNESS STUDIO',
                    'FLEXIBILITY COACH AT WELLNESS CENTER',
                    'YOGA THERAPIST AT HOLISTIC HEALTH CLINIC'
                ]),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Jake Wilson',
                'email' => 'jake.wilson@germanfitness.com',
                'phone' => '+78 944 654 654',
                'image' => 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400&h=500&fit=crop',
                'specialization' => 'CrossFit Training',
                'experience' => 9,
                'bio' => 'Jake is a CrossFit Level 2 trainer passionate about functional fitness, helping clients develop strength, power, and overall athleticism.',
                'facebook' => 'https://facebook.com/jakewilson',
                'instagram' => 'https://instagram.com/jakewilson',
                'twitter' => 'https://twitter.com/jakewilson',
                'linkedin' => null,
                'education' => "Bachelor's in Sports Science, European Fitness Academy",
                'certifications' => json_encode(['CrossFit L2', 'USAW']),
                'skills' => json_encode([
                    ['name' => 'CrossFit Training', 'percentage' => 94],
                    ['name' => 'Olympic Weightlifting', 'percentage' => 89],
                    ['name' => 'Gymnastics', 'percentage' => 82],
                    ['name' => 'Functional Movement', 'percentage' => 91]
                ]),
                'work_experience' => json_encode([
                    'HEAD CROSSFIT COACH AT IRON TEMPLE',
                    'CROSSFIT COACH AT FUNCTIONAL FITNESS BOX',
                    'STRENGTH & CONDITIONING COACH AT ATHLETE PERFORMANCE LAB'
                ]),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'David Chen',
                'email' => 'david.chen@germanfitness.com',
                'phone' => '+78 955 543 765',
                'image' => 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=500&fit=crop',
                'specialization' => 'Boxing & Cardio',
                'experience' => 11,
                'bio' => 'David brings 11 years of boxing expertise to help clients improve cardiovascular health, coordination, and self-defense skills.',
                'facebook' => 'https://facebook.com/davidchen',
                'instagram' => 'https://instagram.com/davidchen',
                'twitter' => 'https://twitter.com/davidchen',
                'linkedin' => null,
                'education' => 'Professional Boxing Certification, International Boxing Association',
                'certifications' => json_encode(['ABAE', 'ACSM-CPT']),
                'skills' => json_encode([
                    ['name' => 'Boxing Technique', 'percentage' => 97],
                    ['name' => 'Cardio Conditioning', 'percentage' => 93],
                    ['name' => 'Self-Defense', 'percentage' => 89],
                    ['name' => 'Pad Work', 'percentage' => 95]
                ]),
                'work_experience' => json_encode([
                    'HEAD BOXING COACH AT CHAMPIONS GYM',
                    'BOXING INSTRUCTOR AT FIGHT CLUB FITNESS',
                    'CARDIO SPECIALIST AT HIGH INTENSITY STUDIO'
                ]),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Michael Brooks',
                'email' => 'michael.brooks@germanfitness.com',
                'phone' => '+78 966 432 876',
                'image' => 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=500&fit=crop',
                'specialization' => 'Bodybuilding',
                'experience' => 15,
                'bio' => 'Michael is a seasoned bodybuilding coach with 15 years of experience, specializing in muscle growth, nutrition, and competition preparation.',
                'facebook' => 'https://facebook.com/michaelbrooks',
                'instagram' => 'https://instagram.com/michaelbrooks',
                'twitter' => 'https://twitter.com/michaelbrooks',
                'linkedin' => null,
                'education' => "Master's in Sports Nutrition, International Fitness Institute",
                'certifications' => json_encode(['IFBB Pro', 'ISSN']),
                'skills' => json_encode([
                    ['name' => 'Bodybuilding', 'percentage' => 98],
                    ['name' => 'Nutrition Planning', 'percentage' => 94],
                    ['name' => 'Competition Prep', 'percentage' => 96],
                    ['name' => 'Muscle Hypertrophy', 'percentage' => 92]
                ]),
                'work_experience' => json_encode([
                    'PRO BODYBUILDING COACH AT MUSCLE FACTORY',
                    'NUTRITION SPECIALIST AT PHYSIQUE ENHANCEMENT CENTER',
                    'PERSONAL TRAINER AT GOLD\'S GYM'
                ]),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('trainers')->insert($trainers);
    }
}
