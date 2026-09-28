# 🏡 Wanderlust — Airbnb Clone

<p align="center">
  <b>A full-stack Airbnb-inspired property rental platform built with Node.js, Express.js, MongoDB, and EJS.</b>
</p>

<p align="center">
  <a href="https://wanderlust-kglm.onrender.com">🚀 Live Demo</a>
  •
  <a href="https://github.com/khem819">💻 GitHub</a>
</p>

---

## 🌐 Live Demo

### 🚀 [Visit Wanderlust](https://wanderlust-kglm.onrender.com)

Explore the deployed application and try features such as:

* 🏠 Browse property listings
* 🔍 Explore individual properties
* ➕ Create listings
* ✏️ Edit and manage your listings
* ⭐ Add and manage reviews
* 🔐 Signup / Login / Logout
* 🗺️ View property locations on an interactive map
* ☁️ Upload listing images

> **Note:** The application is deployed on Render and may take a few seconds to wake up if it has been inactive.

---

## 📌 About The Project

**Wanderlust** is a full-stack Airbnb-style web application developed as a learning and portfolio project, inspired by the Airbnb project taught in the **Apna College Delta Batch**.

The application demonstrates how a real-world web platform can be structured using **MVC architecture**, authentication, authorization, RESTful routing, database operations, image storage, maps, validation, and deployment.

### 🎯 Main Goal

The project was built to gain practical experience with:

`Frontend → Backend → Database → Authentication → APIs → Cloud Services → Deployment`

---

# ✨ Features

## 👤 Authentication & Authorization

* 🔐 User signup
* 🔑 User login/logout
* 🍪 Session-based authentication
* 🛡️ Protected routes
* 👑 Listing-owner authorization
* ✍️ Review-author authorization
* 🔒 Secure session storage using MongoDB

---

## 🏠 Property Listings

Users can:

* 📋 View all available listings
* 🔎 View individual listing details
* ➕ Create new listings
* ✏️ Edit their own listings
* 🗑️ Delete their own listings
* 🖼️ Upload property images
* 📍 Store property location
* 🌎 Store country information
* 💰 Set property prices
* 📝 Add descriptions

---

## ⭐ Reviews

Users can:

* ⭐ Add reviews to listings
* 📖 View existing reviews
* 🗑️ Delete their own reviews
* ✅ Validate review data
* 🔐 Prevent unauthorized review deletion

---

## 🗺️ Map & Location

The application integrates **Mapbox** for location-based functionality.

Features include:

* 📍 Property location display
* 🌎 Location geocoding
* 🗺️ Interactive maps
* 🔎 Location-based visualization

---

## ☁️ Image Upload

Listing images are handled using:

* **Multer** → File upload handling
* **Cloudinary** → Cloud image storage

This allows uploaded property images to be stored externally rather than directly on the application server.

---

## 🎨 User Interface

Built using:

* EJS templates
* EJS-Mate layouts
* Responsive navigation
* Reusable components
* Flash messages
* Dynamic listing pages
* Interactive maps

---

## 🛡️ Validation & Error Handling

The application includes:

* `ExpressError` for custom errors
* `wrapAsync` for asynchronous error handling
* Joi schema validation
* Centralized error handling
* Authentication middleware
* Authorization middleware
* Protected CRUD operations

---

# 🏗️ System Architecture

```text
                         ┌──────────────────┐
                         │      USER        │
                         │   Web Browser    │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │      ROUTES      │
                         │ Express Router   │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │   MIDDLEWARE     │
                         │ Auth / Validation│
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │   CONTROLLERS    │
                         │ Business Logic   │
                         └───────┬───┬──────┘
                                 │   │
                    ┌────────────┘   └────────────┐
                    ▼                             ▼
           ┌──────────────────┐          ┌──────────────────┐
           │      MODELS      │          │       VIEWS      │
           │ Mongoose Schema  │          │ EJS Templates    │
           └────────┬─────────┘          └────────┬─────────┘
                    │                             │
                    ▼                             ▼
           ┌──────────────────┐          ┌──────────────────┐
           │     MongoDB      │          │     Browser      │
           │   Atlas Database │          │       UI         │
           └──────────────────┘          └──────────────────┘

                  External Services
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
     ┌──────────┐   ┌──────────┐   ┌──────────┐
     │Cloudinary│   │  Mapbox  │   │MongoStore│
     │  Images  │   │   Maps   │   │ Sessions │
     └──────────┘   └──────────┘   └──────────┘
```

