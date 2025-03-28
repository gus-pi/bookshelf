import BookCard from '@/components/BookCard';
import { AuthContext } from '@/context/AuthContext';
import { fetchUserBooks } from '@/services/bookService';
import { useContext, useEffect, useState } from 'react';

const Bookshelf = () => {
  const [books, setBooks] = useState<string[]>([]);

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
    <div>
      <h1>{userCredentials?.name}'s books</h1>
      <ul>
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
