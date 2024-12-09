# **GridFS-Based E-Commerce Platform**

This project is a simple e-commerce platform that demonstrates how to upload, store, and retrieve product images and metadata using **MongoDB GridFS**. It features a backend built with **Node.js** and **Express**, and a frontend built with **React**.

---

## **Features**

- **Image Upload**: Users can upload product images, which are stored in MongoDB GridFS.
- **Metadata Storage**: Product metadata (name, price, category) is stored in a MongoDB collection.
- **Dynamic Product Retrieval**: Products and their images are dynamically fetched and displayed on the frontend.
- **File Streaming**: Images are served via API using GridFS streams.

---

## **Technologies Used**

### Backend:
- Node.js
- Express
- MongoDB (GridFS)
- Mongoose
- Multer (for file uploads)
- Multer-GridFS-Storage

### Frontend:
- React
- Axios (for API calls)
- HTML/CSS for styling

---

## **Project Structure**

```
project-root/
├── models/
│   ├── Product.js           <-- Mongoose schema for product metadata
├── public/                  <-- Public assets (if needed)
├── src/
│   ├── api.js               <-- Axios API service for backend communication
│   ├── components/
│   │   ├── HomeScreen.jsx   <-- Main screen to display products
│   ├── styles.css           <-- Basic styling for the app
├── server.js                <-- Main backend file
├── package.json             <-- Node.js project configuration
├── uploads/                 <-- Uploads folder (if not using GridFS for all files)
```

---

## **Setup Instructions**

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

### **2. Install Dependencies**

#### Backend:
```bash
npm install express mongoose multer multer-gridfs-storage gridfs-stream body-parser
```

#### Frontend:
```bash
npm install axios
```

---

### **3. Run the Backend**
Ensure MongoDB is running on your system, then start the backend server:

```bash
node server.js
```

The server will run on `http://localhost:5000`.

---

### **4. Run the Frontend**
Start the React development server:

```bash
npm start
```

The app will be accessible at `http://localhost:3000`.

---

## **Backend API Endpoints**

### **1. Upload a File and Metadata**
- **Endpoint**: `POST /upload`
- **Payload**: Form data
  - `file`: The product image file
  - `name`: Product name
  - `price`: Product price
  - `category`: Product category

- **Response**:
```json
{
  "message": "File and metadata uploaded successfully",
  "product": {
    "_id": "6392cb4f9a6b293f8d7a4c1d",
    "name": "Laptop",
    "price": 5199,
    "category": "Electronics",
    "fileId": "6392cb4f9a6b293f8d7a4c1c"
  }
}
```

---

### **2. Fetch All Products**
- **Endpoint**: `GET /products`
- **Response**:
```json
[
  {
    "_id": "6392cb4f9a6b293f8d7a4c1d",
    "name": "Laptop",
    "price": 5199,
    "category": "Electronics",
    "fileId": {
      "_id": "6392cb4f9a6b293f8d7a4c1c",
      "filename": "1670575615-laptop.png",
      "contentType": "image/png"
    }
  }
]
```

---

### **3. Fetch a File by ID**
- **Endpoint**: `GET /file/:id`
- **Response**: Streams the requested file if available.

---

## **Frontend Integration**
The frontend dynamically fetches product data from the backend and displays it. Images are loaded using the `/file/:id` endpoint.

### Key Components:
- **`HomeScreen`**: Displays all products in a grid layout.
- **`api.js`**: Handles API calls to the backend.

---

## **Future Enhancements**
- **Pagination**: Fetch products in pages for better performance.
- **Search/Filter**: Allow users to search or filter products.
- **Cart Functionality**: Add/remove products and checkout.
- **Authentication**: Secure endpoints and add user roles.

---

## **Contributing**
Feel free to fork the repository and submit pull requests for any improvements.

---

## **License**
This project is licensed under the MIT License.
