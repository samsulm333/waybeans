import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button, Form, Alert } from "react-bootstrap";

import { UserContext } from "../../context/userContext";

import { API } from "../../config/api";
import "./AuthModal.css";

const AuthModal = () => {
  let navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);

  // -------------Login function----------
  const [loginModal, setLoginModal] = useState(false);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const closeLoginModal = () => setLoginModal(false);
  const showLoginModal = () => setLoginModal(true);
  const moveToLoginModal = () => {
    setRegisterModal(false);
    setLoginModal(true);
  };

  // handle change login
  const handleChangeLogin = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit login
  const handleSubmitLogin = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(loginForm);

      let response = await API.post("/login", body, config);

      // notification
      if (response.status === 200) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });
        if (response.data.data.user.role == "admin") {
          navigate("/transaction");
        }
      }
    } catch (error) {
      if (error.message === "Network Error") {
        const alert = (
          <Alert variant="danger" className="notif">
            Server Error
          </Alert>
        );
        setMessage(alert);
      } else if (error.response.status === 400) {
        console.log(error.response);
        const alert = (
          <Alert variant="danger" className="notif">
            {error.response.data.message}
          </Alert>
        );
        setMessage(alert);
      } else {
        console.log(error);
      }
    }
  };

  const closeRegisterModal = () => setRegisterModal(false);
  const showRegisterModal = () => setRegisterModal(true);
  const moveToRegisterModal = () => {
    setRegisterModal(true);
    setLoginModal(false);
  };

  // ----------Register Function-------------
  const [registerModal, setRegisterModal] = useState(false);

  const [regisForm, setRegisForm] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  const handleChangeRegis = (e) => {
    setRegisForm({
      ...regisForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitRegis = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(regisForm);

      const response = await API.post("/register", body, config);

      // notification
      if (response.status === 200) {
        const alert = (
          <Alert variant="success" className="notif">
            Register success, Please Login!
          </Alert>
        );
        setMessage(alert);
        moveToLoginModal();
      }
    } catch (error) {
      if (error.message === "Network Error") {
        const alert = (
          <Alert variant="danger" className="notif">
            Server Error
          </Alert>
        );
        setMessage(alert);
      } else if (error.response.status === 400) {
        console.log(error.response);
        const alert = (
          <Alert variant="danger" className="notif">
            {error.response.data.message}
          </Alert>
        );
        setMessage(alert);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      {/* --------Login Button--------- */}
      <Button className="button" onClick={showLoginModal}>
        Login
      </Button>

      {/* ------------Login Modal----------- */}
      <Modal
        className="loginModal"
        show={loginModal}
        onHide={closeLoginModal}
        animation={false}
      >
        <h2 className="modalHeader">Login</h2>
        {message && message}

        <form className="formModal" onSubmit={handleSubmitLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              className="input"
              type="email"
              placeholder="Email"
              value={loginForm.email}
              name="email"
              onChange={handleChangeLogin}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control
              className="input"
              type="password"
              placeholder="Password"
              name="password"
              value={loginForm.password}
              onChange={handleChangeLogin}
            />
          </Form.Group>

          <Form.Group>
            <button variant="primary" className="input-button">
              Login
            </button>
          </Form.Group>

          <Form.Text className="formText">
            Don't have an account ? Klik
            <Link to="#" className="btnLink" onClick={moveToRegisterModal}>
              Here
            </Link>
          </Form.Text>
        </form>
      </Modal>

      {/* ---------------Register Button---------- */}
      <Button className="button" onClick={showRegisterModal}>
        Register
      </Button>

      {/* --------------Register Modal-------------  */}
      <Modal
        className="registerModal"
        show={registerModal}
        onHide={closeRegisterModal}
        animation={false}
      >
        <h2 className="modalHeader">Register</h2>
        {message && message}

        <form className="registerForm" onSubmit={handleSubmitRegis}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              className="input"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChangeRegis}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control
              className="input"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChangeRegis}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              className="input"
              type="text"
              placeholder="Fullname"
              name="fullName"
              onChange={handleChangeRegis}
            />
          </Form.Group>

          <Form.Group>
            <button variant="primary" className="input-button">
              Register
            </button>
          </Form.Group>

          <Form.Text className="formTextRegister">
            Already have an account ? Klik
            <Link to="#" className="btnLink" onClick={moveToLoginModal}>
              Here
            </Link>
          </Form.Text>
        </form>
      </Modal>
    </>
  );
};

export default AuthModal;
