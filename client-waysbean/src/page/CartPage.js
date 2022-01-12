import { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import convertRupiah from "rupiah-format";

import { API } from "../config/api";

// import styles
import styles from "./CartPage.module.css";

// import assets
import trashIcon from "../assets/trash.png";

import { CartContext } from "../context/cartContext";
import { UserContext } from "../context/userContext";

const CartPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [state, dispatch] = useContext(UserContext);
  // cart
  const [cart, cartDispatch] = useContext(CartContext);
  const cartProducts = cart.cartItems;

  // calculate qty price
  const cartQty = cartProducts.reduce(
    (acc, item) => acc + parseInt(item.qty),
    0
  );
  const subtotal = cartProducts.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  // function increment
  const incrementCartItem = (cartProducts) => {
    const itemExist = cart.cartItems.find(
      (item) => item.id === cartProducts.id
    );
    if (itemExist) {
      cartDispatch({
        type: "CART_ADD_ITEM",
        payload: {
          items: cart.cartItems.map((item) =>
            item.id === cartProducts.id
              ? { ...itemExist, qty: itemExist.qty + 1 }
              : item
          ),
        },
      });
    }
  };

  // function decrement
  const decrementCartItem = (cartProducts) => {
    const exist = cart.cartItems.find((item) => item.id === cartProducts.id);

    if (exist.qty === 1) {
      cartDispatch({
        type: "CART_REMOVE_ITEM",
        payload: {
          items: cart.cartItems.filter((item) => item.id !== cartProducts.id),
          isCheckout: false,
        },
      });
    } else {
      cartDispatch({
        type: "CART_REMOVE_ITEM",
        payload: {
          items: cart.cartItems.map((item) =>
            item.id === cartProducts.id
              ? { ...exist, qty: exist.qty - 1 }
              : item
          ),
        },
      });
    }
  };

  // function remove item
  const removeItem = (cartProducts) => {
    const exist = cart.cartItems.find((item) => item.id === cartProducts.id);

    if (exist) {
      cartDispatch({
        type: "CART_REMOVE_ITEM",
        payload: {
          items: cart.cartItems.filter((item) => item.id !== cartProducts.id),
        },
      });
    }
  };

  const checkLogin = () => {
    if (state.isLogin === false) {
      navigate("/");
    }
  };

  useEffect(() => {
    checkLogin();
  }, [state]);

  const getProducts = async () => {
    const response = await API.get("/products");
    setProducts(response.data.data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <Container fluid className={`${styles.mainContent}`}>
        <Container className={`${styles.cartWrapper} pt-5`}>
          <Row>
            <h2 className={`${styles.cartTitle} fntMontserrat`}>My Cart</h2>
          </Row>

          {/* -------------------Cart items ------------start----------------------- */}

          <Row>
            <Row>
              <Col className="fntMontserrat" sm={8}>
                Review Your Order
              </Col>
            </Row>

            {cart.cartItems.length === 0 ? (
              <div className={`${styles.cartEmpty} fntAbhaya`}>
                <h1>
                  Your cart is empty, Please check our product{" "}
                  <span>
                    <Link to="/">here</Link>
                  </span>
                  ...
                </h1>
              </div>
            ) : (
              <Col sm={8}>
                <hr />

                {cartProducts.map((cartProduct) => (
                  <div key={cartProduct.id}>
                    <Row className="mb-0">
                      <Col className={styles.orderImage} sm={3}>
                        <img
                          className={styles.imgCart}
                          src={cartProduct.photo}
                          alt="product"
                        />
                      </Col>
                      <Col sm={3}>
                        <p className={`${styles.cartName} mt-3 fntMonserrat`}>
                          {cartProduct.name}
                        </p>
                        <div className={styles.buttonCartWrapper}>
                          <div>
                            <button
                              onClick={() => decrementCartItem(cartProduct)}
                              className={styles.buttonCartMinus}
                            >
                              -
                            </button>
                          </div>
                          <div className={styles.itemQty}>
                            {cartProduct.qty}
                          </div>
                          <div>
                            <button
                              onClick={() => incrementCartItem(cartProduct)}
                              className={styles.buttonCartPlus}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </Col>
                      <Col sm={3}></Col>

                      <div className={`${styles.orderValue} col-sm-3`}>
                        <p className="mt-3 fntRed">
                          {convertRupiah.convert(cartProduct.price)}
                        </p>
                        <button
                          className={styles.buttonTrash}
                          onClick={() => removeItem(cartProduct)}
                        >
                          <img src={trashIcon} alt="delete" />
                        </button>
                      </div>
                    </Row>
                    <hr />
                  </div>
                ))}
              </Col>
            )}

            {/* -------------------Cart items ------------end----------------------- */}

            {/* --------------------Subtotal-------------- */}

            {cart.cartItems.length === 0 ? (
              <div></div>
            ) : (
              <Col sm={4}>
                <hr />
                <div className={`${styles.subtotal} fntMontserrat`}>
                  <div>
                    <p>Subtotal</p>
                    <p>Qty</p>
                  </div>

                  <div className={styles.subtotalValue}>
                    <p className="fntRed">{convertRupiah.convert(subtotal)}</p>
                    <p>{cartQty}</p>
                  </div>
                </div>
                <hr />
                <div className={styles.subtotal}>
                  <div>
                    <b>
                      <p className="fntRed">Total</p>
                    </b>
                  </div>
                  <div className="value">
                    <b>
                      <p className="fntRed">
                        {convertRupiah.convert(subtotal)}
                      </p>
                    </b>
                  </div>
                </div>

                <Link to="/checkout">
                  <Button
                    variant="warning"
                    type="submit"
                    className={`btn w-75 mt-5 ms-5 ${styles.btnOrder}`}
                  >
                    Proceed To Checkout
                  </Button>
                </Link>
              </Col>
            )}
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default CartPage;
