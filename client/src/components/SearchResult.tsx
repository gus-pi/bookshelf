import { BookResult } from '@/lib/types';

const SearchResult = ({ book }: { book: BookResult }) => {
  return (
    <div className="flex flex-row justify-between gap-2 hover:bg-accent px-2 rounded-sm my-2">
      <h2>
        {book.title} by {book.author_name[0]}
      </h2>
      <button className="btn btn-xs btn-dash btn-success">+add to shelf</button>
    </div>
  );
};

export default SearchResult;
