import UserListItem from '@/components/UserListItem';
import { UserCredentials } from '@/lib/types';
import { getAllUsers } from '@/services/userService';
import { useEffect, useState } from 'react';

const Shelves = () => {
  const [users, setUsers] = useState<UserCredentials[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response);
    } catch (error) {
      console.log('Error fetching users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col items-center my-5 px-20">
      <h1 className="text-5xl my-10 text-amber-600">All Users</h1>
      <div className="overflow-x-auto ">
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
      </div>
    </div>
  );
};

export default Shelves;
