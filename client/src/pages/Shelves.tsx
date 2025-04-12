import UserListItem from '@/components/UserListItem';
import { UserCredentials } from '@/lib/types';
import { searchUsers } from '@/services/userService';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const Shelves = () => {
  const [users, setUsers] = useState<UserCredentials[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await searchUsers(searchQuery);
      setUsers(response);
    } catch (error) {
      console.log('Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchUsers = useDebouncedCallback(() => {
    fetchUsers();
  }, 400); // 400ms debounce

  useEffect(() => {
    debouncedFetchUsers();
  }, [searchQuery]);

  return (
    <div className="flex flex-col items-center my-5 px-20">
      <h1 className="text-5xl my-5 text-amber-600">All Users</h1>
      <label className="input focus-within:outline-none focus-within:ring-0 focus-within:shadow-none">
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
          type="text"
          placeholder="Search for a user"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </label>

      <div className="overflow-x-auto ">
        {loading ? (
          <p className=" text-white mt-5">Loading...</p>
        ) : (
          <div>
            {users.length > 0 ? (
              <table className="table">
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index} className="hover:bg-base-300 text-white">
                      <th>{index + 1}.</th>
                      <td className="text-xl">{user.name}</td>
                      <td>
                        <UserListItem user={user} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-white mt-5">No users found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shelves;
