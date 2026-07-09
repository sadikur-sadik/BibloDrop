# 📚 BiblioDrop

> **Your Local Library, Delivered.** A full-stack, industry-ready platform bridging the gap between literature and local communities by offering a multi-tenant digital borrowing experience.

<p align="center">
  <img src="https://i.ibb.co.com/bMgqj6bX/image.png" alt="BiblioDrop Homepage Preview" width="100%" />
</p>

---

## 🔗 Resources & Live Links
* **Live Web Application:** [https://biblo-drop.vercel.app](https://biblo-drop.vercel.app)
* **Frontend Repository:** [https://github.com/sadikur-sadik/BibloDrop](https://github.com/sadikur-sadik/BibloDrop)
* **Backend API Repository:** [https://github.com/sadikur-sadik/BibloDrop-Backend](https://github.com/sadikur-sadik/BibloDrop-Backend)

---

## 📝 Project Overview
**BiblioDrop** is an industry-level, full-stack web application designed to bring library resources straight to readers' doors. It streamlines book discovery, inventory management, delivery tracking, and payments within a community.

Built with a robust multi-tenant architecture, the platform features three distinct user roles—**Admin, Librarian, and Reader**—each with their own tailored dashboards, permissions, and features. The application leverages Next.js for server-side rendering, Express.js for the API layer, MongoDB for database storage, Better Auth for authentication, and Stripe for payments.

---

## 👥 Role-Based Functionality

### 👑 Admin Interface
* **Analytical Dashboard:** Displays platform-wide metrics such as total revenue, total reviews, user registration counts, and total book deliveries with visual representation via Recharts.
* **Access Control:** Promotes/demotes user roles and manages librarian validation status (approving or revoking permissions to list books).
* **Content Moderation:** Publish or unpublish books globally to control catalog visibility.
* **Audit History:** Full transactional history of all book borrowing payments.

### 💼 Librarian Interface
* **Personalized Dashboard:** Displays revenue, review feedback, and delivery statistics specific to the books they have cataloged.
* **Inventory Control:** Add new books, update book details, delete listings, and manage publication states (publish/unpublish).
* **Live Delivery Pipeline:** Update book status in real-time (e.g., transitioning delivery status from *Pending* to *Dispatched* to *Delivered*).

### 📖 Reader Interface
* **Personalized Dashboard:** Provides visual breakdowns of individual spending habits and reading engagement via Recharts.
* **Order Tracking:** Track the real-time shipping/delivery status of requested books.
* **Reading logs:** Access a curated "My Reading List" section which automatically logs completed (delivered) books.
* **Review Control:** Write, edit, or delete personal reviews.

---

## 🚀 Core & Extra Features
* **Google Social Login & Email Auth:** Integrates Better Auth for secure, production-ready user authentication.
* **Secure Stripe Payments:** Implements Stripe Checkout to handle delivery fee transactions safely.
* **Verified Reviews Safeguard:** A backend MongoDB Aggregation pipeline ensures that reviews can only be submitted by readers who have purchased and received the book.
* **Backend-Driven Catalog Querying:** Implements efficient search, sorting (A-Z, Z-A, Newest), and multi-key filtering (by Category/Genre, Availability, and Delivery Fee range) directly on the backend database queries.
* **Persistent & Shareable Search States:** Reflects search, pagination, and filter parameters directly in the URL query strings, allowing specific search results to be easily copied and shared.
* **Responsive Dark/Light Modes:** Full native theme switching using `next-themes` and Tailwind CSS.
* **Integrated Cloud Image Uploads:** Integrates ImgBB API for seamless hosting of book cover images.
* **Dynamic Animations:** Interactive elements are enhanced with smooth micro-animations using Motion.

---

## 🛠️ Technologies Used

### Frontend Stack
* **Framework:** Next.js (React 19)
* **Styling & Components:** Tailwind CSS v4, Hero UI, CSS3
* **State & Flow:** JavaScript (ES6+), React Toastify, Embla Carousel
* **Authentication:** Better Auth (with MongoDB adapter)
* **Data Visualization:** Recharts
* **Payment Integration:** Stripe Client SDK

### Backend Stack
* **Runtime Environment:** Node.js
* **Framework:** Express.js (v5)
* **Database:** MongoDB
* **Security & Tokens:** JWT (JSON Web Tokens), CORS, Dotenv

---

## 📦 Project Dependencies

### Frontend Dependencies (`package.json`)
```json
{
  "dependencies": {
    "next": "^16.2.9",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "@heroui/react": "^3.2.1",
    "@heroui/styles": "^3.2.1",
    "better-auth": "^1.6.19",
    "@better-auth/mongo-adapter": "^1.6.19",
    "mongodb": "^7.3.0",
    "motion": "^12.40.0",
    "next-themes": "^0.4.6",
    "recharts": "^3.8.1",
    "stripe": "^22.2.2",
    "@stripe/stripe-js": "^9.8.0",
    "embla-carousel-react": "^8.6.0",
    "embla-carousel-autoplay": "^8.6.0",
    "react-toastify": "^11.1.0",
    "@gravity-ui/icons": "^2.18.0"
  },
  "devDependencies": {
    "tailwindcss": "^4",
    "@tailwindcss/postcss": "^4",
    "eslint": "^9",
    "eslint-config-next": "16.2.9"
  }
}
```

### Backend Dependencies (`package.json`)
```json
{
  "dependencies": {
    "express": "^5.2.1",
    "mongodb": "^7.3.0",
    "cors": "^2.8.6",
    "dotenv": "^17.4.2",
    "jose-cjs": "^6.2.3"
  }
}
```

---

## 💻 Getting Started (Local Development Guide)

Follow these step-by-step instructions to get both the frontend client and the backend server running in your local development environment.

### 📋 Prerequisites
Ensure you have the following installed on your local machine:
* [Node.js](https://nodejs.org/) (v18.x or higher recommended)
* [MongoDB](https://www.mongodb.com/) (either running locally or a MongoDB Atlas URI)
* [Git](https://git-scm.com/)

---

### 1️⃣ Setting Up the Backend Server

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sadikur-sadik/BibloDrop-Backend.git
   cd BibloDrop-Backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root of the backend folder:
   ```env
   PORT=5000
   MONGO_DB=mongodb+srv://<username>:<password>@cluster.mongodb.net/BibloDrop
   ```
   *Replace `<username>`, `<password>`, and the connection string details with your actual MongoDB credentials.*

4. **Start the backend server:**
   ```bash
   npm start
   ```
   The backend API will start running locally at [http://localhost:5000](http://localhost:5000).

---

### 2️⃣ Setting Up the Frontend Client

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sadikur-sadik/BibloDrop.git
   cd BibloDrop
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root of the frontend folder:
   ```env
   # Better Auth Config
   BETTER_AUTH_URL=http://localhost:3000
   MONGO_DB=mongodb+srv://<username>:<password>@cluster.mongodb.net/BibloDrop
   
   # Social Login
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # Backend Integration
   BACKEND_URL=http://localhost:5000

   # Payment Gateway
   STRIPE_SECRET_KEY=your_stripe_secret_key

   # Image Hosting Service
   NEXT_PUBLIC_IMGBB_KEY=your_imgbb_api_key
   ```
   *Note: Ensure both frontend and backend are pointing to the same MongoDB database so that authorization collections (`session`, `user`) are shared correctly.*

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The Next.js dev server will spin up. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

