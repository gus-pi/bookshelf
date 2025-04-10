import { AuthContext } from '@/context/AuthContext';
import { updateUser } from '@/services/userService';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditAccount = () => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); // Add error state
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext.Provider is missing!');
  }

  const { userCredentials } = authContext;

  const [name, setName] = useState(userCredentials?.name);
  const [email, setEmail] = useState(userCredentials?.email);
  const [password, setPassword] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      //setUserCredentials(userData);
      await updateUser();
      alert('Registration complete');
      navigate('/login');
    } catch (error: any) {
      setError(
        error.response?.data?.message || error.message || 'Register failed'
      );
    }
  };

  return (
    <div className="text-slate-100 flex flex-col items-center bg-black">
      <h1 className="text-5xl mt-20">Edit account</h1>
      {error && <p className="text-red-500">{error}</p>}{' '}
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
            type="text"
            placeholder={userCredentials?.name}
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
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
            placeholder={userCredentials?.email}
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <div className="validator-hint hidden">Enter valid email address</div>

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
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password"
            minLength={6}
            // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 6 characters"
          />
        </label>
        {
          <p className="validator-hint hidden">
            Must be more than 8 characters
          </p>
        }

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
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm new password"
            minLength={6}
            // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 6 characters"
          />
        </label>
        {
          <p className="validator-hint hidden">
            Must be more than 8 characters
          </p>
        }

        <button type="submit" className="btn btn-soft btn-primary my-5">
          submit
        </button>
      </form>
    </div>
  );
};
export default EditAccount;
