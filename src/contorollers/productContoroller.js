import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name -_id");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
try{  const { name, price, category } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({
      message: "name ,price and category are required",
    });
  }

  const product = await Product.create({
    name,
    price,
    category,
  });

  res.status(201).json(product);}catch(error){res.status(500).json({message:error.message})}
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name -_id",
    );
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, price ,category } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      { name, price ,category },
      { new: true },
    );
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
     return res.status(404).json({ message: "product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
