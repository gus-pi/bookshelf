import { BookResult } from '@/lib/types';
import { searchBooks } from '@/services/bookService';
import { useState } from 'react';
import SearchResult from './SearchResult';

const SearchBooks = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<BookResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const data = await searchBooks(query);
      setResults(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-2"
      >
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            placeholder="Search for a book..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <button
          type="submit" // Change to type="submit" for form submission
          className="btn btn-soft btn-primary"
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {results && results.length > 0 ? (
        <ul className="mt-5 grid lg:grid-cols-4 xl:grid-cols-6 md:grid-cols-3 sm:grid-cols-2">
          {results?.map((result) => (
            <li key={result.editions?.docs?.[0]?.key}>
              {<SearchResult book={result} />}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-5">No books found.</p>
      )}
    </div>
  );
};

export default SearchBooks;
