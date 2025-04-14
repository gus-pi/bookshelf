import { BookDetails } from '@/lib/types';
import { fetchBookData } from '@/services/bookService';
import { useEffect, useState } from 'react';

const BookCard = ({
  bookCode,
  edit,
  onRemove,
}: {
  bookCode: string;
  edit: boolean;
  user: string;
  onRemove: () => void;
}) => {
  const [book, setBook] = useState<BookDetails>();

  const [loading, setLoading] = useState(false);

  // Fetch book details from Open Library API
  const fetchBookDetails = async (bookKey: string) => {
    try {
      setLoading(true);
      const bookData = await fetchBookData(bookKey);

      setBook({
        title: bookData.title,
        author: bookData.author,
        coverURL: bookData.cover,
      });
    } catch (error) {
      console.error('Error fetching book details', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookDetails(bookCode);
  }, []);

  return (
    <div className="relative">
      {loading ? (
        <div className="skeleton h-68 w-48" />
      ) : (
        <div className="card w-48 h-68 shadow-md bg-black relative overflow-hidden">
          <figure>
            <img
              src={book?.coverURL}
              alt="Shoes"
              className="transition-opacity duration-300 rounded-md"
            />
          </figure>

          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 transition-opacity duration-300 text-white text-center opacity-0 hover:opacity-75">
            <div>
              <h2 className="card-title">{book?.title}</h2>
              <p>{book?.author}</p>
            </div>
          </div>
          {edit && (
            <button
              onClick={onRemove}
              className="btn btn-dash top-2 right-2 btn-error mx-auto absolute z-10"
            >
              Remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BookCard;
