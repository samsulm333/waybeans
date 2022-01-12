import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../../context/userContext";

import "./DropdownAdmin.css";

import userIcon from "../../assets/user 2.png";
import addProductIcon from "../../assets/dropdown.png";
import logoutIcon from "../../assets/logout 1.png";

const DropdownAdmin = ({ logout, id }) => {
  const [state] = useContext(UserContext);
  return (
    <>
      <NavDropdown
        title={
          <div className="avatar">
            <img
              className="thumbnail-image rounded-circle"
              src={state.image}
              alt="user pic"
            />
          </div>
        }
        id="basic-nav-dropdown"
      >
        <NavDropdown.Item>
          <Link to="/transaction" className="link">
            <img
              src={userIcon}
              width="20"
              height="20"
              alt="userIcon"
              className="me-2"
            />
            Transaction
          </Link>
        </NavDropdown.Item>

        <NavDropdown.Item className="mt-2 mb-2">
          <Link to="/add-product" className="link">
            <img
              src={addProductIcon}
              width="20"
              height="20"
              alt="userIcon"
              className="me-2"
            />
            Add Product
          </Link>
        </NavDropdown.Item>

        <NavDropdown.Divider />

        <NavDropdown.Item>
          <Link to="#" className="link" onClick={logout}>
            <img
              src={logoutIcon}
              width="20"
              height="20"
              alt="userIcon"
              className="me-1"
            ></img>
            Logout
          </Link>
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default DropdownAdmin;
