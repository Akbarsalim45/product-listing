const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Users = require("./model/users");
const Products = require("./model/products");
//middlewares
app.use(cors());
app.use(express.json());

//mongoose connection
mongoose.connect("mongodb://localhost/product-listing", () => {
  console.log("connected to mongoose");
});

//Routes

app.post("/register", async (req, res) => {
  try {
    const { name, email, password, place } = req.body;
    let user = await Users.findOne({ Email: email });
    if (user) {
      res.json({ status: "error", message: "Email already exist" });
      return;
    } else {
      user = await new Users({
        Name: name,
        Email: email,
        Password: password,
        Place: place,
      });
      await user.save();
      res.json({ status: "success" });
    }
  } catch (e) {
    console.log(e);
    res.json({ status: "catch-error", message: "registration failed" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await Users.findOne({ Email: email });
    if (user) {
      if (user.Password == password) {
        res.json({ status: "success", message: "Login success" });
      } else {
        res.json({ status: "errorPassword", message: "password not correct" });
        return;
      }
    } else {
      res.json({
        status: "error",
        message: "user not found.please register first",
      });
      return;
    }
  } catch (e) {
    console.log(e);
    res.json({ status: "catch-error", message: "Login failed" });
  }
});
app.post("/addproduct", async (req, res) => {
  try {
    const { productName, price, quantity, category } = req.body;
    let product = await Products.findOne({ Name: productName });
    if (product) {
      res.json({ status: "error", message: "product already exist" });
      return;
    } else {
      product = await new Products({
        Name: productName,
        Price: price,
        Quantity: quantity,
        Category: category,
      });
      await product.save();
      res.json({ status: "success", message: "product inserted sucessfully" });
    }
  } catch (e) {
    console.log(e);
    res.json({ status: "catch-error", message: "operation failed" });
  }
});

app.get("/viewproduct", async (req, res) => {
  try {
    const products = await Products.find();

    res.json({ status: "success", products });
  } catch (e) {
    console.log(e);
    res.json({ status: "catch-error", message: "operation failed" });
  }
});

//port
app.listen(3010, () => {
  console.log("connected to server");
});
