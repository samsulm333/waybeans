import { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button, Image, Modal } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import convertRupiah from "rupiah-format";

import { UserContext } from "../context/userContext";

import QrCodeComponent from "../components/QRCode";

import { API } from "../config/api";

// import user from "../assets/Rectangle 12.png";
import logo from "../assets/logo.png";

import styles from "./UserProfile.module.css";

const UserProfilePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [state] = useContext(UserContext);
  const [user, setUser] = useState({});
  const [userTransaction, setUserTransaction] = useState([]);

  const [detailTrans, setDetailTrans] = useState(null);
  const [modalTrans, setModalTrans] = useState(false);

  const getUserTransaction = async () => {
    const token = localStorage.getItem("token");
    const responseData = await API.get("/my-transactions", {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    setUserTransaction(responseData.data.data.transactions);
  };

  const getUserById = async () => {
    const response = await API.get(`users/${id}`);
    setUser(response.data.data.user);
  };

  const handleFinishOrder = async (item) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const body = { status: "Success" };

    const response = await API.patch(`transaction/${item.id}`, body, config);
    if (response.status === 200) {
      getUserTransaction();
    }
  };

  const checkLogin = () => {
    if (state.isLogin === false) {
      navigate("/");
    }
  };

  const closeModalTrans = () => setModalTrans(false);
  const showModalTrans = (order) => {
    setModalTrans(true);
    setDetailTrans(order);
  };

  console.log(detailTrans);

  useEffect(() => {
    getUserById();
  }, []);

  useEffect(() => {
    checkLogin();
  }, [state]);

  useEffect(() => {
    getUserTransaction();
  }, []);

  return (
    <>
      <Container fluid className={styles.mainContent}>
        <Container className="pt-5">
          <Row>
            <Col xl={6}>
              <p className={`${styles.profileTitle} mb-4 fntMontserrat`}>
                My Profile
              </p>
              <Row>
                <div className={styles.imageWrapper}>
                  <Link to={`/edit-profile/${id}`}>
                    <img
                      className={`${styles.image}`}
                      src={user.image}
                      alt="user"
                    />
                  </Link>
                </div>

                <div className={styles.profileText}>
                  <p className="mb-5px fntBrown">Full Name</p>
                  <p className="mb-5px">{user.fullName}</p>
                  <br />
                  <p className="mb-5px fntBrown">Email</p>
                  <p className="mb-5px">{user.email}</p>
                </div>
              </Row>
            </Col>

            <Col xl={6}>
              <p className={`${styles.transTitle} mb-4 fntMontserrat`}>
                My Transaction
              </p>
              <div className={styles.transWrapper}>
                {userTransaction.length > 0 ? (
                  userTransaction.map((item) => (
                    <div className={styles.historyTransaction} key={item.id}>
                      <div className={styles.checkoutDetail}>
                        <Image
                          src={item.products[0].photo}
                          className={styles.imageTrans}
                        />
                        <div className={styles.checkoutInfo}>
                          <p className={styles.infoName}>
                            <b>{item.products[0].name} </b>
                            <br />
                            <small>{item.transaction_date}</small>
                          </p>

                          {item.products.length > 1 ? (
                            <Button
                              className={`${styles.buttonProduct} m-0`}
                              onClick={() => showModalTrans(item)}
                            >
                              +{item.products.length - 1} other products
                            </Button>
                          ) : (
                            <div className={styles.buttonEmpty}></div>
                          )}

                          <p className={styles.infoDetail}>
                            Price :{" "}
                            {convertRupiah.convert(item.products[0].price)}
                            <br />
                            Qty : {item.products[0].qty} <br />
                            <b className={styles.infoTotal}>
                              Sub Total : {convertRupiah.convert(item.subtotal)}
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
                        <div className={styles.QrCode}>
                          <QrCodeComponent code={item} />
                        </div>

                        {item.status === "On the way" ? (
                          <div className={styles.doneMark}>
                            <Button
                              className={`${styles.buttonDone} m-0`}
                              onClick={() => {
                                handleFinishOrder(item);
                              }}
                            >
                              Complete
                            </Button>
                          </div>
                        ) : (
                          <div className={styles.doneMark}>
                            <b>
                              <p className={styles.doneText}>{item.status}</p>
                            </b>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div>
                    <h5>you have no transactions..</h5>
                  </div>
                )}
              </div>
            </Col>
          </Row>

          <Modal
            className={styles.transModal}
            show={modalTrans}
            onHide={closeModalTrans}
            animation={true}
          >
            {detailTrans !== null ? (
              <div className={styles.transDetail}>
                <div className={styles.transDetailWrapper}>
                  {detailTrans.products.map((item) => (
                    <div className={styles.transInfoWrapper} key={item.id}>
                      <div className={styles.checkoutDetail}>
                        <Image src={item.photo} />
                        <div className={styles.checkoutInfo}>
                          <p className={styles.infoNameModal}>
                            <b>{item.name} </b>
                          </p>

                          <p className={styles.infoDetailModal}>
                            Price : {convertRupiah.convert(item.price)}
                            <br />
                            Qty : {item.qty} <br />
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
                        <div className={styles.QrCode}>
                          <QrCodeComponent code={item} />
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className={styles.modalTransSubtotal}>
                    <p>
                      <b className="ps-3 fntRed">
                        Sub Total :{" "}
                        {convertRupiah.convert(detailTrans.subtotal)}
                      </b>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </Modal>
        </Container>
      </Container>
    </>
  );
};

export default UserProfilePage;
