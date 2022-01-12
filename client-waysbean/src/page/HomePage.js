import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import convertRupiah from "rupiah-format";

import { API } from "../config/api";

// import style
import styles from "./HomePage.module.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

// import assets
import banner from "../assets/banner.png";
import logo from "../assets/IconBanner.png";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await API.get("/products");
    setProducts(response.data.data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Container fluid className={styles.containerBanner}>
        <Container>
          <Row>
            <Col className={styles.banner}>
              <img src={logo} className={styles.bannerText} />
              <h3 className="fntMontserrat">BEST QUALITY COFFEE BEANS.</h3>
              <Row>
                <p className={`${styles.textBanner} mt-3`}>
                  Quality freshly roasted coffee made just for you. <br /> Pour,
                  brew and enjoy
                </p>
              </Row>
            </Col>

            <img className={styles.img} src={banner} alt="banner" />
          </Row>
        </Container>
      </Container>

      <Container fluid className={styles.mainContent}>
        <div className={styles.cardWrapper}>
          {products.map((product) => (
            <div className={`${styles.cardProduct} ms-3 mt-4`} key={product.id}>
              <Card style={{ width: "100%" }}>
                <Link to={`/product/${product.id}`} className={styles.link}>
                  <Card.Img
                    variant="top"
                    src={product.photo}
                    className={styles.partnerImage}
                  />
                  <Card.Body className={styles.cardBody}>
                    <Card.Title className={`${styles.cardName} fntMontserrat`}>
                      {product.name}
                    </Card.Title>
                    <div className={styles.cardText}>
                      <Card.Text className="mb-0">
                        Price : {convertRupiah.convert(product.price)}
                      </Card.Text>
                      <Card.Text>
                        Stock :{" "}
                        {product.stock > 0 ? product.stock : "Out of Stock"}
                      </Card.Text>
                    </div>
                  </Card.Body>
                </Link>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default HomePage;
