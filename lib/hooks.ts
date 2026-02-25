import { apiClient } from '@/lib/api';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface Trainer {
  id: string;
  name: string;
  email: string;
  phone: string;
  image?: string;
  specialization: string;
  experience: number;
  bio?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  created_at: string;
  updated_at: string;
}

export interface ClassSchedule {
  id: string;
  class_name: string;
  instructor: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  capacity: number;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  features: string;
  is_popular: boolean;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  user_id: string;
  class_id: string;
  date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  plan?: MembershipPlan;
}

// Auth hooks
export const useAuth = () => {
  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.login({ email, password });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }) => {
    try {
      const response = await apiClient.register(userData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      const response = await apiClient.logout();
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getCurrentUser = async () => {
    try {
      const response = await apiClient.getCurrentUser();
      return response;
    } catch (error) {
      throw error;
    }
  };

  const updateProfile = async (userData: {
    name?: string;
    email?: string;
    phone?: string;
  }) => {
    try {
      const response = await apiClient.updateProfile(userData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    login,
    register,
    logout,
    getCurrentUser,
    updateProfile,
  };
};

// Trainers hooks
export const useTrainers = () => {
  const getTrainers = async () => {
    try {
      const response = await apiClient.getTrainers();
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getTrainer = async (id: string) => {
    try {
      const response = await apiClient.getTrainer(id);
      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    getTrainers,
    getTrainer,
  };
};

// Classes hooks
export const useClasses = () => {
  const getClasses = async () => {
    try {
      const response = await apiClient.getClasses();
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getClass = async (id: string) => {
    try {
      const response = await apiClient.getClass(id);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getWeeklySchedule = async () => {
    try {
      const response = await apiClient.getWeeklySchedule();
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getScheduleByDay = async (day: string) => {
    try {
      const response = await apiClient.getScheduleByDay(day);
      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    getClasses,
    getClass,
    getWeeklySchedule,
    getScheduleByDay,
  };
};

// Membership Plans hooks
export const useMembershipPlans = () => {
  const getMembershipPlans = async () => {
    try {
      const response = await apiClient.getMembershipPlans();
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getMembershipPlan = async (id: string) => {
    try {
      const response = await apiClient.getMembershipPlan(id);
      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    getMembershipPlans,
    getMembershipPlan,
  };
};

// Bookings hooks
export const useBookings = () => {
  const getBookings = async () => {
    try {
      const response = await apiClient.getBookings();
      return response;
    } catch (error) {
      throw error;
    }
  };

  const createBooking = async (bookingData: {
    class_id: string;
    date: string;
  }) => {
    try {
      const response = await apiClient.createBooking(bookingData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getBooking = async (id: string) => {
    try {
      const response = await apiClient.getBooking(id);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const cancelBooking = async (id: string) => {
    try {
      const response = await apiClient.cancelBooking(id);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const checkInBooking = async (id: string) => {
    try {
      const response = await apiClient.checkInBooking(id);
      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    getBookings,
    createBooking,
    getBooking,
    cancelBooking,
    checkInBooking,
  };
};

// Subscriptions hooks
export const useSubscriptions = () => {
  const getSubscriptions = async () => {
    try {
      const response = await apiClient.getSubscriptions();
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getActiveSubscription = async () => {
    try {
      const response = await apiClient.getActiveSubscription();
      return response;
    } catch (error) {
      throw error;
    }
  };

  const createSubscription = async (subscriptionData: {
    plan_id: string;
    payment_method: string;
  }) => {
    try {
      const response = await apiClient.createSubscription(subscriptionData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const cancelSubscription = async (id: string) => {
    try {
      const response = await apiClient.cancelSubscription(id);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const renewSubscription = async (id: string) => {
    try {
      const response = await apiClient.renewSubscription(id);
      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    getSubscriptions,
    getActiveSubscription,
    createSubscription,
    cancelSubscription,
    renewSubscription,
  };
};
