import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, googleLogin, logoutUser } = useContext(AuthContext);
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser()
          .then(() => {
            toast.success("Successfully logout!");
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }
    });
  };
  const li = (
    <>
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          `menu-item ${isActive ? "activeBtn" : "outletBtn"}`
        }
      >
        Home
      </NavLink>
      {user ? (
        <NavLink onClick={() => handleLogout()} className="outletBtn">
          Logout
        </NavLink>
      ) : (
        <></>
      )}
    </>
  );
  const handleLogin = () => {
    googleLogin()
      .then(async (res) => {
        if (res.user) {
          const userInfo = {
            email: res.user?.email,
            displayName: res.user?.displayName,
            userId: res?.user?.providerData[0].uid,
          };
          toast.success("Successfully login!");
          // eslint-disable-next-line no-unused-vars
          const { data } = await axios.post(
            "http://localhost:4545/setUser",
            userInfo
          );
        }
      })
      .catch((error) => toast.error(error.message));
  };
  return (
    <div className="bg-base-100 shadow-sm">
      <div className="navbar mxw md:px-4 px-2">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn  bg-gray-200 lg:hidden mr-4"
            >
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
          {user ? (
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                <img
                  src={user?.photoURL}
                  alt={user?.displayName}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          ) : (
            <button
              onClick={() => handleLogin()}
              className="outletBtn cursor-pointer"
            >
              Sign in with Google
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
