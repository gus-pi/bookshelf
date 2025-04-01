//get book data by isbn
export const getBookData = async (req, res) => {
  const { ISBN } = req.params;
  try {
    const response = await fetch(`https://openlibrary.org/isbn/${ISBN}.json`);

    if (!response.ok) {
      throw new Error('Failed to fetch book data');
    }

    const bookData = await response.json();
    if (!bookData) {
      return res.status(404).json({ message: 'Book not found' });
    }
    const authorKey = bookData.authors[0]?.key; // Example: "/authors/OL9957774A"
    let authorName = 'Unknown Author';

    if (authorKey) {
      const authorResponse = await fetch(
        `https://openlibrary.org/${authorKey}.json`
      );
      if (authorResponse.ok) {
        const authorData = await authorResponse.json();
        authorName = authorData.name;
      }
    }

    const coverImage = `https://covers.openlibrary.org/b/isbn/${ISBN}.jpg`;

    const data = {
      title: bookData.title,
      author: authorName,
      cover: coverImage,
    };

    res.status(200).json(data);
  } catch (error) {
    console.log('Error fetching book: ', error);
    res.status(500).json({ message: 'Error fetching book' });
  }
};
//get book data by key
export const getBookDataByKey = async (req, res) => {
  const { key } = req.params;
  try {
    const response = await fetch(`https://openlibrary.org/books/${key}.json`);

    if (!response.ok) {
      throw new Error('Failed to fetch book data');
    }

    const bookData = await response.json();
    if (!bookData) {
      return res.status(404).json({ message: 'Book not found' });
    }

    let authorName = 'Unknown Author';
    if (bookData.authors && bookData.authors.length > 0) {
      const authorKey = bookData.authors[0]?.key; // Example: "/authors/OL9957774A"

      if (authorKey) {
        const authorResponse = await fetch(
          `https://openlibrary.org/${authorKey}.json`
        );
        if (authorResponse.ok) {
          const authorData = await authorResponse.json();
          authorName = authorData.name;
        }
      }
    }
    let coverUrl = 'https://placehold.co/316x475?text=No%20cover%20found';
    if (bookData.covers) {
      const coverId = bookData.covers[0];
      coverUrl = `https://covers.openlibrary.org/b/id/${coverId}.jpg`;
    }

    const data = {
      title: bookData.title,
      author: authorName,
      cover: coverUrl,
    };

    res.status(200).json(data);
  } catch (error) {
    console.log('Error fetching book: ', error);
    res.status(500).json({ message: 'Error fetching book' });
  }
};

export const searchBooks = async (req, res) => {
  const { query } = req.query;
  const limit = 10;
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${query}&fields=key,title,author_name,editions,editions.key,editions.title,editions.ebook_access,editions.language&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch search data');
    }
    const data = await response.json();

    const docs = data.docs;

    res.status(200).json(docs);
  } catch (error) {
    console.log('Error searching book: ', error);
    res.status(500).json({ message: 'Error searching book' });
  }
};
