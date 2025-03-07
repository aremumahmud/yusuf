# API Testing Documentation

This directory contains test files for the Art Portfolio API using Jest and Supertest.

## Test Structure

- `setup.js`: Configuration for the test environment including MongoDB in-memory server
- `images.test.js`: Tests for Image API endpoints
- `projects.test.js`: Tests for Project API endpoints

## Running Tests

To run all tests:

```bash
npm test
```

To run a specific test file:

```bash
npm test -- tests/images.test.js
```

To run tests with coverage report:

```bash
npm test -- --coverage
```

## What's Being Tested

### Image API Endpoints

1. **GET /api/images**
   - Returns all images
   - Returns empty array when no images exist

2. **GET /api/images/:id**
   - Returns a single image by ID
   - Returns 404 for non-existent IDs
   - Returns 500 for invalid ID format

3. **POST /api/images**
   - Creates a new image
   - Validates required fields

4. **PUT /api/images/:id**
   - Updates an existing image
   - Returns 404 for non-existent IDs
   - Validates the update data

5. **DELETE /api/images/:id**
   - Deletes an existing image
   - Returns 404 for non-existent IDs

### Project API Endpoints

1. **GET /api/projects**
   - Returns all projects
   - Returns empty array when no projects exist

2. **GET /api/projects/:id**
   - Returns a single project by ID
   - Returns 404 for non-existent IDs
   - Returns 500 for invalid ID format

3. **POST /api/projects**
   - Creates a new project
   - Validates required fields

4. **PUT /api/projects/:id**
   - Updates an existing project
   - Returns 404 for non-existent IDs
   - Validates the update data

5. **DELETE /api/projects/:id**
   - Deletes an existing project
   - Returns 404 for non-existent IDs

## Test Environment

The tests use:

- **Jest**: JavaScript testing framework
- **Supertest**: HTTP assertions library
- **MongoDB Memory Server**: In-memory MongoDB server for testing

Tests are run in isolation using the in-memory database, so they don't affect your actual development or production databases.

## Adding New Tests

When adding new endpoints or modifying existing ones, please update or add tests following the same patterns used in the existing test files:

1. Create a descriptive test block using `describe()`
2. Set up any necessary test data
3. Write individual test cases using `it()`
4. Clean up after tests (the setup automatically cleans the database between tests)

Example:

```javascript
describe('Example new endpoint', () => {
  // Setup test data if needed
  beforeEach(async () => {
    // ...
  });

  it('should do something specific', async () => {
    const res = await request.get('/api/example');
    expect(res.status).toBe(200);
    // More assertions...
  });
}); 