import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name:      { type: String, required: true, trim: true },
  email:     { type: String, required: true, lowercase: true, trim: true },
  phone:     { type: String, required: true, trim: true }
}, { _id: false });

const manufacturerSchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  country:     { type: String, trim: true },
  website:     { type: String, trim: true },
  description: { type: String, trim: true },
  address:     { type: String, trim: true },
  contact:     { type: contactSchema, required: true }
}, { _id: false });

const productSchema = new mongoose.Schema({
  name:          { type: String, required: true, trim: true, unique: true },
  sku:           { type: String, required: true, unique: true, uppercase: true, trim: true },
  description:   { type: String, trim: true },
  price:         { type: Number, required: true, min: 0 },
  category:      { type: String, trim: true },
  manufacturer:  { type: manufacturerSchema, required: true },
  amountInStock: { type: Number, required: true, min: 0, default: 0 }
}, { timestamps: true });

export const ProductModel = mongoose.model("Product", productSchema);
