export const apiLogin = async (email, password) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      return { success: true, token: data.token, user: data.user };
    } else {
      return { success: false, message: data.msg || 'Login failed' };
    }
  } catch (error) {
    return { success: false, message: 'Error logging in' };
  }
};

export const apiSignup = async (name, email, password, role) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, role }),
    });
    const data = await response.json();
    if (response.ok) {
      return { success: true, token: data.token };
    } else {
      return { success: false, message: data.msg || 'Signup failed' };
    }
  } catch (error) {
    return { success: false, message: 'Network error' };
  }
};
 // Fetch user's profile information
export const apiGetProfile = async () => {
  const token = localStorage.getItem('authToken');
  try {
    const response = await fetch('http://localhost:5000/api/auth/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (response.ok) {
      return { success: true, data: data.profile };
    } else {
      return { success: false, message: data.msg || 'Failed to fetch profile' };
    }
  } catch (error) {
    return { success: false, message: 'Network error' };
  }
};

// Update user's profile information
export const apiUpdateProfile = async (updatedProfile) => {
  const token = localStorage.getItem('authToken');
  try {
    const response = await fetch('http://localhost:5000/api/auth/profile', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProfile),
    });
    const data = await response.json();
    if (response.ok) {
      return { success: true, data: data.profile };
    } else {
      return { success: false, message: data.msg || 'Failed to update profile' };
    }
  } catch (error) {
    return { success: false, message: 'Network error' };
  }
};