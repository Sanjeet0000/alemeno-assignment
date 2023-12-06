import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <Link to={"./"}>
        <img
          src="https://www.alemeno.com/static/assets/images/logo.png"
          alt="title"
        />
      </Link>
      <Link to={"./dashboard"} className="dashboard-button">
        Dashboard
      </Link>
    </header>
  );
}

export default Header;
