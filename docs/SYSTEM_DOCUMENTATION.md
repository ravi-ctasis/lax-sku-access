# LAX Customer Portal - System Documentation

## Overview

LAX Customer Portal is a B2B e-commerce platform designed for business customers to browse products, manage orders, and handle their accounts. The system provides a streamlined ordering experience with features like wishlist management, cart functionality, and order tracking.

---

## Technology Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS with custom design system
- **UI Components:** shadcn/ui (Radix UI based)
- **Routing:** React Router DOM v6
- **State Management:** React Context API (Cart & Wishlist)
- **Icons:** Lucide React
- **Animations:** Tailwind CSS Animate

---

## Screen Overview

### 1. Login Page (`/login` or `/`)

**Purpose:** Authentication entry point for users

**Features:**
- Split-screen layout with branding on left, form on right
- Email and password input fields
- "Forgot password?" link
- "Create your password" link for new users
- Contact support email link
- Password visibility toggle

**Components Used:**
- `Input` - Form inputs
- `Button` - Sign in button
- `Card` - Form container

---

### 2. Create Password Page (`/create-password`)

**Purpose:** First-time user password setup

**Features:**
- Password strength requirements display:
  - At least 8 characters
  - Contains uppercase letter
  - Contains lowercase letter
  - Contains a number
- Real-time password validation
- Password confirmation field
- Password visibility toggles
- Link to sign in for existing users

**Components Used:**
- `Input` - Password fields
- `Button` - Create password button
- Visual checkmarks for password requirements

---

### 3. Dashboard (`/dashboard`)

**Purpose:** Main hub after login showing overview of account activity

**Features:**
- **Hero Welcome Section:**
  - Personalized greeting with user name
  - Quick stats (Total Orders, Products)
  - Quick access buttons (Browse Products, My Wishlist)

- **Stats Cards Row:**
  - Pending Orders count
  - Approved Orders count
  - In Transit Orders count
  - Total Spent (lifetime value)

- **Order Progress:**
  - Circular progress indicator
  - Completion rate percentage
  - Delivered orders progress bar

- **Quick Actions Grid:**
  - Browse Products (38 items available)
  - View Cart
  - Order History
  - Account Settings

- **Recent Orders Section:**
  - Last 4 orders with status badges
  - Order ID, date, total amount
  - "View All" link

- **Featured Products:**
  - Horizontal scrollable product carousel
  - Quick add to cart functionality

**Components Used:**
- `Card` - All stat and action cards
- `Button` - Action buttons
- `Badge` - Status indicators
- `HorizontalProductScroll` - Product carousel

---

### 4. Products Page (`/products`)

**Purpose:** Product catalog with filtering and search

**Features:**
- **Header:**
  - Page title and description
  - Search bar (by name, SKU, or description)

- **Filters:**
  - Brand dropdown filter
  - Category dropdown filter
  - Sort by dropdown (Default, Price Low-High, Price High-Low, Name A-Z, Name Z-A)
  - Price range slider ($0 - $1500)
  - Clear filters button

- **Product Grid:**
  - 5 products per row on large screens
  - Responsive grid layout
  - 38 total products

- **Product Cards:**
  - Product image
  - Brand badge (LAX)
  - Wishlist heart icon
  - SKU number
  - Product name
  - Description preview
  - Price display
  - Quantity selector
  - Add to cart button

**Components Used:**
- `Input` - Search field
- `Select` - Filter dropdowns
- `Slider` - Price range
- `Button` - Filter actions
- `ProductCard` - Individual product display

---

### 5. Product Details Page (`/product/:id`)

**Purpose:** Detailed view of individual product

**Features:**
- Back navigation button
- Large product image
- Brand and category badges
- Product title
- SKU number
- Price display (current and original if discounted)
- Product description
- Quantity selector (+/- buttons)
- "Add to Cart" button
- "Add to Wishlist" button
- **"You May Also Like" Section:**
  - Horizontal scrollable product carousel
  - Related product suggestions

**Components Used:**
- `Button` - All action buttons
- `Badge` - Brand/category tags
- `Card` - Product container
- `HorizontalProductScroll` - Related products

---

### 6. Cart Page (`/cart`)

**Purpose:** Shopping cart management and checkout preparation

**Features:**
- **Empty State:**
  - Cart icon
  - "Your cart is empty" message
  - "Browse Products" CTA

- **Cart Items (when populated):**
  - Product image
  - Product name and SKU
  - Unit price
  - Quantity selector
  - Line item total
  - Remove button

- **Order Summary Card:**
  - Subtotal
  - Tax calculation
  - Total amount
  - "Proceed to Checkout" button

- **Related Items Section:**
  - Up to 4 vertical product cards
  - Quick add functionality

- **Popular Products Section:**
  - Horizontal scrollable carousel
  - Product recommendations

**Components Used:**
- `Card` - Cart items and summary
- `Button` - Action buttons
- `HorizontalProductScroll` - Recommendations
- `ProductCard` - Related items

---

### 7. Checkout Page (`/checkout`)

**Purpose:** Order finalization and submission

**Features:**
- Shipping address form
- Order summary
- Payment method selection
- Order confirmation

---

### 8. Orders Page (`/orders`)

**Purpose:** Order history and tracking

**Features:**
- **Search:**
  - Search by order ID or PO number

- **Order List:**
  - Order ID display
  - Status badge (Delivered, Shipped, Approved, Pending Review)
  - Order date
  - Item count
  - Total amount
  - "View Details" button

