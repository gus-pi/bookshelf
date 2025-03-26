import { AuthContext } from '@/context/AuthContext';
import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext.Provider is missing!');
  }

  const { userCredentials, setUserCredentials } = authContext;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      setUserCredentials(data.user);
      console.log(userCredentials);
      navigate('/'); // Redirect to home
    } catch (error: any) {
      console.error(
        'Login failed:',
        error.response?.data?.message || error.message
      );
    }
  };
  return (
    <div className="bg-amber-900 text-slate-100">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>email</label>
        <input type="text" className="bg-white text-slate-900" name="email" />
        <label>password</label>
        <input
          type="password"
          className="bg-white text-slate-900"
          name="password"
        />
        <button
          type="submit"
          className="bg-amber-600 rounded-md px-2 mx-3 hover:cursor-pointer"
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default Login;
