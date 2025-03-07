# Art Portfolio API - Frontend Integration Guide

This document provides detailed information for frontend engineers integrating with the Art Portfolio API.

## Base URL

```
http://localhost:5000/api
```

For production, this will be replaced with your production URL.

## API Overview

This API provides endpoints to manage two main resources:
- **Images**: Artwork images with metadata
- **Projects**: Portfolio projects with associated resources

All endpoints accept and return JSON data. All responses include appropriate HTTP status codes.

## Authentication

Currently, the API does not implement authentication. This will be added in future versions.

## Image Endpoints

### 1. Get All Images

Retrieves a list of all images ordered by creation date (newest first).

**Endpoint:** `GET /api/images`

**Response:** 
- Status: `200 OK`
- Content-Type: `application/json`

**Example Response:**
```json
[
  {
    "_id": "60d21b4667d0d8992e610c85",
    "title": "Starry Night",
    "artist": "Vincent van Gogh",
    "year": 1889,
    "medium": "Oil on canvas",
    "dimensions": "73.7 cm × 92.1 cm",
    "category": "Post-Impressionism",
    "description": "The Starry Night is an oil on canvas painting by Dutch Post-Impressionist painter Vincent van Gogh.",
    "tags": ["post-impressionism", "night", "stars"],
    "image_url": "https://example.com/starry-night.jpg",
    "createdAt": "2023-08-01T18:31:42.338Z",
    "updatedAt": "2023-08-01T18:31:42.338Z"
  },
  {
    "_id": "60d21b4667d0d8992e610c86",
    "title": "The Persistence of Memory",
    "artist": "Salvador Dalí",
    "year": 1931,
    "medium": "Oil on canvas",
    "dimensions": "24 cm × 33 cm",
    "category": "Surrealism",
    "description": "The Persistence of Memory is a 1931 painting by artist Salvador Dalí.",
    "tags": ["surrealism", "time", "melting clocks"],
    "image_url": "https://example.com/persistence-memory.jpg",
    "createdAt": "2023-08-01T18:35:12.338Z",
    "updatedAt": "2023-08-01T18:35:12.338Z"
  }
]
```

**Frontend Implementation Notes:**
- This endpoint is suitable for gallery views or lists of artwork
- The data returns an array, even if empty
- The `_id` field should be used as a unique key when rendering lists

### 2. Get Single Image

Retrieves detailed information about a specific image.

**Endpoint:** `GET /api/images/:id`

**Parameters:**
- `id`: MongoDB ObjectId of the image

**Response:**
- Status: `200 OK` if found
- Status: `404 Not Found` if no image with the specified ID exists
- Content-Type: `application/json`

**Example Response (200):**
```json
{
  "_id": "60d21b4667d0d8992e610c85",
  "title": "Starry Night",
  "artist": "Vincent van Gogh",
  "year": 1889,
  "medium": "Oil on canvas",
  "dimensions": "73.7 cm × 92.1 cm",
  "category": "Post-Impressionism",
  "description": "The Starry Night is an oil on canvas painting by Dutch Post-Impressionist painter Vincent van Gogh.",
  "tags": ["post-impressionism", "night", "stars"],
  "image_url": "https://example.com/starry-night.jpg",
  "createdAt": "2023-08-01T18:31:42.338Z",
  "updatedAt": "2023-08-01T18:31:42.338Z"
}
```

**Example Response (404):**
```json
{
  "message": "Image not found"
}
```

**Frontend Implementation Notes:**
- Useful for detail pages or modal views
- Always handle the 404 case in your UI
- The `image_url` field contains the URL to display the artwork

### 3. Create New Image

Creates a new image record in the database.

**Endpoint:** `POST /api/images`

**Request Body:**
```json
{
  "title": "The Scream",
  "artist": "Edvard Munch",
  "year": 1893,
  "medium": "Oil, tempera, pastel and crayon on cardboard",
  "dimensions": "91 cm × 73.5 cm",
  "category": "Expressionism",
  "description": "The Scream is the popular name given to a composition created by Norwegian Expressionist artist Edvard Munch in 1893.",
  "tags": ["expressionism", "anxiety", "modern art"],
  "image_url": "https://example.com/the-scream.jpg"
}
```

**Required fields:** `title`, `artist`, `image_url`

