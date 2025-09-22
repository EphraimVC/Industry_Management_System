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

    type CriticalProduct {
        productName: String!
        amountInStock: Int!
        manufacturer: String
        contact: Contact
    }
    type Query {
        products: [Product!]!
        product(id: ID!): Product
        totalStockValue: Float!
        totalStockValueByManufacturer: [ManufacturerStockValue!]!
        lowStockProducts: [Product!]!
        manufacturers: [Manufacturer!]!
        criticalStockProducts: [CriticalProduct!]!
    }

    type ManufacturerStockValue {
        manufacturerName: String!
        totalValue: Float!
    }

    #  mutation types
    input ContactInput {
        name: String!
        email: String!
        phone: String!
    }

    input ManufacturerInput {
        name: String!
        country: String
        website: String
        description: String
        address: String
        contact: ContactInput!
    }

    # Full input, används vid create
    input ProductInput {
        name: String!
        sku: String!
        description: String
        price: Int!
        category: String
        manufacturer: ManufacturerInput!
        amountInStock: Int!
    }

    # Update-input, alla fält optional
    input ProductUpdateInput {
        name: String
        sku: String
        description: String
        price: Int
        category: String
        manufacturer: ManufacturerInput
        amountInStock: Int
    }

    type Mutation {
        addProduct(input: ProductInput!): Product
        updateProduct(id: ID!, input: ProductUpdateInput!): Product
        deleteProduct(id: ID!): Boolean!
    }
`;
