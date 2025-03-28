import { getApiUrl } from '@/lib/utils';
import { fetchBookData } from '@/services/bookService';
import { useEffect, useState } from 'react';

type BookDetails = {
  author: string;
  title: string;
};

const BookCard = ({ bookCode }: { bookCode: string }) => {
  const [book, setBook] = useState<BookDetails>();

  // Fetch book details from Open Library API
  const fetchBookDetails = async (bookCode: string) => {
    try {
      const response = await fetch(`${getApiUrl()}/books/${bookCode}`);
      const data = await response.json();

      setBook({ title: data.title, author: data.author });
    } catch (error) {
      console.error('Error fetching book details', error);
    }
  };

  useEffect(() => {
    fetchBookDetails(bookCode);
  }, []);

  return (
    <div>
      {book?.title} by {book?.author}
    </div>
  );
};

export default BookCard;
