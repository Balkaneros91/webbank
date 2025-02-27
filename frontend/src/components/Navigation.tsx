import { Link } from "react-router-dom";

// const storedOTP = localStorage.getItem("token");

function Navigation() {
  return (
    <nav>
      <ul className="flex justify-between list-none gap-5">
        <li>
          <Link to="/signup">SignUp</Link>
        </li>
        {/* { storedOTP ?  
        <li>
          <Link to="/logout">Logout</Link>
        </li> :  */}
        <li>
        <Link to="/login">Login</Link>
      </li>
        {/* } */}
        <li>
          <Link to="/account">Account</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
