import { Link } from 'react-router-dom';
import bg_shelf from '../assets/bg_shelf.jpg';

const Home = () => {
  const temp_login = false;
  return (
    <div className="relative flex justify-center items-center h-screen max-h-[85vh]">
      {/* Background Image with Fade Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60 "
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
          <p className="text-xs ml-auto">by Gustavo Pinedo</p>
        </div>

        {temp_login ? (
          <div>
            <h2>Hello User</h2>
            <p className="mt-5">
              Organize your own
              <Link
                to="user-bookshelf"
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
              <Link to="/login">Sign in</Link> to get started. Don't have an
              account? Register
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
