import axios from 'axios';
import environment from '../utils/enviroment';

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${environment.apiUrl}/users/register.php`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(
      'Registration error:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const login = async (login, password) => {
  try {
    const response = await axios.post(`${environment.apiUrl}/users/login.php`, {
      login,
      password,
    });

    return response.data;
  } catch (error) {
    console.error(
      'Login error:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

