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

//Summera det totala värdet av alla produkter i lager
const getTotalStockValue = async () => {
  const [res] = await ProductModel.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: { $multiply: ["$price", "$amountInStock"] } }
      }
    }
  ]).exec();
  return res?.total ?? 0;
};

// Total stock value per manufacturer
const getTotalStockValueByManufacturer = async () => {
  return ProductModel.aggregate([
    {
      $group: {
        _id: "$manufacturer.name",
        total: { $sum: { $multiply: ["$price", "$amountInStock"] } }
      }
    },
    { $project: { _id: 0, manufacturer: "$_id", total: 1 } },
    { $sort: { total: -1 } }
  ]).exec();
};

// Alla produkter med amountInStock < 10
const getLowStock = async () => {
  return ProductModel.find({ amountInStock: { $lt: 10 } }).lean().exec();
};

// Kompakt lista för critical stock (< 5)
const getCriticalStock = async () => {
  const docs = await ProductModel.find(
    { amountInStock: { $lt: 5 } },
    {
      name: 1,
      amountInStock: 1,
      "manufacturer.name": 1,
      "manufacturer.contact.name": 1,
      "manufacturer.contact.phone": 1,
      "manufacturer.contact.email": 1,
      _id: 0
    }
  ).lean().exec();

  return docs.map(d => ({
    productName: d.name,
    amountInStock: d.amountInStock,
    manufacturer: d.manufacturer?.name ?? null,
    contact: d.manufacturer?.contact ? {
      name: d.manufacturer.contact.name,
      phone: d.manufacturer.contact.phone,
      email: d.manufacturer.contact.email
    } : null
  }));
};

// Lista alla unika manufacturers
const getManufacturers = async () => {
  return ProductModel.aggregate([
    { $group: { 
      _id: "$manufacturer.name", 
      manufacturer: { $first: "$manufacturer" } 
    } },
    { $set: {
      "name": "$manufacturer.name",
      "country": "$manufacturer.country",
      "website": "$manufacturer.website",
      "description": "$manufacturer.description", 
      "address": "$manufacturer.address",
      "contact": "$manufacturer.contact"
    }},
    { $unset: ["_id", "manufacturer"] }
  ]).exec();
};

export {
  createProduct, findProducts, findProductById, uppdateProductById, deleteProductById, getTotalStockValue, getTotalStockValueByManufacturer, getLowStock, getCriticalStock, getManufacturers
};
