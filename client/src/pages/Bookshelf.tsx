import BookCard from '@/components/BookCard';
import { AuthContext } from '@/context/AuthContext';
import { getApiUrl } from '@/lib/utils';
import { fetchUserBooks, removeBook } from '@/services/bookService';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Bookshelf = () => {
  const [books, setBooks] = useState<string[]>([]);
  const [user, setUser] = useState('');
  const params = useParams();
  const [editToggle, setEditToggle] = useState(false);

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

  const handleRemove = async (bookCode: string) => {
    try {
      if (userId) {
        await removeBook(userId, bookCode);
        alert(`removed a book`);
        getBooks();
      }
    } catch (error) {
      console.log('Failed to remove book', error);
    }
  };

  const handleToggleEdit = () => {
    setEditToggle(!editToggle);
  };

  return (
    <div className="flex flex-col items-center bg-teal-950 bg-opacity-20 pb-10">
      <div>
        {userCredentials?.name === user ? (
          <div className="flex items-center gap-5">
            <h1 className="text-3xl my-5 text-slate-200">Your shelf</h1>
            <button
              className="btn btn-outline btn-accent btn-sm"
              onClick={handleToggleEdit}
            >
              {editToggle ? <p>Done</p> : <p>Edit shelf</p>}
            </button>
            {editToggle && (
              <Link
                to={`/user/${userCredentials?.id}/add`}
                className="btn btn-outline btn-success btn-sm"
              >
                Add a book
              </Link>
            )}
          </div>
        ) : (
          <h1 className="text-3xl my-5 text-slate-200">{user}'s books</h1>
        )}
      </div>

      <ul className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {books.length > 0 ? (
          books.map((book) => (
            <li key={book}>
              <BookCard
                bookCode={book}
                edit={editToggle}
                user={userId!}
                onRemove={() => handleRemove(book)}
              />
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
