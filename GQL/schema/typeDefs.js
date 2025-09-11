export const typeDefs = /* GraphQL */ `
    type Contact {
        name: String!
        email: String!
        phone: String!
    }

    type Manufacturer {
        name: String!
        country: String
        website: String
        description: String
        address: String
        contact: Contact
    }

    type Product {
        name: String!
        sku: String!
        description: String
        price: Int!
        category: String
        manufacturer: Manufacturer
        amountInStock: Int!
        createdAt: String!
        updatedAt: String!
    }
    type Query {
        products: [Product!]!
        product(id: ID!): Product
        totalStockValue: float!
        totalStockValueByManufacturer: [ManufacturerStockValue!]!
        LowStockProducts: [Product!]!
        manufacturers: [Manufacturer!]!
        criticalStockProducts (inStock:amountInStock, ):
    }

    type ManufacturerStockValue {
        manufacturerName: String!
        totalValue: Float!
    }
`;
