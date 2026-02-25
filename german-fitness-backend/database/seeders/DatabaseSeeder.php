<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            TrainerSeeder::class,
            MembershipPlanSeeder::class,
            ClassScheduleSeeder::class,
            TestimonialSeeder::class,
            GallerySeeder::class,
            EventSeeder::class,
        ]);
    }
}

