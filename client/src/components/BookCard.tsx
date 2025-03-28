import { fetchBookData } from '@/services/bookService';
import { useEffect, useState } from 'react';

type BookDetails = {
  author: string;
  title: string;
  coverURL: string;
};

const BookCard = ({ bookCode }: { bookCode: string }) => {
  const [book, setBook] = useState<BookDetails>();

  const [loading, setLoading] = useState(false);

  // Fetch book details from Open Library API
  const fetchBookDetails = async (bookISBN: string) => {
    try {
      setLoading(true);
      const bookData = await fetchBookData(bookISBN);

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
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="card w-48 h-68 shadow-md  relative overflow-hidden">
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
        </div>
      )}
    </div>
  );
};

export default BookCard;
