import { BookResult } from '@/lib/types';
import BookCard from './BookCard';
import { addBookToShelf } from '@/services/bookService';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SearchResult = ({ book }: { book: BookResult }) => {
  const bookKey = book.editions?.docs?.[0]?.key || '';
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext.Provider is missing!');
  }

  const { userCredentials } = authContext;
  const userId = userCredentials?.id;

  const handleAdd = async () => {
    try {
      if (userId) {
        await addBookToShelf(userId, bookKey);
        navigate(`/user/${userId}`);
      }
    } catch (error) {
      console.log('error adding book from component');
    }
  };

  return (
    <div className="flex flex-col justify-between gap-2 px-2 rounded-sm my-2">
      <BookCard
        bookCode={bookKey}
        edit={false}
        user={userId!}
        onRemove={() => {}}
      />
      {userId && (
        <button onClick={handleAdd} className="btn btn-xs btn-dash btn-success">
          +add to shelf
        </button>
      )}
    </div>
  );
};

export default SearchResult;
