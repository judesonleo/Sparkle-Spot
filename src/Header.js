import { Link } from "react-router-dom";
import {
  useContext,
  useEffect,
  //useState
} from "react";
import { UserContext } from "./UserContext";
import Logo from "./sparkle-spot-high-resolution-logo-color-on-transparent-background.png";
export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("https://sparkle-spot-app-api.onrender.com/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch("https://sparkle-spot-app-api.onrender.com/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        <img
          src={Logo}
          alt="SS Logo"
          style={{ width: "170px", height: "50px" }}
        />
        {/* <div
          style={{
            position: "relative",
            paddingLeft: "190px",
            paddingTop: "10px",
          }}
        >
          Sparkle Spot
        </div> */}
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout ({username})</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
