import { ProductModel } from "./models/product.js";


const createProduct = async (product) => {
	const newProduct = new ProductModel(product);
	return newProduct.save();
};

const findProducts = async () => ProductModel.find().lean();

const findProductById = async (id) => ProductModel.findById(id);

const uppdateProductById = async (id, updateData) => {
    return ProductModel.findByIdAndUpdate(id, updateData, {
        new: true, runValidators: true
    });
};

const deleteProductById = async (id) => {
    return ProductModel.findByIdAndDelete(id);
};

export { createProduct, findProducts, findProductById, uppdateProductById, deleteProductById};