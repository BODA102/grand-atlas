const USE_MOCK_DATA = true;

const BASE_URL = 'https://white-seahorse-266682.hostingerulessite.com/api/v1';

const api = {
  get: async (endpoint) => {

        if (USE_MOCK_DATA) {
      return { data: null };
    }

    try {
      const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
      const response = await fetch(`${BASE_URL}${cleanEndpoint}`);

      if (!response.ok) {
        return { data: null };
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return { data: null };
    }
  },

  post: async (endpoint, body) => {
    if (USE_MOCK_DATA) {
      return { data: null };
    }

    try {
      const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
      const response = await fetch(`${BASE_URL}${cleanEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        return { data: null };
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return { data: null };
    }
  }
};

export default api;