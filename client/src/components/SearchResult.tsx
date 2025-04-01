import { BookResult } from '@/lib/types';
import { Link } from 'react-router-dom';

const SearchResult = ({ book }: { book: BookResult }) => {
  const book_key = book.editions?.docs?.[0]?.key || '';
  return (
    <div className="flex flex-row justify-between gap-2 hover:bg-accent px-2 rounded-sm my-2">
      <h2>
        {book.title} by {book.author_name[0]}
      </h2>
      <Link to={`${book_key}`} className="btn btn-xs btn-dash btn-success">
        +add to shelf
      </Link>
    </div>
  );
};

export default SearchResult;
