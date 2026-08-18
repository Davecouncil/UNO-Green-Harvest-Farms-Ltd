import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getUsers } from "../services/userService";
import { FiSearch } from "react-icons/fi";
// import Loader from "../components/ui/Loader";
import BallTriangle from "../components/ui/BallTriangle";


export default function Users() {
  const { token } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers(token);
      setUsers(data);
    } catch (err) {
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  const roles = ["All", ...new Set(users.map((u) => u.role))];

  const filteredUsers = users
    .filter((u) => roleFilter === "All" || u.role === roleFilter)
    .filter(
      (u) =>
        u.userName.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

  if (loading) {
    // return <p className="text-gray-500 text-sm">Loading users...</p>;
    return <div className="flex items-center h-screen justify-center ">
      {/* <Loader/> */}
       <BallTriangle />
      </div>
  }

  if (error) {
    return <p className="text-red-600 text-sm">{error}</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-dm text-2xl text-gray-900">Users</h1>
          <p className="text-gray-500 text-sm">{users.length} total users</p>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px]">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-full pl-9 pr-4 py-2 text-sm outline-none focus:border-[#2D7A0F] focus:ring-1 focus:ring-[#2D7A0F] transition"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`text-sm font-medium px-4 py-2 rounded-full border transition capitalize ${
                roleFilter === role
                  ? "bg-[#2D7A0F] text-white border-[#2D7A0F]"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-gray-500">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Phone</th>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="px-5 py-3 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="border-b border-gray-50 last:border-none">
                <td className="px-5 py-3 font-medium text-gray-900">{user.userName}</td>
                <td className="px-5 py-3 text-gray-600">{user.email}</td>
                <td className="px-5 py-3 text-gray-600">{user.phone}</td>
                <td className="px-5 py-3">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${
                      user.role === "seller"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-5 py-3 text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-10">
            {users.length === 0 ? "No users yet." : "No users match your search/filter."}
          </p>
        )}
      </div>
    </div>
  );
}