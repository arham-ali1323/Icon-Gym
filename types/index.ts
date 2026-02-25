import { User, Trainer, MembershipPlan, Subscription, WorkoutPlan, DietPlan, Attendance, Payment, Gallery, Testimonial, Event, ClassSchedule } from '@prisma/client'

export type {
  User,
  Trainer,
  MembershipPlan,
  Subscription,
  WorkoutPlan,
  DietPlan,
  Attendance,
  Payment,
  Gallery,
  Testimonial,
  Event,
  ClassSchedule,
}

export interface ExtendedUser extends User {
  subscriptions?: Subscription[]
  attendance?: Attendance[]
  payments?: Payment[]
  workoutPlans?: WorkoutPlan[]
  dietPlans?: DietPlan[]
}

export interface ExtendedTrainer extends Trainer {
  workoutPlans?: WorkoutPlan[]
}

export interface ExtendedMembershipPlan extends MembershipPlan {
  subscriptions?: Subscription[]
}

export interface WorkoutExercise {
  name: string
  sets: number
  reps: number
  rest: number
  weight?: number
  notes?: string
}

export interface DietMeal {
  name: string
  ingredients: string[]
  calories: number
  protein: number
  carbs: number
  fats: number
}

export interface DashboardStats {
  totalMembers: number
  activeMembers: number
  totalRevenue: number
  monthlyRevenue: number
  totalTrainers: number
  upcomingClasses: number
}
