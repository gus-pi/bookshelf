import { AuthContext } from '@/context/AuthContext';
import { log } from 'console';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext.Provider is missing!');
  }

  const { userCredentials, logout } = authContext;
  return (
    <div className="navbar bg-amber-900 text-slate-100 sticky top-0 z-10">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-3xl ">
          Bookshelf
          <span className="text-amber-700 font-bold -ml-1">.</span>
          <span className="text-amber-600 font-bold -ml-1">.</span>
          <span className="text-amber-500 font-bold -ml-1">.</span>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {userCredentials && (
            <li>
              <Link to={`/user/${userCredentials?.id}`}>My shelf</Link>
            </li>
          )}

          <li>
            {userCredentials ? (
              <details>
                <summary>Account</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li>
                    <Link to="/account">Edit account</Link>
                  </li>
                  <li>
                    <button
                      className="btn btn-outline secondary"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </details>
            ) : (
              <Link to="/login">Sign in</Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
