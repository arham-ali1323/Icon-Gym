# German Fitness Laravel Backend - Setup Guide

## Prerequisites

- PHP 8.2 or higher
- Composer
- MySQL 5.7+ or MariaDB 10.3+
- Node.js (for frontend integration)

## Quick Setup

### 1. Install PHP and Composer (if not installed)

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install php8.2 php8.2-mysql php8.2-mbstring php8.2-xml php8.2-curl php8.2-zip php8.2-bcmath php8.2-tokenizer php8.2-json php8.2-fileinfo
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

**macOS:**
```bash
brew install php@8.2
brew install composer
```

**Windows:**
Download from https://getcomposer.org/download/

### 2. Install Dependencies

```bash
cd german-fitness-backend
composer install
```

### 3. Environment Configuration

```bash
cp .env.example .env
php artisan key:generate
```

Edit `.env` file:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=german_fitness
DB_USERNAME=root
DB_PASSWORD=your_password

# Add your Stripe keys
STRIPE_KEY=pk_test_your_key
STRIPE_SECRET=sk_test_your_secret
```

### 4. Database Setup

```bash
# Create MySQL database
mysql -u root -p -e "CREATE DATABASE german_fitness CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Run migrations
php artisan migrate

# Seed with sample data
php artisan db:seed
```

### 5. Start Development Server

```bash
php artisan serve
```

The API will be available at `http://localhost:8000/api`

## API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login
- `POST /api/logout` - Logout (requires auth)
- `GET /api/user` - Get current user (requires auth)

### Public Endpoints
- `GET /api/trainers` - List all trainers
- `GET /api/trainers/{id}` - Get trainer details
- `GET /api/classes` - List all classes
- `GET /api/classes/weekly-schedule` - Get weekly schedule
- `GET /api/membership-plans` - List membership plans

### Protected Endpoints (requires authentication)
- `POST /api/bookings` - Book a class
- `GET /api/bookings` - List my bookings
- `DELETE /api/bookings/{id}` - Cancel booking
- `POST /api/subscriptions` - Subscribe to plan
- `GET /api/subscriptions` - List my subscriptions

### Admin Endpoints (requires admin role)
- `POST /api/admin/trainers` - Create trainer
- `PUT /api/admin/trainers/{id}` - Update trainer
- `DELETE /api/admin/trainers/{id}` - Delete trainer
- `POST /api/admin/classes` - Create class
- `PUT /api/admin/classes/{id}` - Update class
- `DELETE /api/admin/classes/{id}` - Delete class
- `POST /api/admin/membership-plans` - Create plan
- `PUT /api/admin/membership-plans/{id}` - Update plan
- `DELETE /api/admin/membership-plans/{id}` - Delete plan

## Default Login Credentials

After seeding, you can login with:
- **Admin**: admin@germanfitness.com / password
- **Test User**: user@example.com / password

## Frontend Integration

See `FRONTEND_INTEGRATION.md` for detailed Next.js integration examples.

## Testing

```bash
php artisan test
```

## Production Deployment

1. Set `APP_ENV=production` and `APP_DEBUG=false` in `.env`
2. Run `php artisan optimize`
3. Configure proper database credentials
4. Set up SSL certificate
5. Configure queue worker for emails
6. Set up scheduled tasks (cron)

## Troubleshooting

### Permission Issues
```bash
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache  # On Ubuntu with Apache/Nginx
```

### CORS Issues
Ensure `config/cors.php` has your frontend URL in `allowed_origins`.

### Database Connection Issues
- Verify MySQL is running: `sudo systemctl status mysql`
- Check credentials in `.env`
- Ensure database exists: `mysql -u root -p -e "SHOW DATABASES;"`
