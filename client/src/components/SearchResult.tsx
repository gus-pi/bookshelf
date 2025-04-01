import { BookResult } from '@/lib/types';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';

const SearchResult = ({ book }: { book: BookResult }) => {
  const book_key = book.editions?.docs?.[0]?.key || '';

  return (
    <div className="flex flex-col justify-between gap-2 px-2 rounded-sm my-2">
      <BookCard bookCode={book_key} />
      <Link to={`${book_key}`} className="btn btn-xs btn-dash btn-success">
        +add to shelf
      </Link>
    </div>
  );
};

export default SearchResult;
