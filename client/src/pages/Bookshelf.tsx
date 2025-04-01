import BookCard from '@/components/BookCard';
import { AuthContext } from '@/context/AuthContext';
import { getApiUrl } from '@/lib/utils';
import { fetchUserBooks } from '@/services/bookService';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Bookshelf = () => {
  const [books, setBooks] = useState<string[]>([]);
  const [user, setUser] = useState('');
  const params = useParams();

  const userId = params.id;

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('AuthContext.Provider is missing!');
  }
  const { userCredentials } = authContext;

  const getUserById = async (id: string) => {
    const { data } = await axios.get(`${getApiUrl()}/users/${id}`);
    return data.name as string;
  };

  const getBooks = async () => {
    try {
      if (userId) {
        const booksData = await fetchUserBooks(userId);
        const username = await getUserById(userId);
        setUser(username);
        setBooks(booksData);
      }
    } catch (error) {
      console.log('Failed to load books');
    }
  };

  useEffect(() => {
    getBooks();
  }, [userId]);

  return (
    <div className="flex flex-col items-center h-[100vh] bg-teal-950 bg-opacity-20">
      <div>
        {userCredentials?.name === user ? (
          <div className="flex items-center gap-5">
            <h1 className="text-3xl my-5 text-slate-200">Your shelf</h1>
            <Link
              to={`/user/${userCredentials?.id}/add`}
              className="btn btn-outline btn-accent btn-sm"
            >
              Add a book
            </Link>
          </div>
        ) : (
          <h1 className="text-3xl my-5 text-slate-200">{user}'s books</h1>
        )}
      </div>

      <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {books.length > 0 ? (
          books.map((book, index) => (
            <li key={index}>
              <BookCard bookCode={book} />
            </li>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </ul>
    </div>
  );
};

export default Bookshelf;
