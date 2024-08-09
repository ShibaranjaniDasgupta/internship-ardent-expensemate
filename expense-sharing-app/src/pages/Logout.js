import React from 'react';
import axios from 'axios';

function Logout() {
  React.useEffect(() => {
    const logout = async () => {
      try {
        await axios.post('/api/users/logout');
        localStorage.removeItem('expense-app');
        // Force a page reload to ensure all state is cleared
        window.location.href = '/login';
      } catch (error) {
        console.error('Error logging out', error);
        window.location.href = '/login';
      }
    };

    logout();
  }, []);

  return null;
}

export default Logout;