import { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Button,
  Col,
  Image,
  Form,
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import convertRupiah from "rupiah-format";

import { CartContext } from "../context/cartContext";
import { UserContext } from "../context/userContext";
import { API } from "../config/api";

import styles from "./CheckoutPage.module.css";
import logo from "../assets/logo.png";

function CheckoutPage() {
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const [modalTrans, setModalTrans] = useState(false);
  const [preview, setPreview] = useState(null);
  const [state] = useContext(UserContext);
  const [cart, cartDispatch] = useContext(CartContext);
  const cartProducts = cart.cartItems;

  const date = new Date();
  const dateTimeFormat = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const TransactionDate = dateTimeFormat.format(date);

  let orderItems = cartProducts.map((item) => {
    return {
      id: item.id,
      qty: item.qty,
    };
  });
  const subtotal = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    post_code: "",
    address: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const closeModal = () => {
    setModal(false);
    navigate(`/profile-user/${state.user.user.id}`);
  };
  const showModal = () => setModal(true);

  const closeModalTrans = () => setModalTrans(false);
  const showModalTrans = () => setModalTrans(true);

  // insert order to server
  const handleOrderButton = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `token ${token}`,
      },
    };
    const formData = new FormData();
    formData.set("name", form.name);
    formData.set("email", form.email);
    formData.set("phone", form.phone);
    formData.set("post_code", form.post_code);
    formData.set("address", form.address);
    formData.set("image", form.image[0], form.image[0].name);
    formData.set("subtotal", subtotal);
    formData.set("products", JSON.stringify(orderItems));

    const createOrder = await API.post("/transaction", formData, config);
    if (createOrder.status === 200) {
      showModal();
      cartDispatch({
        type: "CART_CHECKOUT_SUCCESS",
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

  return (
    <>
      <Container fluid className={styles.mainContent}>
        <div className={`${styles.checkoutWrapper} pt-5 container`}>
          {cart.cartItems.length === 0 ? (
            <div className={`${styles.cartEmpty} fntAbhaya`}>
              <h1>There's no transaction to pay for...</h1>
            </div>
          ) : (
            <form
              className={styles.checkoutForm}
              onSubmit={handleOrderButton}
              encType="multipart/form-data"
            >
              <Row>
                <Col xl={6} className={styles.formWrapper}>
                  <h2 className="fntMontserrat fntBrown">
                    <b>Shipping</b>
                  </h2>
                  <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                    <Form.Control
                      className={`${styles.input} w-100`}
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      className={`${styles.input} w-100`}
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      className={`${styles.input} w-100`}
                      type="text"
                      placeholder="Phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      className={`${styles.input} w-100`}
                      type="text"
                      placeholder="Post Code"
                      name="post_code"
                      value={form.post_code}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      className={`${styles.input} w-100`}
                      as="textarea"
                      rows={4}
                      placeholder="Address"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <div className="d-flex">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control
                        className={`${styles.input} w-75`}
                        type="file"
                        name="image"
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    {preview && (
                      <div className={styles.preview}>
                        <Image src={preview} fluid />
                      </div>
                    )}
                  </div>
                </Col>
                <Col xl={6} className={`${styles.infoWrapper} fntMontserrat`}>
                  <div className={styles.historyTransaction}>
                    <div className={styles.checkoutDetail}>
                      <Image src={cart.cartItems[0].photo} />
                      <div className={styles.checkoutInfo}>
                        <p className={styles.infoName}>
                          <b>{cart.cartItems[0].name} </b>
                          <br />
                          <small>{TransactionDate}</small>
                        </p>

                        <p className={styles.infoDetail}>
                          Price :{" "}
                          {convertRupiah.convert(cart.cartItems[0].price)}
                          <br />
                          Qty : {cart.cartItems[0].qty} <br />
                          <b className={styles.infoTotal}>
                            Total : {convertRupiah.convert(subtotal)}
                          </b>
                        </p>
                      </div>
                    </div>

                    <div className={styles.historyMark}>
                      <div className={styles.logoStyle}>
                        <Image
                          className={styles.img}
                          src={logo}
                          alt="logo"
                          fluid
                        />
                      </div>
                      {cart.cartItems.length > 1 && (
                        <div className={styles.buttonProductWrapper}>
                          <Button
                            className={`${styles.buttonProduct} w-100 m-0`}
                            onClick={showModalTrans}
                          >
                            <small>
                              +{cart.cartItems.length - 1} other products
                            </small>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    className={`${styles.cardButton} ms-0 w-100`}
                    type="submit"
                  >
                    Pay
                  </Button>
                </Col>
              </Row>
            </form>
          )}

          <Modal
            className={`${styles.transSuccess}`}
            show={modal}
            onHide={closeModal}
            animation={false}
          >
            <h4 className={`${styles.transSuccessText} fntMontserrat`}>
              Thank you for ordering in us, please wait 1 x 24 hours to verify
              your order
            </h4>
          </Modal>

          <Modal
            className={styles.transModal}
            show={modalTrans}
            onHide={closeModalTrans}
            animation={true}
          >
            <div className={styles.transDetail}>
              <div className={styles.transDetailWrapper}>
                {cart.cartItems.map((item) => (
                  <div className={styles.historyTransaction}>
                    <div className={styles.checkoutDetail}>
                      <Image src={item.photo} />
                      <div className={styles.checkoutInfo}>
                        <p className={styles.infoName}>
                          <b>{item.name} </b>
                          <br />
                          <small>{TransactionDate}</small>
                        </p>

                        <p className={styles.infoDetail}>
                          Price : {convertRupiah.convert(item.price)}
                          <br />
                          Qty : {cart.cartItems[0].qty} <br />
                        </p>
                      </div>
                    </div>

                    <div className={styles.historyMark}>
                      <div className={styles.logoStyle}>
                        <Image
                          className={styles.img}
                          src={logo}
                          alt="logo"
                          fluid
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <div>
                  <p>
                    <b className="ps-3 fntRed">
                      Sub Total : {convertRupiah.convert(subtotal)}
                    </b>
                  </p>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </Container>
    </>
  );
}

export default CheckoutPage;
