<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Admin User
        DB::table('users')->insert([
            'name' => 'Admin User',
            'email' => 'admin@germanfitness.com',
            'password' => Hash::make('password'),
            'phone' => '+49 123 456 789',
            'role' => 'ADMIN',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Regular Users
        DB::table('users')->insert([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => Hash::make('password'),
            'phone' => '+49 234 567 890',
            'date_of_birth' => '1990-05-15',
            'gender' => 'male',
            'role' => 'USER',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('users')->insert([
            'name' => 'Jane Smith',
            'email' => 'jane@example.com',
            'password' => Hash::make('password'),
            'phone' => '+49 345 678 901',
            'date_of_birth' => '1992-08-22',
            'gender' => 'female',
            'role' => 'USER',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('users')->insert([
            'name' => 'Michael Johnson',
            'email' => 'michael@example.com',
            'password' => Hash::make('password'),
            'phone' => '+49 456 789 012',
            'date_of_birth' => '1988-03-10',
            'gender' => 'male',
            'role' => 'USER',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}

