# 📚 BiblioDrop

> Your Local Library, Delivered. A full-stack, industry-level platform bridging the gap between literature and local communities.

<p align="center">
  <img src="https://i.ibb.co.com/bMgqj6bX/image.png" alt="BiblioDrop Homepage Preview" width="100%" />
</p>

## 🔗 Live Links
- **Live Application:** [https://biblo-drop.vercel.app](https://biblo-drop.vercel.app)

---

## 📝 Description
**BiblioDrop** is an industry-ready, full-stack platform designed to make reading deeply accessible by allowing local residents to borrow books entirely from home. Built to serve avid readers, the system introduces a comprehensive multi-tenant architecture with three distinct user roles: **Admin, Librarian, and Reader**. Each role navigates a unique interface equipped with specific data access and specialized features to create a seamless, community-driven reading cycle.

---

## 👥 Role-Based Functionality

### 👑 Admin Interface
- **Comprehensive Dashboard:** Visual data representations using Recharts to track overall platform metrics, including total revenue, active reviews, total user registration counts, and total book deliveries.
- **Access Control & Approvals:** Manage librarian validation status, authorize book posting permissions, and directly update user permissions (promote/demote user roles).
- **Content Moderation:** Ability to instantly publish or unpublish books across the platform globally.
- **Financial Auditing:** Access a complete cross-platform transaction history.

### 💼 Librarian Interface
- **Tailored Dashboard:** Tracks dynamic business analytics exclusive to their uploaded catalogs, highlighting personal revenue performance, review histories, and fulfillment stats via Recharts.
- **Inventory Control:** Authorized librarians can dynamically add new literary works, update inventory data, configure visibility (publish/unpublish), or remove listings entirely.
- **Live Delivery Management:** Update order pipelines natively, allowing readers to see real-time logistical transitions from *dispatched* to *successfully delivered*.

### 📖 Reader Interface
- **Personalized Dashboard:** A stylized overview documenting individual financial spending habits, total library engagement, and visual feedback on reading history graphs via Recharts.
- **Order Tracking:** Real-time logistics logs updating readers on the movement of their requested material.
- **Reading Logs:** A curated "My Reading List" section archiving every successfully completed, delivered book.
- **Interactive Reviews:** Personal feedback archive tracking user impressions, with absolute CRUD control to add, edit, or delete personal reviews.

---

## 🚀 Key Features
- **Advanced Book Directory:** High-performance catalog searching, multi-key filtering, and sorting managed entirely on the backend for quick processing.
- **Persistent States:** Advanced backend-driven pagination mechanics allow users to copy/share their exact search/filter result strings via unique URLs.
- **Conditional Actions:** Smart business logic restrictions ensure that book details, borrowing privileges, and product review features are securely isolated to non-owners and qualified borrowers.
- **Engaging UI Elements:** Dynamic banner carousel systems, stylized statistics displays, top librarian spotlight modules, full theme toggles, clean user profile editing, and built-in contact forms.

---

## 🛠️ Technologies Used

### 🎨 Frontend Stack
* **Framework:** Next.js (React)
* **Design & UI Frameworks:** Hero UI, Tailwind CSS, HTML5, CSS3
* **State & Utilities:** JavaScript (ES6+), React Toastify
* **Authentication:** Better Auth
* **Payment Gateway:** Stripe API Integration
* **Data Visualization:** Recharts

### ⚙️ Backend Stack
* **Runtime Environment:** Node.js
* **Server Architecture:** Express.js
* **Database Management:** MongoDB
* **Security & Gateways:** JWT (JSON Web Tokens), CORS, Dotenv
