const request = require('supertest');
const express = require('express');
const app = express();
const productController = require('./controllers/categoryController.js'); // Replace with the actual path to your controller file

// Mock the productModel and its methods
jest.mock('./models/productModel', () => ({
  find: jest.fn(),
}));

// Mock the Express route
app.get('/products', productController.getProductController);

describe('getProductController', () => {
  it('should return a list of products', async () => {
    const mockProducts = [
      // Replace with your mock product data
      { name: 'Product 1', category: 'Category 1', createdAt: new Date() },
      { name: 'Product 2', category: 'Category 2', createdAt: new Date() },
    ];

    // Mock the find method of productModel to return the mock products
    productModel.find.mockResolvedValue(mockProducts);

    const response = await request(app).get('/products');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('All Products');
    expect(response.body.products).toEqual(mockProducts);
  });

  it('should handle errors', async () => {
    // Mock the find method of productModel to throw an error
    productModel.find.mockRejectedValue(new Error('Mocked error'));

    const response = await request(app).get('/products');

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Error in getting products');
    expect(response.body.error).toBe('Mocked error');
  });
});
