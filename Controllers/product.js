import { Products } from "../Models/Product.js";

//add product

export const addProduct = async (req, res) => {
  const { title, category, description, price, qty, imgSrc } = req.body;
  try {
    // Check if the product already exists.   
    let product = await Products.findOne({ where: { title } });

    if (product) {
      // If the product exists, increase the quantity
      product.qty += qty;
      await product.save();
      res.json({ message: 'Product quantity updated successfully!', product });
    } else {
      // If the product doesn't exist, create a new one
      product = await Products.create({
        title,
        description,
        price,
        category,
        qty,
        imgSrc
      });
      res.json({ message: 'Product added successfully!!!!', product, success:true });
    }
  } catch (error) {
    res.status(500).json({ "x":"cccc",error: error.message });
  }
};


export const getproducts = async (req, res) => {
  let products = await Products.find().sort({ createdAt: -1 })
  res.json({ message: 'All products', products })

}

//find product by id 
export const getProductById = async (req, res) => {
  const id = req.params.id;
  let product = await Products.findById(id)
  if (!product) return res.json({ message: 'invalid id' })
  res.json({ message: 'specific products', product })
}


//update product by id 
export const updateProductById = async (req, res) => {
  const id = req.params.id;
  let product = await Products.findByIdAndUpdate(id, req.body, { new: true })
  if (!product) return res.json({ message: 'invalid id' })
  res.json({ message: 'product has been updated', product })
}

//delete product by id
export const deleteProductById = async (req, res) => {
  const id = req.params.id;
  let product = await Products.findByIdAndDelete(id)
  if (!product) return res.json({ message: 'invalid id' })
  res.json({ message: "product has been Deleted", product })

}


