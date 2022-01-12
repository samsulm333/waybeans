import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  Modal,
} from "react-bootstrap";

import { UserContext } from "../context/userContext";

import { API } from "../config/api";

import imgIcon from "../assets/add-product.png";
import styles from "./EditProduct.module.css";

const EditProductPage = () => {
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const [state] = useContext(UserContext);

  const [form, setForm] = useState({
    name: "",
    stock: "",
    price: "",
    description: "",
    image: "",
  });

  const [preview, setPreview] = useState(null);

  let navigate = useNavigate();

  const closeModal = () => setModal(false);
  const showModal = () => setModal(true);

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

  const handleSubmit = async (e) => {
    try {
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
      formData.set("stock", form.stock);
      formData.set("price", form.price);
      formData.set("description", form.description);
      formData.set("image", form.image[0], form.image[0].name);

      // console.log(formData);

      const response = await API.patch(`/product/${id}`, formData, config);

      if (response.status === 200) {
        showModal();
        setForm({
          name: "",
          stock: "",
          price: "",
          description: "",
          image: "",
        });
        setPreview(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProductDetail = async () => {
    const response = await API.get(`/product/${id}`);

    //    response.data.data.product
    setForm({
      name: response.data.data.product.name,
      stock: response.data.data.product.stock,
      price: response.data.data.product.price,
      description: response.data.data.product.description,
      image: response.data.data.product.photo,
    });
    setPreview(response.data.data.product.photo);
  };

  const checkLogin = () => {
    if (state.isLogin === false || state.role !== "admin") {
      navigate("/");
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    <>
      <Container fluid className={styles.mainContent}>
        <div className={`${styles.checkoutWrapper} pt-5 container`}>
          <Row>
            <Col xl={6} className={styles.formWrapper}>
              <Form className={styles.checkoutForm} onSubmit={handleSubmit}>
                <h2 className="fntMontserrat fntBrown">
                  <b>Add Product</b>
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
                    type="number"
                    placeholder="Stock"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    className={`${styles.input} w-100`}
                    type="number"
                    placeholder="Price"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    className={`${styles.input} w-100`}
                    as="textarea"
                    rows={4}
                    placeholder="Description Product"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    className={`${styles.inputImage} w-50 ${styles.attachImage} ${styles.input} `}
                    type="file"
                    name="image"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Button
                  type="submit"
                  className={`${styles.cardButton} ms-0 w-100`}
                  // onClick={() => AddToCart(product)}
                >
                  Add Product
                </Button>
              </Form>
            </Col>
            <Col xl={6} className={`${styles.previewWrapper} fntMontserrat`}>
              {preview ? (
                <Image
                  src={preview}
                  className={styles.preview}
                  style={{ objectFit: "cover" }}
                  alt="preview"
                  fluid
                />
              ) : (
                <Image
                  src={imgIcon}
                  className={styles.imgPreview}
                  style={{ objectFit: "contain" }}
                  alt="preview"
                />
              )}
            </Col>
          </Row>
        </div>

        <Modal
          className={`${styles.addProductSuccess}`}
          show={modal}
          onHide={closeModal}
          animation={false}
        >
          <h4 className={styles.addProductText}>Add Product Success</h4>
        </Modal>
      </Container>
    </>
  );
};

export default EditProductPage;