---

# 🔄 Application Flow

```text
User
  │
  ▼
Browser
  │
  ▼
Express Routes
  │
  ▼
Middleware
  │
  ├── Authentication
  ├── Authorization
  ├── Validation
  └── Error Handling
  │
  ▼
Controllers
  │
  ├───────────────┐
  ▼               ▼
Models          Views
  │               │
  ▼               ▼
MongoDB          EJS
                  │
                  ▼
               Browser
```

---

# 🛠️ Tech Stack

| Technology             | Purpose                   |
| ---------------------- | ------------------------- |
| 🟢 **Node.js**         | JavaScript runtime        |
| 🚂 **Express.js**      | Backend web framework     |
| 🍃 **MongoDB**         | Database                  |
| 🔗 **Mongoose**        | MongoDB ODM               |
| 🎨 **EJS**             | Server-side templating    |
| 🧩 **EJS-Mate**        | EJS layout management     |
| 🔐 **Passport.js**     | Authentication            |
| 🍪 **express-session** | Session management        |
| 🗄️ **MongoStore**     | MongoDB session storage   |
| 📤 **Multer**          | File upload handling      |
| ☁️ **Cloudinary**      | Image storage             |
| 🗺️ **Mapbox**         | Maps & geocoding          |
| ✅ **Joi**              | Server-side validation    |
| 🔄 **Method-Override** | PUT/DELETE form requests  |
| 💬 **Connect-Flash**   | Flash messages            |
| 🎨 **JavaScript**      | Client-side functionality |

---

# 📂 Project Structure

```text
Wanderlust/
│
├── controllers/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── views/
│   ├── layouts/
│   ├── listings/
│   ├── users/
│   └── includes/
│
├── public/
│   ├── css/
│   └── js/
│
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── init/
│   └── index.js
│
├── app.js
├── middleware.js
├── schema.js
├── package.json
├── .gitignore
└── README.md
```

> Folder names may vary slightly depending on the current implementation.

---

# 🚀 Getting Started

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
```

Move into the project directory:

```bash
cd YOUR-REPOSITORY
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Configure Environment Variables

Create a `.env` file in the project root:

```env
ATLASDB=your_mongodb_connection_string

SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

MAP_TOKEN=your_mapbox_public_token
```

### ⚠️ Important

Never upload your `.env` file to GitHub.

Add the following to `.gitignore`:

```gitignore
.env
node_modules/
```

---

# 🗄️ MongoDB Atlas Setup

1. Create a MongoDB Atlas account.
2. Create a cluster.
3. Create a database user.
4. Configure Network Access.
5. Copy your MongoDB connection string.
6. Add it to `.env`.

Example:

```env
ATLASDB=mongodb+srv://username:password@cluster.mongodb.net/wanderlust
```

---

# ☁️ Cloudinary Setup

Create a Cloudinary account and obtain:

```env
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret
```

Cloudinary is used to store listing images.

---

# 🗺️ Mapbox Setup

Create a Mapbox account and generate a public access token.

Add it to:

```env
MAP_TOKEN=your_mapbox_token
```

The token is used for:

* Location geocoding
* Interactive maps
* Listing location display

---

# ▶️ Run Locally

Start the application:

```bash
npm start
```

Or, if the project uses Nodemon:

```bash
npm run dev
```

Open:

```text
http://localhost:8080
```

> If your `app.js` uses another port, open that port instead.

---

# 🌱 Sample Data

If the project contains the `init` folder and seed script, run:

```bash
node init/index.js
```

This can populate MongoDB with sample listings.

> Run the seed script only when you intentionally want to initialize or replace sample data according to your seed implementation.

---

# 🔐 Security

