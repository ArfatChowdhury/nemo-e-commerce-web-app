# 🌊 Nemo E-commerce - Premium Shopping Experience

A modern, full-stack e-commerce platform built with **Next.js 16**, **React 19**, **Redux Toolkit**, and **Firebase**. Featuring a premium design, comprehensive product management, and a seamless shopping experience.

🌐 **Live Website**: [https://nemo-e-commerce-web-app.vercel.app/](https://nemo-e-commerce-web-app.vercel.app/)

![Nemo E-commerce](https://nemo-e-commerce-web-app.vercel.app/nemo-logo-white.png)

---

## ✨ Key Features

### 🛍️ Shopping Experience
- **Dynamic Product Catalog**: Browse products across multiple categories with real-time filtering
- **Advanced Search**: Powerful search functionality to find products, brands, or categories instantly
- **Shopping Cart**: Add, remove, and update quantities with persistent state management
- **Wishlist**: Save your favorite items for later purchase
- **Product Details**: Comprehensive product pages with image galleries and detailed information
- **Category Browsing**: Filter products by categories with dedicated category pages

### 🎯 Special Features
- **Flash Sale**: Time-limited deals with live countdown timer
- **Hot Deals Carousel**: Eye-catching banner carousel showcasing featured products
- **New Arrivals**: Discover the latest products added to the store
- **Top Products**: Browse best-selling and popular items
- **Service Highlights**: 
  - 🚚 Free Shipping on orders over $99
  - 📞 24/7 Customer Support
  - 🔒 Secure Payment Processing
  - 🔄 90 Days Return Policy

### 👤 User Features
- **Authentication**: Secure login and signup powered by Firebase Authentication
- **User Profile**: Manage your account information and preferences
- **Order History**: Track all your past orders with detailed information
- **Newsletter**: Subscribe to get exclusive deals and updates (20% off welcome discount)

### 🛠️ Admin Features
- **Admin Dashboard**: Comprehensive dashboard for managing the store
- **Product Management**: Add new products with image uploads via ImgBB API
- **Edit Products**: Update existing product information, prices, and details
- **Analytics**: View store statistics and performance metrics
- **Role-Based Access**: Secure admin-only features with role management

### 📱 Mobile App
- **APK Download**: Download the mobile app directly from the website
- **App Download Modal**: Beautiful modal with app features and download instructions
- **Home Banner**: Prominent banner promoting the mobile app experience

### 🎨 User Experience
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices
- **Loading States**: Elegant skeleton loaders for better perceived performance
- **Toast Notifications**: Real-time feedback with React Hot Toast
- **Smooth Animations**: Premium transitions and hover effects
- **SEO Optimized**: Dynamic metadata for every product and category page
- **Sticky Navigation**: Always accessible navigation bar

---

## 🛠️ Tech Stack

### Core Framework
- **[Next.js 16.0.10](https://nextjs.org/)** - React framework with App Router
- **[React 19.2.1](https://react.dev/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type safety

### State Management
- **[Redux Toolkit 2.11.2](https://redux-toolkit.js.org/)** - State management
- **[React Redux 9.2.0](https://react-redux.js.org/)** - React bindings for Redux

### Styling
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[DaisyUI 5.5.14](https://daisyui.com/)** - Component library for Tailwind

### Backend & Services
- **[Firebase 12.7.0](https://firebase.google.com/)** - Authentication and backend services
- **[ImgBB API](https://api.imgbb.com/)** - Image hosting for product uploads

### UI Components & Libraries
- **[React Icons 5.5.0](https://react-icons.github.io/react-icons/)** - Icon library
- **[Swiper 12.0.3](https://swiperjs.com/)** - Touch slider for carousels
- **[React Hot Toast 2.6.0](https://react-hot-toast.com/)** - Toast notifications

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ 
- **npm**, **yarn**, or **pnpm**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/nemo-ecommerce-nextjs.git
   cd nemo-ecommerce-nextjs
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables:**
   
   Create a `.env.local` file in the root directory and add your configuration:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   
   # Image Upload Service
   NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
   
   # Backend API
   NEXT_PUBLIC_API_URL=https://backend-of-nemo.vercel.app
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser:**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
nemo-ecommerce-nextjs/
├── public/
│   ├── apps/              # Mobile app APK files
│   └── banner/            # Banner images
├── src/
│   └── app/
│       ├── components/    # Reusable components
│       │   ├── buttons/  # Action buttons
│       │   └── ...
│       ├── context/      # React contexts
│       ├── store/        # Redux store and slices
│       ├── lib/          # Utility functions
│       ├── admindashboard/
│       ├── cart/
│       ├── categories/
│       ├── login/
│       ├── product/
│       ├── profile/
│       └── ...
└── ...
```

---

## 🎯 Main Pages & Routes

- `/` - Home page with featured products and deals
- `/categories` - Browse all product categories
- `/categories/[category]` - Category-specific product listings
- `/product/[id]` - Individual product details page
- `/search?q=query` - Search results page
- `/cart` - Shopping cart
- `/wishlist` - User wishlist
- `/login` - User authentication
- `/signup` - User registration
- `/profile` - User profile management
- `/profile/orders` - Order history
- `/admindashboard` - Admin control panel
- `/addProduct` - Add new product (Admin)
- `/editProduct` - Edit product (Admin)
- `/payment` - Checkout and payment

---

## 🔐 Authentication

The app uses Firebase Authentication for secure user management:
- Email/Password authentication
- Protected routes for authenticated users
- Role-based access control (Admin/User)
- Session persistence

---

## 🛒 State Management

Redux Toolkit manages:
- Shopping cart items
- Wishlist items
- User authentication state
- Order history
- Product form data

---

## 📱 Mobile App Download

Users can download the mobile app (APK) directly from:
- Navbar "App" button
- Home page banner
- Download modal with app information

Place your APK file at: `public/apps/nemo-app.apk`

---

## 🎨 Design Features

- **Modern UI**: Clean, premium design with teal color scheme
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Responsive Layout**: Mobile-first approach with breakpoints
- **Accessibility**: Semantic HTML and ARIA labels
- **Performance**: Optimized images and lazy loading

---

## 🚀 Deployment

The app is deployed on **Vercel**:
- Automatic deployments on push
- Environment variables configuration
- Optimized builds and caching

---

## 📝 License

This project is private and proprietary.

---

## 👨‍💻 Developer

**Developed with ❤️ by Arfat**

---

## 🔗 Links

- **Live Website**: [https://nemo-e-commerce-web-app.vercel.app/](https://nemo-e-commerce-web-app.vercel.app/)
- **GitHub Repository**: (Add your repository URL)

---

## 🤝 Contributing

This is a private project. For inquiries, please contact the developer.


---

**Run Like Nemo, Stay Ahead of the Curve** 🏃‍♂️💨
