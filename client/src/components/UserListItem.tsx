import { UserCredentials } from '@/lib/types';
import { Link } from 'react-router-dom';

const UserListItem = ({ user }: { user: UserCredentials }) => {
  return (
    <div className="flex flex-row gap-5 items-center">
      <Link
        to={`/user/${user._id}`}
        className="text-xl text-amber-600 hover:text-amber-500"
      >
        {user.name}'s shelf
      </Link>
    </div>
  );
};
export default UserListItem;
