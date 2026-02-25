# 🏋️ Gym Management Website

A complete, production-ready full-stack gym management platform built with Next.js 14, featuring dark orange aesthetics, real-time analytics, membership management, and Stripe payments.

## 🚀 Features

### User Features
- ✅ Authentication (NextAuth with Credentials & Google OAuth)
- ✅ Membership plan browsing and purchase
- ✅ Stripe payment integration
- ✅ Personal dashboard with stats
- ✅ Workout and diet plan access
- ✅ Attendance tracking
- ✅ Payment history and invoice download
- ✅ Profile management
- ✅ BMI calculator
- ✅ Class schedule viewing

### Admin Features
- ✅ Comprehensive analytics dashboard
- ✅ Revenue and member growth charts
- ✅ Member management (CRUD)
- ✅ Trainer management
- ✅ Membership plan management
- ✅ Workout and diet plan creation
- ✅ Attendance tracking
- ✅ Payment management
- ✅ Gallery management
- ✅ Event creation and management
- ✅ Class scheduling

### Design Features
- ✅ Dark theme with orange accents
- ✅ Animated hero sections
- ✅ Hover effects and glowing borders
- ✅ Responsive design
- ✅ Modern fitness aesthetics
- ✅ Smooth transitions and animations

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion & Aceternity UI
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** NextAuth.js
- **Payments:** Stripe
- **Charts:** Recharts
- **Icons:** Lucide React

## 📋 Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- Stripe account
- Google OAuth credentials (optional)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd gym-management
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/gym_db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-here"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stripe
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"
```

### 4. Database Setup

```bash
# Generate Prisma Client
npm run prisma:generate

# Push database schema
npm run prisma:push

# Seed database with initial data
npm run prisma:seed
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Default Login Credentials

After seeding, use these credentials:

**Admin Account:**
- Email: `admin@gym.com`
- Password: `admin123`

**User Account:**
- Email: `user@gym.com`
- Password: `user123`

## 📁 Project Structure

```
gym-management/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── (auth)/            # Auth pages (login, register)
│   │   ├── (dashboard)/       # Protected dashboard routes
│   │   │   ├── admin/         # Admin panel
│   │   │   └── user/          # User dashboard
│   │   ├── api/               # API routes
│   │   └── page.tsx           # Landing page
│   ├── components/            # React components
│   │   ├── ui/                # shadcn/ui components
│   │   ├── aceternity/        # Aceternity UI components
│   │   ├── home/              # Landing page sections
│   │   ├── dashboard/         # Dashboard components
│   │   └── layout/            # Layout components
│   ├── lib/                   # Utility functions
│   │   ├── prisma.ts          # Prisma client
│   │   ├── auth.ts            # NextAuth config
│   │   └── stripe.ts          # Stripe config
│   └── middleware.ts          # Route protection
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Seed data
└── public/                    # Static assets
```

## 🎨 Color Palette

- **Dark Background:** `#0a0a0a`
- **Dark Accent:** `#1a1a1a`
- **Orange Primary:** `#ff4500`
- **Orange Light:** `#ff6a33`
- **Text Primary:** `#ffffff`
- **Text Secondary:** `#9ca3af`

## 📱 Pages

### Public Pages
- `/` - Landing page with hero, programs, BMI calculator, pricing
- `/programs` - Training programs
- `/trainers` - Trainer profiles
- `/pricing` - Membership plans
- `/schedule` - Class timetable
- `/events` - Upcoming events
- `/gallery` - Gym gallery
- `/contact` - Contact form

### Auth Pages
- `/login` - User login
- `/register` - User registration

### User Dashboard (`/user`)
- `/user/dashboard` - User overview
- `/user/membership` - Current membership
- `/user/workouts` - Workout plans
- `/user/diet` - Diet plans
- `/user/attendance` - Attendance history
- `/user/payments` - Payment history
- `/user/profile` - Profile settings

