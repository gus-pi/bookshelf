import SearchBooks from '@/components/SearchBooks';

const AddBook = () => {
  return (
    <div className="flex flex-col items-center m-5">
      <h1 className="text-2xl mb-4">Add a book</h1>
      <div>
        <SearchBooks />
      </div>
    </div>
  );
};

export default AddBook;
