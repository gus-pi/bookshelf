import { AuthContext } from '@/context/AuthContext';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      const response = await fetch(`http://localhost:5000/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setUserCredentials(data.user);
        navigate('/'); // Redirect to home
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message || error.message || 'Login failed'
      );
    }
  };

  return (
    <div className="bg-amber-900 text-slate-100">
      <h1>Login</h1>
      {error && <p className="text-red-500">{error}</p>}{' '}
      {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <label>email</label>
        <input
          type="text"
          className="bg-white text-slate-900"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>password</label>
        <input
          type="password"
          className="bg-white text-slate-900"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
