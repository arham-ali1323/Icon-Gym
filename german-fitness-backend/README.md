# German Fitness - Laravel Backend

A comprehensive Laravel backend API for the German Fitness gym website.

## Features

- 🔐 **Authentication**: Laravel Sanctum token-based authentication
- 👥 **User Management**: Registration, login, profile management
- 🏋️ **Classes/Workouts**: Full CRUD operations
- 👨‍🏫 **Trainers**: Management with social links
- 💳 **Membership Plans**: Subscription management
- 📅 **Booking/Schedule**: Class scheduling and booking system
- 💰 **Payments**: Stripe integration ready
- 📊 **Dashboard**: Admin analytics and reporting

## Project Structure

```
laravel-backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Api/
│   │   │   │   ├── AuthController.php
│   │   │   │   ├── UserController.php
│   │   │   │   ├── TrainerController.php
│   │   │   │   ├── ClassController.php
│   │   │   │   ├── MembershipPlanController.php
│   │   │   │   ├── BookingController.php
│   │   │   │   ├── ScheduleController.php
│   │   │   │   ├── WorkoutPlanController.php
│   │   │   │   ├── DietPlanController.php
│   │   │   │   ├── AttendanceController.php
│   │   │   │   ├── PaymentController.php
│   │   │   │   ├── GalleryController.php
│   │   │   │   ├── TestimonialController.php
│   │   │   │   └── EventController.php
│   │   │   └── DashboardController.php
│   │   ├── Middleware/
│   │   │   ├── EnsureAdmin.php
│   │   │   └── EnsureTrainer.php
│   │   └── Requests/
│   │       ├── Auth/
│   │       ├── User/
│   │       ├── Trainer/
│   │       ├── Class/
│   │       └── Booking/
│   ├── Models/
│   │   ├── User.php
│   │   ├── Trainer.php
│   │   ├── MembershipPlan.php
│   │   ├── Subscription.php
│   │   ├── WorkoutPlan.php
│   │   ├── DietPlan.php
│   │   ├── Attendance.php
│   │   ├── Payment.php
│   │   ├── Gallery.php
│   │   ├── Testimonial.php
│   │   ├── Event.php
│   │   ├── ClassSchedule.php
│   │   └── Booking.php
│   └── Services/
│       ├── StripeService.php
│       └── NotificationService.php
├── database/
│   ├── migrations/
│   └── seeders/
├── routes/
│   └── api.php
├── config/
│   └── cors.php
└── tests/
    └── Feature/
```

## Installation

### 1. Create Laravel Project

```bash
composer create-project laravel/laravel german-fitness-backend
cd german-fitness-backend
```

### 2. Install Required Packages

```bash
# Authentication
composer require laravel/sanctum

# API Resources
composer require laravel/sanctum

# Stripe for payments
composer require stripe/stripe-php

# Image handling
composer require intervention/image

# CORS for frontend connection
# Already included in Laravel 11+
```

### 3. Environment Configuration

```bash
cp .env.example .env
php artisan key:generate
```

Update `.env`:

```env
APP_NAME="German Fitness"
APP_ENV=local
APP_KEY=base64:your-key-here
APP_DEBUG=true
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=german_fitness
DB_USERNAME=root
DB_PASSWORD=your_password

# Sanctum Configuration
SANCTUM_STATEFUL_DOMAINS=localhost:3000,127.0.0.1:3000
SESSION_DOMAIN=localhost

# Stripe Configuration
STRIPE_KEY=pk_test_your_key
STRIPE_SECRET=sk_test_your_secret
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Mail Configuration (for notifications)
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@germanfitness.com"
MAIL_FROM_NAME="German Fitness"
```

### 4. Database Setup

```bash
# Create MySQL database
mysql -u root -p -e "CREATE DATABASE german_fitness CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Run migrations
php artisan migrate

# Run seeders
php artisan db:seed
```

### 5. Sanctum Setup

```bash
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

### 6. Start Development Server

```bash
php artisan serve
```

## API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | User registration |
| POST | `/api/login` | User login |
| POST | `/api/logout` | User logout |
| GET | `/api/user` | Get authenticated user |
| POST | `/api/forgot-password` | Request password reset |
| POST | `/api/reset-password` | Reset password |

### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | List all users (admin) |
| GET | `/api/users/{id}` | Get user details |
| PUT | `/api/users/{id}` | Update user profile |
| DELETE | `/api/users/{id}` | Delete user |
| GET | `/api/users/{id}/subscriptions` | Get user subscriptions |
| GET | `/api/users/{id}/attendance` | Get user attendance |
| GET | `/api/users/{id}/workout-plans` | Get user workout plans |
| GET | `/api/users/{id}/diet-plans` | Get user diet plans |

### Trainer Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/trainers` | List all trainers |
| GET | `/api/trainers/{id}` | Get trainer details |
| POST | `/api/trainers` | Create trainer (admin) |
| PUT | `/api/trainers/{id}` | Update trainer |
| DELETE | `/api/trainers/{id}` | Delete trainer |
| GET | `/api/trainers/{id}/workout-plans` | Get trainer's workout plans |

### Class/Workout Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/classes` | List all classes |
| GET | `/api/classes/{id}` | Get class details |
| POST | `/api/classes` | Create class (admin/trainer) |
| PUT | `/api/classes/{id}` | Update class |
| DELETE | `/api/classes/{id}` | Delete class |
| GET | `/api/classes/{id}/schedule` | Get class schedule |

### Membership Plan Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/membership-plans` | List all plans |
| GET | `/api/membership-plans/{id}` | Get plan details |
| POST | `/api/membership-plans` | Create plan (admin) |
| PUT | `/api/membership-plans/{id}` | Update plan |
| DELETE | `/api/membership-plans/{id}` | Delete plan |

### Booking/Schedule Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/schedules` | List all schedules |
| GET | `/api/schedules/{id}` | Get schedule details |
| POST | `/api/schedules` | Create schedule (admin) |
| PUT | `/api/schedules/{id}` | Update schedule |
| DELETE | `/api/schedules/{id}` | Delete schedule |
| POST | `/api/bookings` | Create booking |
| GET | `/api/bookings` | List user bookings |
| DELETE | `/api/bookings/{id}` | Cancel booking |

### Payment Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/payments` | List user payments |
| POST | `/api/payments` | Create payment |
| POST | `/api/payments/{id}/confirm` | Confirm payment |
| GET | `/api/payments/{id}` | Get payment details |

## Frontend Integration

See `FRONTEND_INTEGRATION.md` for detailed examples of connecting your Next.js frontend to this Laravel backend.

## Testing

```bash
# Run all tests
php artisan test

# Run specific test
php artisan test --filter=AuthTest

# Run with coverage
php artisan test --coverage
```

## Deployment

### Production Checklist

- [ ] Set `APP_ENV=production`
- [ ] Set `APP_DEBUG=false`
- [ ] Configure proper database credentials
- [ ] Set up SSL certificate
- [ ] Configure queue worker for emails
- [ ] Set up scheduled tasks (cron)
- [ ] Optimize: `php artisan optimize`
- [ ] Cache routes: `php artisan route:cache`
- [ ] Cache config: `php artisan config:cache`

## License

MIT License - German Fitness Team
