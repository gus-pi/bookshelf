import { Link } from 'react-router-dom';

const Navbar = () => {
  const temp_login = true;
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
          <li>
            <Link to="/shelves">Shelves</Link>
          </li>
          <li>
            {temp_login ? (
              <details>
                <summary>Account</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li>
                    <Link to="/account">Edit account</Link>
                  </li>
                  <li>
                    <Link to="/logout">Logout</Link>
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
