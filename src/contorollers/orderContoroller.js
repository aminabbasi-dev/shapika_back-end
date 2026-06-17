import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).populate("items.product");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createOrder = async (req, res) => {
  try {
    const cartItems = await Cart.find({
      user: req.user._id,
    }).populate("product");

    if (cartItems.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    let totalPrice = 0;

    const orderItems = cartItems.map((item) => {
      totalPrice += item.product.price * item.quantity;

      return {
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      };
    });

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalPrice,
    });

    await Cart.deleteMany({ user: req.user._id });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
