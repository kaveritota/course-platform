import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <nav>
      <span>Role: {user.role}</span>
      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;
