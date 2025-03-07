// tests/setup.js
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const request = require("supertest");
const app = require("../index");

let mongoServer;

// Connect to the in-memory database before tests
beforeAll(async() => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

// Clear all data between tests
afterEach(async() => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
});

// Disconnect and close the in-memory database after tests
afterAll(async() => {
    await mongoose.connection.close();
    if (mongoServer) {
        await mongoServer.stop();
    }
});

// Export request with the app for easier testing
module.exports = {
    request: request(app),
};