The application uses:

* 🔑 Environment variables for secrets
* 🔐 Authentication
* 🛡️ Authorization
* 🍪 Session-based authentication
* 🗄️ MongoDB session storage
* ✅ Server-side validation
* 🚧 Protected routes

### 🚫 Never commit:

```text
.env
API Keys
Cloudinary Secrets
MongoDB Passwords
Session Secrets
```

---

# 🧪 Main Routes

## 🏠 Listings

| Method | Route                | Purpose             |
| ------ | -------------------- | ------------------- |
| GET    | `/listings`          | View all listings   |
| GET    | `/listings/new`      | Create listing form |
| POST   | `/listings`          | Create listing      |
| GET    | `/listings/:id`      | View listing        |
| GET    | `/listings/:id/edit` | Edit listing form   |
| PUT    | `/listings/:id`      | Update listing      |
| DELETE | `/listings/:id`      | Delete listing      |

## 👤 Users

| Method | Route     | Purpose           |
| ------ | --------- | ----------------- |
| GET    | `/signup` | Signup page       |
| POST   | `/signup` | Create account    |
| GET    | `/login`  | Login page        |
| POST   | `/login`  | Authenticate user |
| GET    | `/logout` | Logout            |

## ⭐ Reviews

| Method | Route                             | Purpose       |
| ------ | --------------------------------- | ------------- |
| POST   | `/listings/:id/reviews`           | Add review    |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete review |

> Exact routes may vary depending on the current implementation.

---

# 📸 Screenshots

Add your project screenshots inside:

```text
screenshots/
├── home.png
├── listings.png
├── listing-details.png
├── login.png
├── signup.png
├── create-listing.png
└── map.png
```

Then display them in this section:

### 🏠 Home Page

![Home Page](screenshots/home.png)

### 🏡 Listing Details

![Listing Details](screenshots/listing-details.png)

### 🔐 Login

![Login](screenshots/login.png)

### ➕ Create Listing

![Create Listing](screenshots/create-listing.png)

### 🗺️ Map

![Map](screenshots/map.png)

---

# 🧠 What I Learned

Building this project helped me gain practical experience with:

### Backend Development

* Express.js
* REST APIs
* MVC architecture
* Middleware
* CRUD operations
* Error handling

### Database

* MongoDB
* MongoDB Atlas
* Mongoose
* Schema design
* Relationships & population

### Authentication

* Passport.js
* Sessions
* Cookies
* Authentication middleware
* Authorization

### Frontend

* EJS
* EJS-Mate
* HTML/CSS
* JavaScript
* Reusable components

### Cloud & APIs

* Cloudinary
* Mapbox
* Geocoding APIs

### Development

* Git & GitHub
* Environment variables
* Deployment
* Debugging
* Production configuration

---

# 🔮 Future Improvements

Possible future features:

* 🔎 Advanced search & filtering
* ❤️ Wishlist / Favorites
* 📅 Booking system
* 💳 Payment integration
* 👤 User profile
* 📱 Improved mobile UI
* ⭐ Average rating system
* 🔔 Notifications
* 🧑‍💼 Admin dashboard
* 📊 Listing analytics
* 📈 Improved recommendation system

---

# 🎓 Project Background

This project was developed as a **learning and portfolio project**, inspired by the Airbnb-style project taught through the **Apna College Delta Batch**.

The implementation was extended with features such as:

* Authentication & authorization
* Cloudinary image uploads
* Mapbox integration
* MongoDB session storage
* Reviews
* Validation
* Deployment

---

# 👨‍💻 Author

## Khem Bhatta

**Computer Science Engineering | AI/ML**

<p>
  <a href="https://github.com/khem819">GitHub</a>
</p>

---

# ⭐ Support

If you found this project useful:

⭐ **Star the repository**

🍴 **Fork the repository**

🐛 **Report bugs**

💡 **Suggest improvements**

📢 **Share the project**

---

# 📄 License

This project is created for **educational and portfolio purposes**.

---

<p align="center">
  Made with ❤️ using Node.js, Express.js, MongoDB & EJS
</p>
