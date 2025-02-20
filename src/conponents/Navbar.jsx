import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  const { user, googleLogin } = useContext(AuthContext);
  const li = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `menu-item ${isActive ? "activeBtn" : "outletBtn"}`
        }
      >
        Home
      </NavLink>
      {user ? (
        <NavLink
          to="/logout"
          className={({ isActive }) =>
            `menu-item ${isActive ? "activeBtn" : "outletBtn"}`
          }
        >
          Logout
        </NavLink>
      ) : (
        <>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `menu-item ${isActive ? "activeBtn" : "outletBtn"}`
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `menu-item ${isActive ? "activeBtn" : "outletBtn"}`
            }
          >
            Register
          </NavLink>
        </>
      )}
    </>
  );
  const handleLogin = () => {
    googleLogin()
      .then((res) => {
        if (res.user) {
          alert("login success");
        }
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <div className="bg-base-100 shadow-sm">
      <div className="navbar mxw px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            {/* small size  */}
            <ul
              tabIndex={0}
              className="menu menu-sm flex gap-5 dropdown-content bg-base-100 rounded-box z-1 mt-4 w-52 p-2 shadow"
            >
              {li}
            </ul>
          </div>
          <a href="/" className="font-semibold text-xl">
            TO-DO
          </a>
        </div>
        {/* big size  */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 flex gap-5">{li}</ul>
        </div>
        <div className="navbar-end">
          <button onClick={() => handleLogin()} className="activeBtn">
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
