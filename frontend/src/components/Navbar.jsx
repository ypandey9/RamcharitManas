import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { isLoggedIn,isAdmin,isEditor,logout } from "../utils/userUtils";

export default function Navbar() {

  const navigate = useNavigate();


  const handleLogout = () => {

    logout();
    navigate("/");
  };



  return (
    <div className="bg-primary text-white p-4 shadow-md flex justify-center">
      <h1 className="text-2xl font-bold tracking-wide">
        📜 श्रीरामचरितमानस
      </h1>

      <div className="flex gap-10 ml-10">

<Link to="/search">
  Search
</Link>

  <Link to="/">
    Home
  </Link>

  <Link to="/bookmarks">
    Bookmarks
  </Link>

{isAdmin() && (
  <Link to="/admin">
    Admin
  </Link>
)}

{(isAdmin() || isEditor()) && (
  <Link to="/admin/verses">
    Manage Verses
  </Link>
)}

{isLoggedIn() && (
  <Link to="/dashboard"> My Dashboard </Link>
)}


{!isLoggedIn() && (

  <Link to="/admin-login">
    Login
  </Link>

)}

{isLoggedIn() && (

  <button
    onClick={handleLogout}
    className="
      px-4 py-2 rounded-lg
      bg-red-500 text-white
    "
  >
    Logout
  </button>

)}

</div>

    </div>
  );
}