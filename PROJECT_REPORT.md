# Art Supply Exchange & Second-hand Material Marketplace

Build a marketplace for second-hand art supplies using React, Node.js, Express, and MongoDB. The platform will enable users to buy, sell, and swap unused materials, promoting affordability, sustainability, and local creative communities.

## User Review Required

> [!IMPORTANT]
> - **Database Choice:** The plan uses **MongoDB**. Let me know if you prefer PostgreSQL.
> - **Real-time Chat:** True real-time chat requires WebSockets (e.g., Socket.io). For Phase 1, we can either implement WebSockets or use a simpler REST-based approach (where users refresh to see new messages). Please confirm if you want full WebSocket integration.
> - **Media Storage:** The PRD mentions cloud storage for images. We can use Cloudinary or AWS S3. I recommend Cloudinary for its ease of use in Phase 1. Let me know if this works for you.

## Proposed Changes

### Frontend (React + Vite)
We will create a modern React application utilizing Vite for fast builds.
- **Routing:** `react-router-dom` for client-side navigation.
- **Styling:** Custom Vanilla CSS with a focus on rich aesthetics, premium feel, dynamic interactions (glassmorphism, modern gradients, subtle micro-animations).
- **Pages (6-8 required):**
  1. `Login & Registration Page`: Secure authentication portal.
  2. `Marketplace Page`: Home/Search page displaying listings with robust filters (category, location, price, condition).
  3. `Product Detail Page`: Showcasing individual art supplies with high-quality images and actions to "Buy" or "Swap".
  4. `User Dashboard`: Manage personal listings, profile, and view past transactions.
  5. `Swap Request Page`: Dedicated area to view, propose, accept, or reject swap offers.
  6. `Chat/Communication Page`: Interface for buyers and sellers to negotiate.
  7. `Admin Panel`: Management portal for users, listings, and dispute resolution.

### Backend (Node.js + Express)
A robust RESTful API to handle client requests and business logic.
- **Framework:** Express.js.
- **Authentication:** JWT (JSON Web Tokens) with bcrypt for password hashing.
- **Core Models:**
  - `User`: Handles profiles, location, and authentication credentials.
  - `Product`: Stores listing details (title, description, price, condition, category, status).
  - `SwapRequest`: Manages the lifecycle of exchange proposals between users.
  - `Message/Chat`: Stores communication logs between buyers and sellers.
- **Features:** Search and filtering logic, swap state management, user role management (User vs. Admin).

### Database
- **MongoDB** via Mongoose ODM for flexible schema design, which is ideal for a marketplace with varied product categories.

### Design Aesthetics & UX
- **Typography:** Modern sans-serif fonts (e.g., Outfit or Inter).
- **Color Palette:** Curated, vibrant colors that appeal to artists, potentially with a sleek dark mode toggle.
- **Engagement:** High-quality, realistic mock data for art supplies (paints, brushes, easels) to make the prototype look production-ready.

## Verification Plan

### Manual Verification
1. **End-to-End Flows:**
   - Register a new Seller, list a product, and upload images.
   - Register a new Buyer, browse the marketplace, filter by "Paint", and initiate a Chat.
   - Propose a Swap request, switch to Seller account, and Accept the swap.
2. **UI/UX Audit:**
   - Verify mobile responsiveness on all 7 key pages.
   - Ensure the design feels premium and animations perform smoothly.
3. **Admin Verification:**
   - Login as an Admin, view all listings, and simulate resolving a dispute or deleting an inappropriate listing.
