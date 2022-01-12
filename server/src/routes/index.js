const express = require("express");

const router = express.Router();

const { register, login, checkAuth } = require("../controllers/auth");

const { getUserById, updateUser } = require("../controllers/user");

const {
  addProduct,
  getProducts,
  getDetailproduct,
  updateProduct,
  deleteProduct,
  searchProduct,
} = require("../controllers/product");

const {
  addTransaction,
  getAllTransactionByAdmin,
  getUserTransaction,
  editTransaction,
} = require("../controllers/transaction");

const { auth } = require("../../middlewares/auth");
const { uploadFile } = require("../../middlewares/uploadFile");

// Routes

router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", auth, checkAuth);

// Users
router.get("/users/:id", getUserById);
router.patch("/users/:id", uploadFile("image"), updateUser);

// Products
router.post("/product", auth, uploadFile("image"), addProduct);
router.get("/products", getProducts);
router.get("/product/:id", getDetailproduct);
router.patch("/product/:id", uploadFile("image"), updateProduct);
router.delete("/product/:id", deleteProduct);
router.get("/search", searchProduct);

// transaction
router.post("/transaction", auth, uploadFile("image"), addTransaction);
router.get("/transactions", auth, getAllTransactionByAdmin);
router.get("/my-transactions", auth, getUserTransaction);
router.patch("/transaction/:id", auth, editTransaction);

module.exports = router;