**Response:**
- Status: `201 Created` on success
- Status: `400 Bad Request` if validation fails
- Content-Type: `application/json`

**Example Success Response (201):**
```json
{
  "_id": "60d21b4667d0d8992e610c87",
  "title": "The Scream",
  "artist": "Edvard Munch",
  "year": 1893,
  "medium": "Oil, tempera, pastel and crayon on cardboard",
  "dimensions": "91 cm × 73.5 cm",
  "category": "Expressionism",
  "description": "The Scream is the popular name given to a composition created by Norwegian Expressionist artist Edvard Munch in 1893.",
  "tags": ["expressionism", "anxiety", "modern art"],
  "image_url": "https://example.com/the-scream.jpg",
  "createdAt": "2023-08-01T19:12:22.338Z",
  "updatedAt": "2023-08-01T19:12:22.338Z"
}
```

**Example Error Response (400):**
```json
{
  "message": "Error creating image",
  "error": "Image validation failed: title: Path `title` is required., artist: Path `artist` is required."
}
```

**Frontend Implementation Notes:**
- Use this endpoint for image upload forms
- Validate required fields on the frontend before submission
- The server returns the complete created image object with MongoDB ID, useful for immediate display or navigation

### 4. Update Image

Updates an existing image with new information.

**Endpoint:** `PUT /api/images/:id`

**Parameters:**
- `id`: MongoDB ObjectId of the image to update

**Request Body:**
Include only the fields you want to update. For example:
```json
{
  "year": 1892,
  "description": "Updated description for The Scream artwork."
}
```

**Response:**
- Status: `200 OK` if updated successfully
- Status: `404 Not Found` if no image with the specified ID exists
- Status: `400 Bad Request` if validation fails
- Content-Type: `application/json`

**Example Success Response (200):**
```json
{
  "_id": "60d21b4667d0d8992e610c87",
  "title": "The Scream",
  "artist": "Edvard Munch",
  "year": 1892,
  "medium": "Oil, tempera, pastel and crayon on cardboard",
  "dimensions": "91 cm × 73.5 cm",
  "category": "Expressionism",
  "description": "Updated description for The Scream artwork.",
  "tags": ["expressionism", "anxiety", "modern art"],
  "image_url": "https://example.com/the-scream.jpg",
  "createdAt": "2023-08-01T19:12:22.338Z",
  "updatedAt": "2023-08-01T19:15:47.123Z"
}
```

**Frontend Implementation Notes:**
- The response includes the entire updated document
- Only send the fields that need to be updated
- Note that `updatedAt` will be automatically updated to the current time

### 5. Delete Image

Removes an image from the database.

**Endpoint:** `DELETE /api/images/:id`

**Parameters:**
- `id`: MongoDB ObjectId of the image to delete

**Response:**
- Status: `200 OK` if deleted successfully
- Status: `404 Not Found` if no image with the specified ID exists
- Content-Type: `application/json`

**Example Success Response (200):**
```json
{
  "message": "Image deleted successfully"
}
```

**Example Error Response (404):**
```json
{
  "message": "Image not found"
}
```

**Frontend Implementation Notes:**
- Refresh your image list after successful deletion
- Consider implementing a confirmation dialog before calling this endpoint
- This operation cannot be undone

## Project Endpoints

### 1. Get All Projects

Retrieves a list of all projects ordered by creation date (newest first).

**Endpoint:** `GET /api/projects`

**Response:**
- Status: `200 OK`
- Content-Type: `application/json`

**Example Response:**
```json
[
  {
    "_id": "60d21b4667d0d8992e610c90",
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
    "description": "A series of digital landscapes exploring the intersection of natural and digital worlds.",
    "createdAt": "2023-08-01T18:31:42.338Z",
    "updatedAt": "2023-08-01T18:31:42.338Z"
  },
  {
    "_id": "60d21b4667d0d8992e610c91",
    "title": "Abstract Portrait Collection",
    "title_description": "Exploring human identity through abstraction",
    "tags": ["portrait", "abstract", "mixed media"],
    "cover_image": "https://example.com/portrait-cover.jpg",
    "image_urls": [
      "https://example.com/portrait1.jpg",
      "https://example.com/portrait2.jpg",
      "https://example.com/portrait3.jpg"
    ],
    "techniques": ["collage", "digital manipulation"],
    "software_used": ["Photoshop", "Illustrator"],
    "description": "A series exploring human identity through abstract portraiture and mixed media techniques.",
    "createdAt": "2023-08-01T19:12:22.338Z",
    "updatedAt": "2023-08-01T19:12:22.338Z"
  }
]
```