### Admin Dashboard (`/admin`)
- `/admin/analytics` - Analytics & charts
- `/admin/members` - Member management
- `/admin/trainers` - Trainer management
- `/admin/plans` - Membership plans
- `/admin/workouts` - Workout plans
- `/admin/diets` - Diet plans
- `/admin/attendance` - Attendance tracking
- `/admin/payments` - Payment records
- `/admin/gallery` - Gallery management
- `/admin/events` - Event management

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/[...nextauth]` - NextAuth endpoints

### Members
- `GET /api/members` - Get all members (Admin)
- `POST /api/members` - Create member (Admin)
- `GET /api/members/[id]` - Get member details
- `PATCH /api/members/[id]` - Update member
- `DELETE /api/members/[id]` - Delete member (Admin)

### Trainers
- `GET /api/trainers` - Get all trainers
- `POST /api/trainers` - Create trainer (Admin)
- `GET /api/trainers/[id]` - Get trainer details
- `PATCH /api/trainers/[id]` - Update trainer (Admin)
- `DELETE /api/trainers/[id]` - Delete trainer (Admin)

### Membership Plans
- `GET /api/plans` - Get all plans
- `POST /api/plans` - Create plan (Admin)
- `PATCH /api/plans/[id]` - Update plan (Admin)
- `DELETE /api/plans/[id]` - Delete plan (Admin)

### Subscriptions
- `GET /api/subscriptions` - Get subscriptions
- `POST /api/subscriptions` - Create subscription
- `PATCH /api/subscriptions/[id]` - Update subscription (Admin)

### Payments
- `POST /api/payments` - Create payment intent
- `GET /api/payments` - Get payment history
- `POST /api/payments/webhook` - Stripe webhook

### Workouts & Diets
- `GET /api/workouts` - Get workout plans
- `POST /api/workouts` - Create workout (Admin)
- `GET /api/diets` - Get diet plans
- `POST /api/diets` - Create diet (Admin)

### Attendance
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance` - Mark attendance

### Events & Gallery
- `GET /api/events` - Get events
- `POST /api/events` - Create event (Admin)
- `GET /api/gallery` - Get gallery images
- `POST /api/gallery` - Upload image (Admin)

## 🔒 Security Features

- Role-based access control (USER/ADMIN)
- JWT session management
- Protected API routes
- Middleware route protection
- Bcrypt password hashing
- Secure Stripe webhook validation

## 🎭 Role-Based Access

### User Role
- View and manage own profile
- Purchase memberships
- View assigned workout/diet plans
- Track attendance
- View payment history

### Admin Role
- All user permissions
- Access admin dashboard
- Manage all members
- Create and manage trainers
- Create workout and diet plans
- Manage membership plans
- View analytics and reports
- Manage gallery and events

## 💳 Stripe Integration

### Setup
1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the dashboard
3. Set up webhook endpoint: `/api/payments/webhook`
4. Add webhook events: `payment_intent.succeeded`, `payment_intent.payment_failed`

### Test Cards
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production
- Update `NEXTAUTH_URL` to your domain
- Use production Stripe keys
- Configure production database

## 📊 Database Schema

The schema includes:
- Users (with role-based auth)
- Trainers
- Membership Plans
- Subscriptions
- Workout Plans
- Diet Plans
- Attendance Records
- Payments
- Gallery
- Testimonials
- Events
- Class Schedules

## 🧪 Testing

```bash
# Run tests (if configured)
npm test

# Lint code
npm run lint

# Type check
npx tsc --noEmit
```

## 🐛 Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check DATABASE_URL format
- Ensure database exists

### Stripe Webhook Issues
- Use Stripe CLI for local testing: `stripe listen --forward-to localhost:3000/api/payments/webhook`
- Verify webhook secret in .env

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Regenerate Prisma client: `npm run prisma:generate`

## 📝 TODO / Future Enhancements

- [ ] Email notifications
- [ ] SMS reminders for classes
- [ ] Mobile app with React Native
- [ ] Advanced analytics with AI insights
- [ ] Social media integration
- [ ] QR code attendance
- [ ] Video workout library
- [ ] Nutrition tracking
- [ ] Progress photos upload
- [ ] Member forums/community

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For issues or questions:
- Open an issue on GitHub
- Email: support@yourgym.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Stripe](https://stripe.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Aceternity UI](https://ui.aceternity.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

Built with ❤️ for the fitness community