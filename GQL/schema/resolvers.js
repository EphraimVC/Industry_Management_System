
import { ProductModel } from "../db/models/product.js";


export const resolvers = {
  Query: {
    products: async () => { 
        return ProductModel.find().lean();
    },
    product: async (_parent, { id }) => {
        return ProductModel.findById(id).lean();
    },

    totalStockValue: async () => {
      const [res] = await ProductModel.aggregate([
        { $group: 
            { _id: null,
            total: {$sum: { $multiply: ["$price", "$amountInStock"]} }  
            } 
        }
        
      ]);
      return res?.total ?? 0;
    },

    totalStockValueByManufacturer: async () => {
        return ProductModel.aggregate([
        {
          $group: {
            _id: "$manufacturer.name",
            totalValue: { $sum: { $multiply: ["$price", "$amountInStock"] } },
          },
        },
        { $project: { _id: 0, manufacturerName: "$_id", totalValue: 1 } },
        { $sort: { totalValue: -1 } },
      ]);
    },

    lowStockProducts: async () => {
      return ProductModel.find({ amountInStock: { $lt: 10 } }).lean().exec();
    },
    criticalStockProducts: async () => {
        return ProductModel.aggregate([
            {
              $match: {
                amountInStock: { $lt: 5 }
              }
            },
            {
              $project: {
                _id: 0,
                productName: "$name",
                amountInStock: 1,
                manufacturer: "$manufacturer.name",
                contact: {
                  name: "$manufacturer.contact.name",
                  phone: "$manufacturer.contact.phone",
                  email: "$manufacturer.contact.email"
                }
              }
            },
            {
              $sort: {
                amountInStock: 1
              }
            }
          ]);
        },
    manufacturers: async () => {
      return ProductModel.aggregate([
        {
          $group: {
            _id: "$manufacturer.name",
            manufacturer: { $first: "$manufacturer" },
          },
        },
        {
          $replaceRoot: { newRoot: "$manufacturer" },
        },
      ]).exec();
    },
  },

  Mutation: {
    addProduct: async (_parent, { input }) => {
      const product = new ProductModel(input);
      return product.save();
    },

    updateProduct: async (_parent, { id, input }) => {
      const updatedProduct = await ProductModel.findByIdAndUpdate(id,input,
        {
          new: true,
          runValidators: true,
        }
      ).lean();

      if (!updatedProduct) {
        throw new Error('Product not found');
      }

      return updatedProduct;
    },

  deleteProduct: async (_parent, { id }) => {
    const deletedProduct = await ProductModel.findByIdAndDelete(id).lean();

    if (!deletedProduct) {
      throw new Error('Product not found');
    }

    return true;
  }
  },
};



