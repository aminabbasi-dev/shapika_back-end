import Cart from "../models/Cart.js";

export const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({
      user: req.user._id,
    }).populate("product");

    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const existingItem = await Cart.findOne({
      user: req.user._id,
      product: productId,
    });

    if (existingItem) {
      existingItem.quantity += quantity || 1;
      await existingItem.save();

      return res.status(200).json(existingItem);
    }

    const cartItem = await Cart.create({
      user: req.user._id,
      product: productId,
      quantity: quantity || 1,
    });

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateCartQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1",
      });
    }

    const cartItem = await Cart.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    const cartItem = await Cart.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    await cartItem.deleteOne();

    res.status(200).json({
      message: "Item removed from cart",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
