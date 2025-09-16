import express from "express";
const router = express.Router();
import { findProducts, createProduct, findProductById, uppdateProductById, deleteProductById, getTotalStockValue, getTotalStockValueByManufacturer, getLowStock, getCriticalStock, getManufacturers} from "../db/productCrud.js";

// GET /products
router.get("/", async (req, res) => {
    const products = await findProducts();
    res.json(products);
});

// GET /api/products/total-stock-value
router.get("/total-stock-value", async (req, res) => {
  try {
    const total = await getTotalStockValue();
    res.json({ totalStockValue: total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/total-stock-value-by-manufacturer
router.get("/total-stock-value-by-manufacturer", async (req, res) => {
  try {
    const data = await getTotalStockValueByManufacturer();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/low-stock
router.get("/low-stock", async (req, res) => {
  try {
    const items = await getLowStock();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/critical-stock
router.get("/critical-stock", async (req, res) => {
  try {
    const items = await getCriticalStock();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/manufacturers
router.get("/manufacturers", async (req, res) => {
  try {
    const m = await getManufacturers();
    res.json(m);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /product
router.post("/", async (req, res) => {
    try {
        const createdProduct = await createProduct(req.body);
        res.status(201).json(createdProduct);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ error: "SKU must be unique" });
        }
        res
            .status(400)
            .json({ error: "Validation error", details: err.message });
    }
});

// GET product med id
router.get("/:id", async (req, res) => {

    try {
        const product = await findProductById(req.params.id);

        if (!product) {
            return res.status(404).json({ error: "product not found" });
        }
        return res.json(product);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

// uppdate product med id
router.put("/:id", async (req, res) => {
    try {
        const updatedProduct = await uppdateProductById(req.params.id, req.body);

        if (!updatedProduct) {
            return res.status(404).json({ error: "product not found" });
        }

        return res.json(updatedProduct);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                error: "Validation error",
                details: error.message
            });
        }
        if (error.code === 11000) {
            return res.status(409).json({ error: "SKU must be unique" });
        }
        return res.status(500).json({ error: error.message });
    }
});

// Delete product med id
router.delete("/:id", async (req, res) => {
    try {
        const deleteproduct = await deleteProductById(req.params.id);

        if (!deleteproduct) {
            return res.status(404).json({ error: "product not found" });
        }
        return res.json(deleteproduct);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

export default router;