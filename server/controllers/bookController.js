//get user by id
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

export const searchBooks = async (req, res) => {
  const { query } = req.query;
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${query}&fields=key,title,author_name,editions,editions.key,editions.title,editions.ebook_access,editions.language`
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
