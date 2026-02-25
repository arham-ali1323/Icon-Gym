<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Testimonial;

class TestimonialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $testimonials = [
            [
                'name' => 'Sarah Johnson',
                'image' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
                'rating' => 5,
                'content' => 'German Fitness completely transformed my approach to health. The trainers are incredibly knowledgeable and supportive. I have lost 30 pounds and gained so much confidence!',
                'position' => 'Marketing Executive',
            ],
            [
                'name' => 'Michael Chen',
                'image' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
                'rating' => 5,
                'content' => 'The facilities are world-class and the community here is amazing. I have been coming for 2 years and every workout feels fresh and challenging.',
                'position' => 'Software Engineer',
            ],
            [
                'name' => 'Emma Williams',
                'image' => 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
                'rating' => 5,
                'content' => 'As a busy mom, I appreciate the flexible class schedules. The childcare service is a game-changer. Best gym I have ever been to!',
                'position' => 'Mother of Two',
            ],
            [
                'name' => 'David Martinez',
                'image' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
                'rating' => 5,
                'content' => 'The personal training program helped me prepare for my first marathon. The trainers really care about your goals and push you to achieve them.',
                'position' => 'Marathon Runner',
            ],
            [
                'name' => 'Lisa Anderson',
                'image' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
                'rating' => 5,
                'content' => 'I was intimidated to start, but the beginner classes and supportive environment made it easy. Now I am addicted to the 6 AM HIIT classes!',
                'position' => 'Teacher',
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }
    }
}
