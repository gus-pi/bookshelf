import { fetchBookData } from '@/services/bookService';
import { useEffect, useState } from 'react';

type BookDetails = {
  author: string;
  title: string;
};

const BookCard = ({ bookCode }: { bookCode: string }) => {
  const [book, setBook] = useState<BookDetails>();
  const [bookCoverURL, setBookCoverURL] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
  );
  const [loading, setLoading] = useState(false);

  // Fetch book details from Open Library API
  const fetchBookDetails = async (bookISBN: string) => {
    try {
      setLoading(true);
      const bookData = await fetchBookData(bookISBN);
      setBookCoverURL(`https://covers.openlibrary.org/b/isbn/${bookCode}.jpg`);
      setBook({ title: bookData.title, author: bookData.author });
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
        <div>
          <img src={bookCoverURL} />
          {book?.title} by {book?.author}
        </div>
      )}
    </div>
  );
};

export default BookCard;
