<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Gallery;

class GallerySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $images = [
            [
                'title' => 'Modern Gym Floor',
                'image' => 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
                'category' => 'facilities',
            ],
            [
                'title' => 'Weight Training Area',
                'image' => 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop',
                'category' => 'facilities',
            ],
            [
                'title' => 'Yoga Studio',
                'image' => 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&h=600&fit=crop',
                'category' => 'facilities',
            ],
            [
                'title' => 'Cardio Zone',
                'image' => 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop',
                'category' => 'facilities',
            ],
            [
                'title' => 'Group Class in Action',
                'image' => 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop',
                'category' => 'classes',
            ],
            [
                'title' => 'Personal Training Session',
                'image' => 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
                'category' => 'classes',
            ],
            [
                'title' => 'Boxing Workout',
                'image' => 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&h=600&fit=crop',
                'category' => 'classes',
            ],
            [
                'title' => 'Swimming Pool',
                'image' => 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&h=600&fit=crop',
                'category' => 'facilities',
            ],
            [
                'title' => 'Locker Rooms',
                'image' => 'https://images.unsplash.com/photo-1581009146145-b5ef050c149a?w=800&h=600&fit=crop',
                'category' => 'facilities',
            ],
            [
                'title' => 'Member Success Story',
                'image' => 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&h=600&fit=crop',
                'category' => 'members',
            ],
        ];

        foreach ($images as $image) {
            Gallery::create($image);
        }
    }
}