### 2. Get Single Project

Retrieves detailed information about a specific project.

**Endpoint:** `GET /api/projects/:id`

**Parameters:**
- `id`: MongoDB ObjectId of the project

**Response:**
- Status: `200 OK` if found
- Status: `404 Not Found` if no project with the specified ID exists
- Content-Type: `application/json`

**Example Response (200):**
```json
{
  "_id": "60d21b4667d0d8992e610c90",
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
  "description": "A series of digital landscapes exploring the intersection of natural and digital worlds.",
  "createdAt": "2023-08-01T18:31:42.338Z",
  "updatedAt": "2023-08-01T18:31:42.338Z"
}
```

### 3. Create New Project

Creates a new project record in the database.

**Endpoint:** `POST /api/projects`

**Request Body:**
```json
{
  "title": "Urban Sketches",
  "title_description": "Quick drawings of city life",
  "tags": ["urban", "sketch", "city", "pen"],
  "cover_image": "https://example.com/urban-cover.jpg",
  "image_urls": [
    "https://example.com/urban1.jpg",
    "https://example.com/urban2.jpg",
    "https://example.com/urban3.jpg"
  ],
  "techniques": ["pen and ink", "watercolor wash"],
  "software_used": [],
  "description": "A series of quick sketches capturing moments of urban life and architecture."
}
```

**Required fields:** `title`, `title_description`, `cover_image`, `description`

**Response:**
- Status: `201 Created` on success
- Status: `400 Bad Request` if validation fails
- Content-Type: `application/json`

**Example Success Response (201):**
```json
{
  "_id": "60d21b4667d0d8992e610c92",
  "title": "Urban Sketches",
  "title_description": "Quick drawings of city life",
  "tags": ["urban", "sketch", "city", "pen"],
  "cover_image": "https://example.com/urban-cover.jpg",
  "image_urls": [
    "https://example.com/urban1.jpg",
    "https://example.com/urban2.jpg",
    "https://example.com/urban3.jpg"
  ],
  "techniques": ["pen and ink", "watercolor wash"],
  "software_used": [],
  "description": "A series of quick sketches capturing moments of urban life and architecture.",
  "createdAt": "2023-08-01T20:45:12.338Z",
  "updatedAt": "2023-08-01T20:45:12.338Z"
}
```

### 4. Update Project

Updates an existing project with new information.

**Endpoint:** `PUT /api/projects/:id`

**Parameters:**
- `id`: MongoDB ObjectId of the project to update

**Request Body:**
Include only the fields you want to update. For example:
```json
{
  "title_description": "Urban scenes from global cities",
  "image_urls": [
    "https://example.com/urban1.jpg",
    "https://example.com/urban2.jpg",
    "https://example.com/urban3.jpg",
    "https://example.com/urban4.jpg"
  ]
}
```

**Response:**
- Status: `200 OK` if updated successfully
- Status: `404 Not Found` if no project with the specified ID exists
- Status: `400 Bad Request` if validation fails
- Content-Type: `application/json`

### 5. Delete Project

Removes a project from the database.

**Endpoint:** `DELETE /api/projects/:id`

**Parameters:**
- `id`: MongoDB ObjectId of the project to delete

**Response:**
- Status: `200 OK` if deleted successfully
- Status: `404 Not Found` if no project with the specified ID exists
- Content-Type: `application/json`

**Example Success Response (200):**
```json
{
  "message": "Project deleted successfully"
}
```

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200 OK`: Request succeeded
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request format or validation error
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server-side error

Error responses always include a message and may include error details.

## Frontend Integration Examples

### React Example: Fetching All Images

```jsx
import { useState, useEffect } from 'react';

function ImageGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/images');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setImages(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch images: ' + error.message);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="image-gallery">
      <h1>Art Gallery</h1>
      <div className="gallery-grid">
        {images.map(image => (
          <div key={image._id} className="gallery-item">
            <img src={image.image_url} alt={image.title} />
            <h3>{image.title}</h3>
            <p>by {image.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### React Example: Creating a New Project

```jsx
import { useState } from 'react';

function ProjectForm() {
  const [formData, setFormData] = useState({
    title: '',
    title_description: '',
    tags: [],
    cover_image: '',
    image_urls: [],
    techniques: [],
    software_used: [],
    description: ''
  });
  
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleArrayInput = (e) => {
    const { name, value } = e.target;
    // Split by commas and trim whitespace
    const arrayValue = value.split(',').map(item => item.trim());
    setFormData({
      ...formData,
      [name]: arrayValue
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create project');
      }
      
      setMessage('Project created successfully!');
      // Reset form or redirect
      
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="project-form">
      <h2>Create New Project</h2>
      
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="title_description">Title Description *</label>
          <input 
            type="text" 
            id="title_description" 
            name="title_description" 
            value={formData.title_description} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="tags">Tags (comma separated)</label>
          <input 
            type="text" 
            id="tags" 
            name="tags" 
            value={formData.tags.join(', ')} 
            onChange={handleArrayInput} 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="cover_image">Cover Image URL *</label>
          <input 
            type="text" 
            id="cover_image" 
            name="cover_image" 
            value={formData.cover_image} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="image_urls">Image URLs (comma separated)</label>
          <textarea 
            id="image_urls" 
            name="image_urls" 
            value={formData.image_urls.join(', ')} 
            onChange={handleArrayInput} 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea 
            id="description" 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <button type="submit" className="submit-button">Create Project</button>
      </form>
    </div>
  );
}
```

## Common Frontend Tasks

### 1. Filtering Images by Tag

The API doesn't currently support direct filtering, so filtering should be done client-side:

```javascript
const filteredImages = images.filter(image => 
  image.tags.includes(selectedTag)
);
```

### 2. Displaying a Project with its Images

```jsx
function ProjectDetail({ projectId }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/projects/${projectId}`);
        if (!response.ok) {
          throw new Error('Project not found');
        }
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProject();
  }, [projectId]);
  
  if (loading) return <div>Loading...</div>;
  if (!project) return <div>Project not found</div>;
  
  return (
    <div className="project-detail">
      <h1>{project.title}</h1>
      <p className="project-subtitle">{project.title_description}</p>
      
      <div className="cover-image">
        <img src={project.cover_image} alt={project.title} />
      </div>
      
      <div className="project-description">
        {project.description}
      </div>
      
      {project.tags.length > 0 && (
        <div className="project-tags">
          <h3>Tags</h3>
          <div className="tags-list">
            {project.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      )}
      
      {project.image_urls.length > 0 && (
        <div className="project-gallery">
          <h3>Project Gallery</h3>
          <div className="gallery-grid">
            {project.image_urls.map((url, index) => (
              <div key={index} className="gallery-item">
                <img src={url} alt={`${project.title} - Image ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      )}
      
      {project.video_url && (
        <div className="project-video">
          <h3>Project Video</h3>
          <video controls>
            <source src={project.video_url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}
```

## Tips for Optimal Integration

1. **Error Handling**: Always implement proper error handling for API requests.

2. **Loading States**: Show loading indicators during API calls.

3. **Optimistic Updates**: For better UX, update the UI optimistically before the API call completes.

4. **Request Batching**: Batch multiple requests together when possible to reduce network traffic.

5. **Data Caching**: Cache API responses for frequently accessed data.

6. **Form Validation**: Validate form inputs before sending to avoid unnecessary API calls.

7. **Response Validation**: Always validate API responses before using the data.

8. **Consistent Error Display**: Use a consistent approach to display error messages.

## Troubleshooting

### Common Issues and Solutions

1. **CORS Errors**: If you receive CORS errors, ensure your frontend is running on an allowed origin. The API has CORS enabled but may need additional configuration for specific production environments.

2. **404 Errors**: Verify that you're using the correct ID format (MongoDB ObjectId) for individual resource requests.

3. **Validation Errors**: If you receive 400 errors, double-check that all required fields are included and formatted correctly.

4. **Empty Responses**: If you get an empty array from a GET endpoint, it may simply mean no records exist yet. This is not an error condition.

## API Status and Changes

The API currently runs on version 1.0.0. Check the main repository for updates and version changes that might affect your integration. 