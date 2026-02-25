<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Event;
use Carbon\Carbon;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $events = [
            [
                'title' => 'Summer Fitness Challenge 2024',
                'description' => 'Join our 30-day summer fitness challenge! Compete with other members, track your progress, and win amazing prizes including free membership months and personal training sessions.',
                'image' => 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
                'date' => Carbon::now()->addDays(15),
                'location' => 'Main Gym Floor',
                'category' => 'challenge',
            ],
            [
                'title' => 'Nutrition Workshop: Eating for Performance',
                'description' => 'Learn how to fuel your body for optimal performance with our registered dietitian. Topics include meal timing, macro balancing, and supplement guidance.',
                'image' => 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop',
                'date' => Carbon::now()->addDays(7),
                'location' => 'Seminar Room A',
                'category' => 'workshop',
            ],
            [
                'title' => 'Member Appreciation Day',
                'description' => 'A day to celebrate YOU! Free fitness assessments, smoothie bar, massage stations, and exclusive member-only discounts on merchandise and supplements.',
                'image' => 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop',
                'date' => Carbon::now()->addDays(30),
                'location' => 'Entire Facility',
                'category' => 'social',
            ],
            [
                'title' => 'Yoga Retreat: Mind & Body',
                'description' => 'A weekend yoga retreat focusing on mindfulness, meditation, and advanced yoga practices. All levels welcome. Includes healthy meals and accommodation.',
                'image' => 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=600&fit=crop',
                'date' => Carbon::now()->addDays(45),
                'location' => 'Mountain Wellness Center',
                'category' => 'retreat',
            ],
            [
                'title' => 'Powerlifting Competition',
                'description' => 'Test your strength in our annual powerlifting meet. Categories for men and women, all weight classes. Spectators welcome!',
                'image' => 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
                'date' => Carbon::now()->addDays(60),
                'location' => 'Weight Room',
                'category' => 'competition',
            ],
            [
                'title' => 'New Year Transformation Kickoff',
                'description' => 'Start the year right with our transformation program. Includes personalized workout plans, nutrition coaching, and weekly check-ins.',
                'image' => 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop',
                'date' => Carbon::now()->addDays(90),
                'location' => 'Main Studio',
                'category' => 'program',
            ],
        ];

        foreach ($events as $event) {
            Event::create($event);
        }
    }
}
