import BookCard from '@/components/BookCard';
import { AuthContext } from '@/context/AuthContext';
import { fetchUserBooks } from '@/services/bookService';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Bookshelf = () => {
  const [books, setBooks] = useState<string[]>([]);
  const params = useParams();

  const userId = params.id;

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('AuthContext.Provider is missing!');
  }
  const { userCredentials } = authContext;

  const getBooks = async () => {
    try {
      if (userCredentials) {
        const booksData = await fetchUserBooks(userCredentials?.id);
        setBooks(booksData);
      }
    } catch (error) {
      console.log('Failed to load books');
    }
  };

  useEffect(() => {
    getBooks();
  }, [userCredentials]);

  return (
    <div className="flex flex-col items-center h-[100vh] bg-teal-950 bg-opacity-20">
      {userCredentials ? (
        <h1 className="text-3xl my-5 text-slate-200">Your shelf</h1>
      ) : (
        <h1 className="text-3xl my-5 text-slate-200">user {userId} books</h1>
      )}

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
