import { useState, useEffect, useContext } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

import { API } from "../config/api";

import { UserContext } from "../context/userContext";

// import styles
import "./IncomeTransaction.css";

// import assets
import checklist from "../assets/checklist.png";
import cancel from "../assets/cancel.png";

const IncomeTransactionPage = () => {
  const location = useLocation();
  let navigate = useNavigate();
  const [state] = useContext(UserContext);
  const [transaction, setTransaction] = useState([]);

  const getTransaction = async () => {
    const responseData = await API.get("/transactions");

    setTransaction(responseData.data.data.transaction);
  };

  const handleButtonApprove = async (order) => {
    const id = order.id;

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const body = { status: "On the way" };
    const response = await API.patch(`/transaction/${id}`, body, config);
    if (response.status === 200) {
      getTransaction();
    }
  };

  const handleButtonCancel = async (order) => {
    const id = order.id;

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const body = { status: "Canceled" };
    const response = await API.patch(`transaction/${id}`, body, config);
    if (response.status === 200) {
      getTransaction();
    }
  };

  const checkLogin = () => {
    if (state.isLogin == false || state.role !== "admin") {
      navigate("/");
    }
  };

  useEffect(() => {
    getTransaction();
  }, []);

  useEffect(() => {
    checkLogin();
  }, [state]);

  return (
    <>
      <Container fluid className="mainContentTransaction">
        <Container className="pt-5">
          <h2 className="ms-3 mb-5 fntMontserrat fntBrown transTitle">
            Income Transaction
          </h2>

          {transaction.length === 0 ? (
            <div className="Empty fntAbhaya">
              <h2>Your Transaction is empty...</h2>
            </div>
          ) : (
            <table>
              <tr className="tableHead">
                <th>No</th>
                <th>Name</th>
                <th className="address">Address</th>
                <th className="postCode">Post Code</th>
                <th>Product Orders</th>
                <th>Status</th>
                <th className="action">Action</th>
              </tr>
              {transaction.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td className="address">{item.address}</td>
                  <td className="postCode">{item.post_code}</td>
                  <td>
                    {item.products.map((order) => (
                      <ul>
                        <li>
                          {order.name} <bold>x{order.qty}pcs</bold>
                        </li>
                      </ul>
                    ))}
                  </td>

                  {item.status === "Waiting Approve" ? (
                    <td className="waitingApprove">{item.status}</td>
                  ) : item.status === "On the way" ? (
                    <td className="onTheWay">{item.status}</td>
                  ) : item.status === "Canceled" ? (
                    <td className="cancel">{item.status}</td>
                  ) : (
                    <td className="success">{item.status}</td>
                  )}

                  <td className="action">
                    {item.status === "Success" ? (
                      <img src={checklist} alt="cancel" />
                    ) : item.status === "On the way" ? (
                      <button className="btn-primary" disabled>
                        <small>On the way</small>
                      </button>
                    ) : item.status === "Canceled" ? (
                      <img src={cancel} alt="cancel" />
                    ) : (
                      <>
                        <button
                          onClick={() => handleButtonCancel(item)}
                          className="btnTransaction btn-danger"
                        >
                          <small> Cancel</small>
                        </button>
                        <button
                          onClick={() => handleButtonApprove(item)}
                          className="btnTransaction btn-success"
                        >
                          <small>Approove</small>
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </table>
          )}
        </Container>
      </Container>
    </>
  );
};

export default IncomeTransactionPage;
