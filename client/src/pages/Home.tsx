import { Link } from 'react-router-dom';
import bg_shelf from '../assets/bg_shelf.jpg';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext.Provider is missing!');
  }

  const { userCredentials } = authContext;

  return (
    <div className="relative flex justify-center items-center h-screen max-h-[90vh] bg-black">
      {/* Background Image with Fade Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{
          backgroundImage: `url(${bg_shelf})`,
          maskImage:
            'linear-gradient(to bottom, transparent, black 80%, black 80%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent, black 80%, black 80%, transparent)',
        }}
      />
      {/* Text Overlay */}
      <div className="flex flex-col justify-center items-center mt-5 relative z-10 text-center text-white  bg-opacity-50 p-6 rounded-lg">
        <div className="flex flex-col mb-10">
          <h1 className="text-5xl">Bookshelf</h1>
          <p className="text-xs ml-auto">v 1.0</p>
        </div>

        {userCredentials?.name ? (
          <div>
            <h2>Hello {userCredentials.name}</h2>
            <p className="mt-5">
              Organize your own
              <Link
                to={`/user/${userCredentials.id}`}
                className="text-amber-600 hover:text-amber-700"
              >
                {' '}
                personal bookshelf{' '}
              </Link>
              and take a peak at what{' '}
              <Link
                to="shelves"
                className="text-amber-600 hover:text-amber-700"
              >
                {' '}
                others{' '}
              </Link>{' '}
              are reading as well.
            </p>
          </div>
        ) : (
          <div>
            <p className="mt-5">
              Organize your own personal bookshelf and take a peak at what
              others are reading as well.
            </p>
            <h2 className="mt-10">
              <Link to="/login" className="text-amber-600 hover:text-amber-700">
                Sign in
              </Link>{' '}
              to get started. Don't have an account?{' '}
              <Link
                to="/register"
                className="text-amber-600 hover:text-amber-700"
              >
                Register.
              </Link>
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
