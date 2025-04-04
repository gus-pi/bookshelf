import { getApiUrl } from '@/lib/utils';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '@/services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Add error state
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext.Provider is missing!');
  }

  const { setUserCredentials } = authContext;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      const userData = await loginUser(email, password);
      setUserCredentials(userData);

      localStorage.setItem('user', JSON.stringify(userData)); // Store user data
      navigate('/');
    } catch (error: any) {
      setError(
        error.response?.data?.message || error.message || 'Login failed'
      );
    }
  };

  return (
    <div className="text-slate-100 flex flex-col items-center bg-black">
      <h1 className="text-5xl mt-20">Sign in</h1>

      <form onSubmit={handleSubmit} className="flex flex-col mt-10">
        <label className="input validator mb-1">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
          </svg>
          <input
            type="email"
            placeholder="email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <div className="validator-hint hidden">Enter valid email address</div>
        <label className="input validator">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            // minLength={6}
            // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            // title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
          />
        </label>
        {/* <p className="validator-hint hidden">
          Must be more than 8 characters, including
          <br />
          At least one number
          <br />
          At least one lowercase letter
          <br />
          At least one uppercase letter
        </p> */}
        {error && <p className="text-red-500 mt-2">{error}</p>}{' '}
        <button type="submit" className="btn btn-soft btn-primary my-5">
          submit
        </button>
      </form>
    </div>
  );
};

export default Login;
