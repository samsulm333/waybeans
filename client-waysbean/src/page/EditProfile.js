import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Modal } from "react-bootstrap";

import { API } from "../config/api";

import { UserContext } from "../context/userContext";

import styles from "./EditProfile.module.css";

const EditProfile = ({ hide }) => {
  const [state] = useContext(UserContext);

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    image: "",
  });

  console.log(form);

  const [preview, setPreview] = useState(null);

  let navigate = useNavigate();

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    image: "",
  });
  const { id } = useParams();

  const getUserById = async () => {
    const response = await API.get(`users/${id}`);
    setUser(response.data.data.user);
  };

  const handleChange = (e) => {
    setUser({
      ...user,
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

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      formData.set("fullName", user.fullName);
      formData.set("email", user.email);
      formData.set("image", user.image[0], user.image[0].name);

      const response = await API.patch(`/users/${id}`, formData, config);

      console.log(formData.get("image"));
      if (response.status === 200) {
        navigate(`/profile-user/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkLogin = () => {
    if (state.isLogin === false) {
      navigate("/");
    }
  };

  useEffect(() => {
    checkLogin();
    getUserById();
  }, [state]);

  return (
    <>
      <Container fluid className="mainContent">
        <Container className="pt-5">
          <h2 className="ms-3 mb-5 fntMontserrat fntBrown">Edit Profile</h2>
          <form method="post" onSubmit={handleSubmit}>
            <div className="mb-3 d-flex">
              <div className="w-75 me-2">
                <input
                  type="text"
                  placeholder={`Full Name  :  ${user.fullName}`}
                  className={`title form-control ${styles.input}`}
                  name="fullName"
                  value={user.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="w-25 d-flex">
                <input
                  type="file"
                  className={`${styles.attachImage} form-control ${styles.input} `}
                  placeholder="Attach Image"
                  name="image"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <input
                type="email"
                placeholder={`Email  :  ${user.email}`}
                className={`price form-control ${styles.input}`}
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>

            <div className="d-flex flex-row-reverse mt-5">
              <button type="submit" className="btn w-25 me-0 mt-5">
                Save
              </button>
            </div>
          </form>
        </Container>
      </Container>
    </>
  );
};

export default EditProfile;
