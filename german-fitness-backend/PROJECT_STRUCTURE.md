# German Fitness Laravel Backend - Project Structure

## Overview
Complete Laravel backend API for German Fitness gym website with MySQL database, RESTful APIs, and Sanctum authentication.

## Directory Structure

```
german-fitness-backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── Api/
│   │   │       ├── AuthController.php          # User authentication
│   │   │       ├── BookingController.php       # Class bookings
│   │   │       ├── ClassController.php         # Class schedules
│   │   │       ├── MembershipPlanController.php # Membership plans
│   │   │       ├── SubscriptionController.php  # User subscriptions
│   │   │       ├── TrainerController.php       # Trainer management
│   │   │       └── UserController.php          # User management
│   │   └── Middleware/
│   │       └── EnsureAdmin.php                 # Admin role middleware
│   ├── Models/
│   │   ├── Attendance.php                      # Check-in/out tracking
│   │   ├── Booking.php                         # Class reservations
│   │   ├── ClassSchedule.php                   # Gym class schedules
│   │   ├── DietPlan.php                        # Nutrition plans
│   │   ├── Event.php                           # Gym events
│   │   ├── Gallery.php                         # Image gallery
│   │   ├── MembershipPlan.php                  # Subscription tiers
│   │   ├── Payment.php                         # Stripe payments
│   │   ├── Subscription.php                    # User memberships
│   │   ├── Testimonial.php                     # Client reviews
│   │   ├── Trainer.php                         # Trainer profiles
│   │   ├── User.php                            # User accounts
│   │   └── WorkoutPlan.php                     # Training programs
│   └── Providers/
│       └── AppServiceProvider.php              # App configuration
├── bootstrap/
│   ├── app.php                                 # Application bootstrap
│   └── cache/                                  # Cached files
├── config/
│   ├── app.php                                 # App settings
│   └── cors.php                                # CORS for frontend
├── database/
│   ├── factories/                              # Model factories
│   ├── migrations/                             # Database schema
│   │   ├── 2024_01_01_000001_create_users_table.php
│   │   ├── 2024_01_01_000002_create_trainers_table.php
│   │   ├── 2024_01_01_000003_create_membership_plans_table.php
│   │   ├── 2024_01_01_000004_create_subscriptions_table.php
│   │   ├── 2024_01_01_000005_create_class_schedules_table.php
│   │   ├── 2024_01_01_000006_create_bookings_table.php
│   │   ├── 2024_01_01_000007_create_workout_plans_table.php
│   │   ├── 2024_01_01_000008_create_diet_plans_table.php
│   │   ├── 2024_01_01_000009_create_attendance_table.php
│   │   ├── 2024_01_01_000010_create_payments_table.php
│   │   ├── 2024_01_01_000011_create_galleries_table.php
│   │   ├── 2024_01_01_000012_create_testimonials_table.php
│   │   ├── 2024_01_01_000013_create_events_table.php
│   │   └── 2024_01_01_000014_create_personal_access_tokens_table.php
│   └── seeders/
│       ├── DatabaseSeeder.php                  # Main seeder
│       ├── MembershipPlanSeeder.php            # Sample plans
│       ├── TrainerSeeder.php                   # Sample trainers
│       └── UserSeeder.php                      # Admin & test users
├── public/
│   └── index.php                               # Entry point
├── routes/
│   ├── api.php                                 # API routes
│   ├── console.php                             # Artisan commands
│   └── web.php                                 # Web routes
├── storage/
│   ├── framework/                              # Framework storage
│   └── logs/                                   # Application logs
├── artisan                                     # CLI tool
├── composer.json                               # Dependencies
├── .env.example                                # Environment template
├── README.md                                   # Documentation
├── SETUP.md                                    # Setup guide
└── PROJECT_STRUCTURE.md                        # This file
```

## Key Features

### 1. Authentication (Laravel Sanctum)
- Token-based API authentication
- User registration & login
- Password reset functionality
- Role-based access (USER, TRAINER, ADMIN)

### 2. Database Models (13 entities)
- **User**: Member accounts with profiles
- **Trainer**: Instructor profiles with social links
- **MembershipPlan**: Subscription tiers
- **Subscription**: User memberships
- **ClassSchedule**: Weekly class schedule
- **Booking**: Class reservations
- **WorkoutPlan**: Personalized training
- **DietPlan**: Nutrition tracking
- **Attendance**: Check-in/out system
- **Payment**: Stripe integration
- **Gallery**: Image management
- **Testimonial**: Client reviews
- **Event**: Gym events

### 3. API Controllers (7 controllers)
- Full CRUD operations
- RESTful API design
- JSON responses with consistent format
- Input validation
- Error handling

### 4. API Endpoints

#### Public Endpoints
```
GET    /api/trainers              # List trainers
GET    /api/trainers/{id}         # Trainer details
GET    /api/classes               # List classes
GET    /api/classes/weekly-schedule  # Weekly schedule
GET    /api/membership-plans      # List plans
```

#### Authentication
```
POST   /api/register              # Register
POST   /api/login                 # Login
POST   /api/logout                # Logout (auth)
GET    /api/user                  # Current user (auth)
```

#### Protected Endpoints (requires auth)
```
POST   /api/bookings              # Book class
GET    /api/bookings              # My bookings
DELETE /api/bookings/{id}         # Cancel booking
POST   /api/subscriptions         # Subscribe
GET    /api/subscriptions         # My subscriptions
PUT    /api/profile               # Update profile
```

#### Admin Endpoints (requires admin)
```
POST   /api/admin/trainers        # Create trainer
PUT    /api/admin/trainers/{id}   # Update trainer
DELETE /api/admin/trainers/{id}   # Delete trainer
POST   /api/admin/classes         # Create class
PUT    /api/admin/classes/{id}    # Update class
DELETE /api/admin/classes/{id}    # Delete class
POST   /api/admin/membership-plans    # Create plan
PUT    /api/admin/membership-plans/{id}  # Update plan
DELETE /api/admin/membership-plans/{id}  # Delete plan
```

## Installation

```bash
# 1. Install dependencies
composer install

# 2. Setup environment
cp .env.example .env
php artisan key:generate

# 3. Configure database in .env
# DB_DATABASE=german_fitness
# DB_USERNAME=root
# DB_PASSWORD=your_password

# 4. Run migrations
php artisan migrate

# 5. Seed data
php artisan db:seed

# 6. Start server
php artisan serve
```

## Default Credentials
- **Admin**: admin@germanfitness.com / password
- **User**: user@example.com / password

## Next Steps
1. Install PHP and Composer
2. Run `composer install`
3. Setup MySQL database
4. Configure `.env` file
5. Run migrations and seeders
6. Start development server
7. Connect frontend to API

See `SETUP.md` for detailed setup instructions.
