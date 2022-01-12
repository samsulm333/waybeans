import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Badge, InputGroup, Button, FormControl, Modal } from "react-bootstrap";

import { UserContext } from "../../context/userContext";
import { CartContext } from "../../context/cartContext";

// import styles
import {
  nav,
  logoStyle,
  img,
  navButton,
  navButtonAdmin,
  cartWrapper,
  badgeCart,
  buttonSearch,
  inputSearch,
} from "./Navbar.module.css";

// import assets
import logo from "../../assets/logo.png";
import cartLogo from "../../assets/cartlogo.png";

// import component
import AuthModal from "../AuthModal";
import DropdownUser from "../dropdownUser";
import DropdownAdmin from "../DropdownAdmin";
// import NavCartButton from "../NavCartButton";

const NavbarComponent = ({ setSearch }) => {
  // state initial state
  const [searchInput, setSearchInput] = useState("");
  const [state, dispatch] = useContext(UserContext);
  const [cart, cartDispatch] = useContext(CartContext);

  // function for reduce qty of cart items
  const cartQty = cart.cartItems.reduce(
    (acc, item) => acc + parseInt(item.qty),
    0
  );

  let navigate = useNavigate();

  // logout function
  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  // search function
  const handleClickSearch = (e) => {
    e.preventDefault();
    if (searchInput === "") {
      alert("Please enter the name of the product you want to search for!!");
    } else {
      setSearch(searchInput);
      navigate("/search");
      setSearchInput("");
    }
  };
  const handleChangeSearch = (e) => {
    setSearchInput(e.target.value);
  };

  // useEffectfor get cart item from localstorage
  useEffect(() => {
    const localcart = JSON.parse(localStorage.getItem("cart"));

    if (localcart === null) {
      console.log(localcart);
    } else {
      cartDispatch({
        type: "CART_ADD_ITEM",
        payload: {
          id: localcart.partnerId,
          items: localcart.cartItems,
          isCheckout: localcart.isCheckout,
        },
      });
    }
  }, []);

  return (
    <div>
      <nav className={nav}>
        <Link to="/" className={logoStyle}>
          <img className={img} src={logo} alt="logo" />
        </Link>

        {state.role === "customer" ? (
          <div className={navButton}>
            <InputGroup className="me-5">
              <FormControl
                className={inputSearch}
                placeholder="Search Product"
                aria-describedby="basic-addon2"
                value={searchInput}
                onChange={handleChangeSearch}
              />
              <Button
                className={buttonSearch}
                id="button-addon2"
                onClick={handleClickSearch}
              >
                Search
              </Button>
            </InputGroup>

            <Link to="/cart" className={cartWrapper}>
              <img
                src={cartLogo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="cart-logo"
              />
              {cart.cartItems.length ? (
                <Badge
                  bg="danger"
                  text="light"
                  className={`${badgeCart} rounded-circle`}
                >
                  {cartQty}
                </Badge>
              ) : (
                ""
              )}
            </Link>
            <DropdownUser logout={logout} id={state.user.user.id} />
          </div>
        ) : state.role === "admin" ? (
          <div className={navButtonAdmin}>
            <DropdownAdmin logout={logout} id={state.user.user.id} />
          </div>
        ) : (
          <div className={navButtonAdmin}>
            <AuthModal />
          </div>
        )}

        {/* <Modal
          className={`${styles.addProductSuccess}`}
          show={modal}
          onHide={closeModal}
          animation={false}
        >
          <h4 className={styles.addProductText}>Add Product Success</h4>
        </Modal> */}
      </nav>
    </div>
  );
};

export default NavbarComponent;
