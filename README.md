# Art Portfolio API

A RESTful API for managing art portfolio data including images and projects.

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/art-portfolio
   ```
4. Start the server:
   ```
   npm start
   ```
   For development with auto-reload:
   ```
   npm run dev
   ```

## API Endpoints

### Images

- **GET /api/images** - Get all images
- **GET /api/images/:id** - Get a single image by ID
- **POST /api/images** - Create a new image
- **PUT /api/images/:id** - Update an image
- **DELETE /api/images/:id** - Delete an image

#### Image Schema
```javascript
{
  title: String, // required
  artist: String, // required
  year: Number,
  medium: String,
  dimensions: String,
  category: String,
  description: String,
  tags: [String],
  image_url: String, // required
  createdAt: Date,
  updatedAt: Date
}
```

### Projects

- **GET /api/projects** - Get all projects
- **GET /api/projects/:id** - Get a single project by ID
- **POST /api/projects** - Create a new project
- **PUT /api/projects/:id** - Update a project
- **DELETE /api/projects/:id** - Delete a project

#### Project Schema
```javascript
{
  title: String, // required
  title_description: String, // required
  tags: [String],
  cover_image: String, // required
  image_urls: [String],
  video_url: String,
  techniques: [String],
  software_used: [String],
  description: String, // required
  createdAt: Date,
  updatedAt: Date
}
```

## Sample Requests

### Create a new image

```bash
curl -X POST http://localhost:5000/api/images \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Starry Night",
    "artist": "Vincent van Gogh",
    "year": 1889,
    "medium": "Oil on canvas",
    "dimensions": "73.7 cm × 92.1 cm",
    "category": "Post-Impressionism",
    "description": "The Starry Night is an oil on canvas painting by Dutch Post-Impressionist painter Vincent van Gogh.",
    "tags": ["post-impressionism", "night", "stars"],
    "image_url": "https://example.com/starry-night.jpg"
  }'
```

### Create a new project

```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Digital Landscape Series",
    "title_description": "A collection of digital landscapes",
    "tags": ["digital", "landscape", "3D"],
    "cover_image": "https://example.com/landscape-cover.jpg",
    "image_urls": [
      "https://example.com/landscape1.jpg",
      "https://example.com/landscape2.jpg"
    ],
    "video_url": "https://example.com/landscape-video.mp4",
    "techniques": ["digital painting", "3D modeling"],
    "software_used": ["Blender", "Photoshop"],
    "description": "A series of digital landscapes exploring the intersection of natural and digital worlds."
  }'
``` #   y u s u f  
 