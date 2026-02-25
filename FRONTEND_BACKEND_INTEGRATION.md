# Frontend-Backend Integration Setup

This guide will help you connect the Next.js frontend with the Laravel backend for the Icon Gym project.

## 🚀 Quick Setup

### 1. Backend Setup (Laravel)

```bash
cd german-fitness-backend

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure database in .env
DB_CONNECTION=sqlite
DB_DATABASE=/path/to/database.sqlite

# Run migrations
php artisan migrate

# Seed database with sample data
php artisan db:seed

# Start development server
php artisan serve
```

The backend will be available at: `http://localhost:8000`

### 2. Frontend Setup (Next.js)

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Configure API URL in .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Start development server
npm run dev
```

The frontend will be available at: `http://localhost:3000`

## 🔗 API Connection Details

### Base URL Configuration
- **Backend API**: `http://localhost:8000/api`
- **Frontend**: `http://localhost:3000`

### Authentication Flow
1. Frontend sends login request to `/api/login`
2. Backend validates credentials and returns JWT token
3. Frontend stores token in localStorage
4. Frontend includes token in Authorization header for protected requests

### API Endpoints

#### Public Endpoints
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/trainers` - Get all trainers
- `GET /api/classes` - Get all classes
- `GET /api/membership-plans` - Get membership plans

#### Protected Endpoints (Requires Authentication)
- `GET /api/user` - Get current user
- `POST /api/logout` - User logout
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create booking
- `GET /api/subscriptions` - Get user subscriptions

#### Admin Endpoints (Requires Admin Role)
- `GET /api/admin/users` - Manage users
- `POST /api/admin/trainers` - Create trainer
- `POST /api/admin/classes` - Create class

## 🛠️ Frontend Components

### API Client (`lib/api.ts`)
- Handles all HTTP requests to backend
- Manages authentication tokens
- Provides typed API methods

### Auth Provider (`components/providers/auth-provider.tsx`)
- React Context for authentication state
- Provides login, logout, register methods
- Manages user session

### Custom Hooks (`lib/hooks.ts`)
- `useAuth()` - Authentication operations
- `useTrainers()` - Trainer data operations
- `useClasses()` - Class data operations
- `useBookings()` - Booking operations
- `useSubscriptions()` - Subscription operations

## 🧪 Testing the Connection

### 1. Health Check
```bash
curl http://localhost:8000/api/health
```

### 2. Test Registration
```javascript
// In browser console
fetch('http://localhost:8000/api/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
  })
})
```

### 3. Test Login
```javascript
// In browser console
fetch('http://localhost:8000/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'password123'
  })
})
```

## 🔧 Configuration Files

### Backend `.env` Configuration
```env
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000

# Database
DB_CONNECTION=sqlite
DB_DATABASE=database.sqlite

# Sanctum (for API authentication)
SANCTUM_STATEFUL_DOMAINS=localhost:3000
SESSION_DOMAIN=localhost
```

### Frontend `.env.local` Configuration
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## 🚨 Common Issues & Solutions

### CORS Issues
If you get CORS errors, ensure the backend CORS configuration allows your frontend URL:

```php
// config/cors.php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_methods' => ['*'],
'allowed_origins' => ['http://localhost:3000'],
'allowed_headers' => ['*'],
```

### Authentication Issues
1. Ensure Laravel Sanctum is properly configured
2. Check that `SANCTUM_STATEFUL_DOMAINS` includes your frontend URL
3. Verify the token is being stored in localStorage

### Database Issues
1. Ensure the database file is writable
2. Run migrations: `php artisan migrate`
3. Check database connection in `.env`

## 📝 Example Usage

### Frontend Component Example
```typescript
import { useAuthContext } from '@/components/providers/auth-provider';

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuthContext();
  
  const handleLogin = async () => {
    try {
      await login('user@example.com', 'password');
      // User is now logged in
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

### API Call Example
```typescript
import { useTrainers } from '@/lib/hooks';

function TrainersList() {
  const { getTrainers } = useTrainers();
  const [trainers, setTrainers] = useState([]);
  
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await getTrainers();
        if (response.success) {
          setTrainers(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch trainers:', error);
      }
    };
    
    fetchTrainers();
  }, []);
  
  return (
    <div>
      {trainers.map(trainer => (
        <div key={trainer.id}>
          <h3>{trainer.name}</h3>
          <p>{trainer.specialization}</p>
        </div>
      ))}
    </div>
  );
}
```

## 🔄 Development Workflow

1. Start the backend server: `php artisan serve`
2. Start the frontend server: `npm run dev`
3. Open frontend: `http://localhost:3000`
4. Test authentication and API calls
5. Debug any connection issues

The frontend and backend are now fully connected and ready for development!