**Status Types:**
- `Delivered` - Green badge
- `Shipped` - Blue badge
- `Approved` - Teal badge
- `Pending Review` - Yellow badge

**Components Used:**
- `Input` - Search field
- `Card` - Order cards
- `Badge` / `StatusBadge` - Order status
- `Button` - View details

---

### 9. Wishlist Page (`/wishlist`)

**Purpose:** Saved products for future purchase

**Features:**
- **Empty State:**
  - Heart icon
  - "Your Wishlist is Empty" message
  - "Browse Products" CTA

- **Wishlist Items (when populated):**
  - Product grid display
  - Remove from wishlist option
  - Add to cart functionality

- **Recommended For You Section:**
  - Horizontal scrollable carousel
  - Product suggestions based on preferences

**Components Used:**
- `Card` - Wishlist container
- `Button` - Action buttons
- `ProductCard` - Wishlist items
- `HorizontalProductScroll` - Recommendations

---

### 10. Profile Page (`/profile`)

**Purpose:** User account settings and preferences

**Features:**
- **Profile Header:**
  - User avatar
  - Company name
  - Profile photo upload button
  - "Edit Profile" button

- **Tab Navigation:**
  - Personal Info
  - Security
  - Notifications

- **Personal Information Tab:**
  - Full Name
  - Email Address
  - Phone Number
  - Street Address
  - City, State, ZIP Code

- **Security Tab:**
  - Password change
  - Security settings

- **Notifications Tab:**
  - Email notification preferences
  - Push notification settings

**Components Used:**
- `Tabs` - Section navigation
- `Input` - Form fields
- `Button` - Save actions
- `Card` - Section containers
- `Avatar` - Profile image

---

## Common Components

### Navigation Header
- LAX logo and portal name
- Main navigation links:
  - Dashboard
  - Products
  - Orders
- Utility icons:
  - Wishlist (heart)
  - Cart (with item count)
  - User menu (profile dropdown)

### Footer
- Copyright notice
- Policy links:
  - Privacy
  - Terms
  - Cookies

### HorizontalProductScroll
Reusable horizontal scrolling product carousel with:
- Left/Right navigation buttons
- Smooth scroll animation
- Responsive item display
- Optional title

### ProductCard
Standardized product display with:
- Image container
- Brand badge
- Wishlist toggle
- Product info (name, SKU, description)
- Price display
- Quantity controls
- Add to cart button

---

## Data Models

### Product
```typescript
interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand: string;
}
```

### Order
```typescript
interface Order {
  id: string;
  date: string;
  status: 'pending' | 'approved' | 'shipped' | 'delivered';
  items: OrderItem[];
  total: number;
}
```

### Cart Item
```typescript
interface CartItem {
  product: Product;
  quantity: number;
}
```

---

## Context Providers

### CartContext
- `items` - Array of cart items
- `addToCart(product, quantity)` - Add item to cart
- `removeFromCart(productId)` - Remove item
- `updateQuantity(productId, quantity)` - Update quantity
- `clearCart()` - Empty cart
- `totalItems` - Total item count
- `totalPrice` - Cart total

### WishlistContext
- `items` - Array of wishlist products
- `addToWishlist(product)` - Add to wishlist
- `removeFromWishlist(productId)` - Remove from wishlist
- `isInWishlist(productId)` - Check if product is in wishlist
- `clearWishlist()` - Empty wishlist

---

## Routes Configuration

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Login | Default landing/login page |
| `/login` | Login | Login page |
| `/create-password` | CreatePassword | New user password setup |
| `/dashboard` | Dashboard | Main dashboard |
| `/products` | Products | Product catalog |
| `/product/:id` | ProductDetails | Single product view |
| `/cart` | Cart | Shopping cart |
| `/checkout` | Checkout | Order checkout |
| `/orders` | Orders | Order history |
| `/wishlist` | Wishlist | Saved products |
| `/profile` | Profile | User settings |
| `*` | NotFound | 404 page |

---

## Design System

### Colors (HSL)
- **Primary:** Deep navy blue
- **Secondary:** Teal/cyan accent
- **Background:** Light gray
- **Foreground:** Dark text
- **Muted:** Subtle gray tones
- **Accent:** Highlight colors

### Typography
- **Font Family:** IBM Plex Sans
- **Headings:** Bold weights
- **Body:** Regular weight

### Spacing
- Consistent 4px/8px grid system
- Container max-width with responsive padding

---

## File Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Footer.tsx
│   │   └── PortalLayout.tsx
│   ├── products/
│   │   ├── HorizontalProductScroll.tsx
│   │   └── ProductCard.tsx
│   └── ui/
│       └── [shadcn components]
├── context/
│   ├── CartContext.tsx
│   └── WishlistContext.tsx
├── data/
│   └── mockData.ts
├── hooks/
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── pages/
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   ├── CreatePassword.tsx
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   ├── NotFound.tsx
│   ├── Orders.tsx
│   ├── ProductDetails.tsx
│   ├── Products.tsx
│   ├── Profile.tsx
│   └── Wishlist.tsx
├── types/
│   └── index.ts
├── App.tsx
├── index.css
└── main.tsx
```

---

## Product Count

**Total Products:** 38

Categories include:
- Power Banks
- Charging Cables
- Car Chargers
- USB Accessories
- LED Lights
- Phone Mounts
- Audio Accessories
- Screen Protectors

---

*Last Updated: December 2024*
