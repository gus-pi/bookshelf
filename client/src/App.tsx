import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { UserCredentials } from './lib/types';
import { AuthContext } from './context/AuthContext';

const App = () => {
  const [userCredentials, setUserCredentials] =
    useState<UserCredentials | null>(null);

  // Fetch user data when app loads
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/api/users/auth/profile', {
          withCredentials: true,
        });
        setUserCredentials(data); // Store user in state
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow">
        <AuthContext.Provider value={{ userCredentials, setUserCredentials }}>
          <Outlet />
        </AuthContext.Provider>
      </div>

      <Footer />
    </div>
  );
};

export default App;
