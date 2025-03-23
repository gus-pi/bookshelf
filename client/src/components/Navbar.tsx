import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar bg-amber-900 text-slate-100">
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
            <details>
              <summary>Account</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li>
                  <Link to="/account">Edit account</Link>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
