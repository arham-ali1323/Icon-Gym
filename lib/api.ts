const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
    // Load token from localStorage on client side
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw {
          success: false,
          message: data.message || `HTTP error! status: ${response.status}`,
          errors: data.errors,
        } as ApiError;
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw {
          success: false,
          message: error.message,
        } as ApiError;
      }
      throw error;
    }
  }

  // Authentication endpoints
  async register(userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }) {
    return this.request('/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials: {
    email: string;
    password: string;
  }) {
    const response = await this.request('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.success && (response.data as any)?.token) {
      this.setToken((response.data as any).token);
    }
    
    return response;
  }

  async logout() {
    const response = await this.request('/logout', {
      method: 'POST',
    });
    
    this.clearToken();
    return response;
  }

  async getCurrentUser() {
    return this.request('/user');
  }

  async updateProfile(userData: {
    name?: string;
    email?: string;
    phone?: string;
  }) {
    return this.request('/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Trainers endpoints
  async getTrainers() {
    return this.request('/trainers');
  }

  async getTrainer(id: string) {
    return this.request(`/trainers/${id}`);
  }

  // Classes endpoints
  async getClasses() {
    return this.request('/classes');
  }

  async getClass(id: string) {
    return this.request(`/classes/${id}`);
  }

  async getWeeklySchedule() {
    return this.request('/classes/weekly-schedule');
  }

  async getScheduleByDay(day: string) {
    return this.request(`/classes/schedule/${day}`);
  }

  // Membership Plans endpoints
  async getMembershipPlans() {
    return this.request('/membership-plans');
  }

  async getMembershipPlan(id: string) {
    return this.request(`/membership-plans/${id}`);
  }

  // Bookings endpoints (protected)
  async getBookings() {
    return this.request('/bookings');
  }

  async createBooking(bookingData: {
    class_id: string;
    date: string;
  }) {
    return this.request('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  async getBooking(id: string) {
    return this.request(`/bookings/${id}`);
  }

  async cancelBooking(id: string) {
    return this.request(`/bookings/${id}`, {
      method: 'DELETE',
    });
  }

  async checkInBooking(id: string) {
    return this.request(`/bookings/${id}/check-in`, {
      method: 'POST',
    });
  }

  // Subscriptions endpoints (protected)
  async getSubscriptions() {
    return this.request('/subscriptions');
  }

  async getActiveSubscription() {
    return this.request('/subscriptions/active');
  }

  async createSubscription(subscriptionData: {
    plan_id: string;
    payment_method: string;
  }) {
    return this.request('/subscriptions', {
      method: 'POST',
      body: JSON.stringify(subscriptionData),
    });
  }

  async cancelSubscription(id: string) {
    return this.request(`/subscriptions/${id}/cancel`, {
      method: 'POST',
    });
  }

  async renewSubscription(id: string) {
    return this.request(`/subscriptions/${id}/renew`, {
      method: 'POST',
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export const apiClient = new ApiClient();
export default apiClient;
