## QUERIES

### Hämta alla produkter
QUERY:

query Query {
  products {
    name
    amountInStock
    category
    description
    price
    sku
    manufacturer {
      name
      description
      country
      address
      website
      contact {
        name
        email
        phone
      }
    }
    createdAt
    updatedAt
  }
}

### Hämta produkt med specifikt id
QUERY:

query Product($productId: ID!) {
  product(id: $productId) {
    name
    sku
    price
    amountInStock
    category
    description
    manufacturer {
      name
      description
      country
      address
      website
      contact {
        name
        email
        phone
      }
    }
    createdAt
    updatedAt
  }
}

VARIABLES:

{
  "productId": "68bd9cfaf882c81b7a205845"
}

### Totala lagervärdet
QUERY:

query Product {
  totalStockValue
}

### Lagervärde per tillverkare
QUERY:

query TotalStockValueByManufacturer {
  totalStockValueByManufacturer {
    manufacturerName
    totalValue
  }
}

### Produkter med mindre än 10 enheter i lager
QUERY:

query LowStockProducts {
  lowStockProducts {
    name
    amountInStock
    sku
    manufacturer {
      name
      contact {
        name
        email
        phone
      }
    }
  }
}

### Kritiskt lågt lager ( mindre än 5 enheter i lager)
QUERY:

query LowStockProducts {
  criticalStockProducts {
    productName
    amountInStock
    manufacturer
    contact {
      name
      phone
      email
    }
  }
}

### Alla tillverkare
QUERY:

query LowStockProducts {
  manufacturers {
    name
    description
    country
    address
    website
    contact {
      name
      email
      phone
    }
  }
}

## MUTATIONS

### Lägg till ny produkt
MUTATION:

mutation Mutation($input: ProductInput!) {
  addProduct(input: $input) {
    name
    sku
    price
    amountInStock
    manufacturer {
      name
    }
  }
}

VARIABLES:

{
  "input": {
    "name": "iPhone 15 Pro",
    "sku": "IPHONE15PRO",
    "description": "Latest Apple smartphone",
    "price": 12999,
    "category": "Electronics",
    "amountInStock": 25,
    "manufacturer": {
      "name": "Apple Inc.",
      "country": "USA",
      "website": "https://apple.com",
      "description": "Technology company",
      "address": "One Apple Park Way, Cupertino, CA",
      "contact": {
        "name": "Tim Cook",
        "email": "tim.cook@apple.com",
        "phone": "+1-408-996-1010"
      }
    }
  }
}

### Uppdatera produkt
MUTATION:

mutation UpdateProduct($updateProductId: ID!, $input: ProductUpdateInput!) {
  updateProduct(id: $updateProductId, input: $input) {
    name
    sku
    amountInStock
    description
    price
  }
}

VARIABLES:

{
  "updateProductId": "68d3bab3e2a392ac93776aca",
  "input": {
    "price": 13999
  }
}

### Radera produkt
MUTATION:

mutation DeleteProduct($deleteProductId: ID!) {
  deleteProduct(id: $deleteProductId)
}

VARIABLES:

{
  "deleteProductId": "68cfc260704441ce110d0e7f"
}
