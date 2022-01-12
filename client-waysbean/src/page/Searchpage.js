import { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import convertRupiah from "rupiah-format";

import { API } from "../config/api";

import styles from "./SearchPage.module.css";

const Searchpage = ({ search }) => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      // if products are found
      // fetch to API search with query string q= search state
      const response = await API.get(`/search?q=${search}`);
      setProducts(response.data.data);
    } catch (error) {
      // if product not found reset product state to empty array
      if (error.response.status === 400) {
        setProducts([]);
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, [search]);

  return (
    <div>
      <>
        <Container fluid className={styles.mainContent}>
          <div className={styles.cardWrapper}>
            {products.length === 0 ? (
              <div className={`${styles.cartEmpty} fntAbhaya`}>
                <h1>
                  No products found with the name "{search}", Please check our
                  product{" "}
                  <span>
                    <Link to="/">here</Link>
                  </span>
                  ...
                </h1>
              </div>
            ) : (
              <>
                {products.map((product) => (
                  <div
                    className={`${styles.cardProduct} ms-3 mt-4`}
                    key={product.id}
                  >
                    <Card style={{ width: "100%" }}>
                      <Link
                        to={`/product/${product.id}`}
                        className={styles.link}
                      >
                        <Card.Img
                          variant="top"
                          src={product.photo}
                          className={styles.partnerImage}
                        />
                        <Card.Body className={styles.cardBody}>
                          <Card.Title
                            className={`${styles.cardName} fntMontserrat`}
                          >
                            {product.name}
                          </Card.Title>
                          <div className={styles.cardText}>
                            <Card.Text className="mb-0">
                              Price : {convertRupiah.convert(product.price)}
                            </Card.Text>
                            <Card.Text>
                              Stock :{" "}
                              {product.stock > 0
                                ? product.stock
                                : "Out of Stock"}
                            </Card.Text>
                          </div>
                        </Card.Body>
                      </Link>
                    </Card>
                  </div>
                ))}
              </>
            )}
          </div>
        </Container>
      </>
    </div>
  );
};

export default Searchpage;
