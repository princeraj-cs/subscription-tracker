const API_BASE = "";

// Helper to make authenticated requests
async function request(endpoint, options = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data.message || data.error || `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }

  return data;
}

export const api = {
  // Auth
  async login(email, password) {
    return request("/api/v1/auth/sign-in", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  async register(name, email, password) {
    return request("/api/v1/auth/sign-up", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
  },

  // Subscriptions
  async getUserSubscriptions(userId) {
    return request(`/api/v1/subscriptions/user/${userId}`, {
      method: "GET",
    });
  },

  async createSubscription(subscriptionData) {
    return request("/api/v1/subscriptions", {
      method: "POST",
      body: JSON.stringify(subscriptionData),
    });
  },

  async deleteSubscription(id) {
    return request(`/api/v1/subscriptions/${id}`, {
      method: "DELETE",
    });
  },
};
