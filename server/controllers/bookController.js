//get user by id
export const getBookData = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch(`https://openlibrary.org/books/${id}.json`);

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

    const data = { title: bookData.title, author: authorName };

    res.status(200).json(data);
  } catch (error) {
    console.log('Error fetching book: ', error);
    res.status(500).json({ message: 'Error fetching book' });
  }
};
