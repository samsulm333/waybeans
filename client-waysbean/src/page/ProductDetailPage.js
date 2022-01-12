import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Card, Button, Col, Image } from "react-bootstrap";
import convertRupiah from "rupiah-format";

import { CartContext } from "../context/cartContext";
import { UserContext } from "../context/userContext";
import { API } from "../config/api";

// import style
import styles from "./ProductDetail.module.css";

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [state, dispatch] = useContext(UserContext);
  const [cart, cartDispatch] = useContext(CartContext);
  const [product, setProduct] = useState({});

  const AddToCart = (product) => {
    const itemExist = cart.cartItems.find((item) => item.id === product.id);

    if (itemExist) {
      cartDispatch({
        type: "CART_ADD_ITEM",
        payload: {
          items: cart.cartItems.map((item) =>
            item.id === product.id
              ? { ...itemExist, qty: itemExist.qty + 1 }
              : item
          ),
        },
      });
      return;
    } else {
      cartDispatch({
        type: "CART_ADD_ITEM",
        payload: {
          items: [...cart.cartItems, { ...product, qty: 1 }],
        },
      });
      return;
    }
  };

  const getProduct = async () => {
    const response = await API.get(`/product/${id}`);

    setProduct(response.data.data.product);
  };

  const deleteProduct = async () => {
    const response = await API.delete(`/product/${id}`);
    console.log(response);
    navigate("/");
  };

  console.log(product);

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      {/* <NavbarComponent /> */}

      <Container fluid className={styles.mainContent}>
        <div className={`${styles.dProductWrapper} pt-5 container`}>
          <Row>
            <Col xl={5} className={styles.imgWrapper}>
              <Image
                src={product.photo}
                alt="product-image"
                className={styles.imgProduct}
              />
            </Col>
            <Col xl={7} className={`${styles.infoWrapper} fntMontserrat`}>
              <h1 className={`${styles.infoProdName} `}>{product.name}</h1>
              <p>
                Stock : {product.stock > 0 ? product.stock : "Out of stock"}
              </p>
              <p>{product.description}</p>
              <h4 className={styles.infoPrice}>
                {convertRupiah.convert(product.price)}
              </h4>

              {state.isLogin === true &&
              state.role === "customer" &&
              product.stock > 0 ? (
                <Button
                  className={`${styles.cardButton} ms-0`}
                  onClick={() => AddToCart(product)}
                >
                  Add To cart
                </Button>
              ) : (
                <div></div>
              )}
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default ProductDetailPage;
