import { UserCredentials } from '@/lib/types';
import { getAllUsers } from '@/services/userService';
import { useEffect, useState } from 'react';

const Shelves = () => {
  const [users, setUsers] = useState<UserCredentials[]>([]);
  useEffect(() => {}, []);
  return (
    <div>
      <ul>
        <li></li>
      </ul>
    </div>
  );
};

export default Shelves;
