import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";
import { Link } from "react-router-dom";

const Documentation = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Hidden in print */}
      <div className="print:hidden sticky top-0 z-10 bg-background border-b border-border p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <Button onClick={handlePrint} className="gap-2">
            <Printer className="h-4 w-4" />
            Save as PDF
          </Button>
        </div>
      </div>

      {/* Documentation Content */}
      <div className="max-w-4xl mx-auto p-8 print:p-0">
        <div className="prose prose-slate dark:prose-invert max-w-none print:text-black">
          {/* Title Page */}
          <div className="text-center mb-16 print:mb-8">
            <h1 className="text-4xl font-bold mb-4 print:text-3xl">LAX Customer Portal</h1>
            <p className="text-xl text-muted-foreground print:text-gray-600">System Documentation</p>
            <p className="text-sm text-muted-foreground mt-4 print:text-gray-500">
              Generated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          {/* Overview */}
          <section className="mb-12 print:mb-6">
            <h2 className="text-2xl font-bold border-b border-border pb-2 mb-4">Overview</h2>
            <p className="text-muted-foreground print:text-gray-600">
              The LAX Customer Portal is a B2B e-commerce platform designed for business customers to browse products, 
              place orders, and manage their accounts. This documentation provides a comprehensive overview of all 
              screens and features available in the system.
            </p>
          </section>

          {/* Technology Stack */}
          <section className="mb-12 print:mb-6">
            <h2 className="text-2xl font-bold border-b border-border pb-2 mb-4">Technology Stack</h2>
            <div className="grid grid-cols-2 gap-4 print:gap-2">
              <div>
                <h3 className="font-semibold mb-2">Frontend</h3>
                <ul className="list-disc list-inside text-muted-foreground print:text-gray-600 space-y-1">
                  <li>React 18 with TypeScript</li>
                  <li>Vite (Build Tool)</li>
                  <li>Tailwind CSS</li>
                  <li>shadcn/ui Components</li>
                  <li>React Router DOM v6</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">State Management</h3>
                <ul className="list-disc list-inside text-muted-foreground print:text-gray-600 space-y-1">
                  <li>React Context API</li>
                  <li>Cart Context</li>
                  <li>Wishlist Context</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Screen Overview */}
          <section className="mb-12 print:mb-6 print:break-before-page">
            <h2 className="text-2xl font-bold border-b border-border pb-2 mb-4">Screen Overview</h2>
            
            {/* Login */}
            <div className="mb-8 print:mb-4">
              <h3 className="text-xl font-semibold mb-2">1. Login Screen</h3>
              <p className="text-sm text-muted-foreground mb-2 print:text-gray-500">Route: /login</p>
              <p className="text-muted-foreground print:text-gray-600 mb-2">
                Entry point for user authentication with email and password fields.
              </p>
              <div className="bg-muted/50 print:bg-gray-100 p-3 rounded-lg">
                <p className="text-sm font-medium mb-1">Key Features:</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground print:text-gray-600">
                  <li>Email input with validation</li>
                  <li>Password input with show/hide toggle</li>
                  <li>Remember me checkbox</li>
                  <li>Forgot password link</li>
                </ul>
              </div>
            </div>

            {/* Dashboard */}
            <div className="mb-8 print:mb-4">
              <h3 className="text-xl font-semibold mb-2">2. Dashboard</h3>
              <p className="text-sm text-muted-foreground mb-2 print:text-gray-500">Route: /dashboard</p>
              <p className="text-muted-foreground print:text-gray-600 mb-2">
                Main landing page after login showing order statistics and quick actions.
              </p>
              <div className="bg-muted/50 print:bg-gray-100 p-3 rounded-lg">
                <p className="text-sm font-medium mb-1">Key Features:</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground print:text-gray-600">
                  <li>Welcome hero section with quick stats</li>
                  <li>Order status cards (Pending, Approved, In Transit)</li>
                  <li>Total spent overview</li>
                  <li>Order progress indicator</li>
                  <li>Quick action links</li>
                  <li>Recent orders list</li>
                  <li>Featured products carousel</li>
                </ul>
              </div>
            </div>

            {/* Products */}
            <div className="mb-8 print:mb-4 print:break-before-page">
              <h3 className="text-xl font-semibold mb-2">3. Products Catalog</h3>
              <p className="text-sm text-muted-foreground mb-2 print:text-gray-500">Route: /products</p>
              <p className="text-muted-foreground print:text-gray-600 mb-2">
                Comprehensive product listing with search and filter capabilities.
              </p>
              <div className="bg-muted/50 print:bg-gray-100 p-3 rounded-lg">
                <p className="text-sm font-medium mb-1">Key Features:</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground print:text-gray-600">
                  <li>Product grid layout</li>
                  <li>Search functionality</li>
                  <li>Category filters</li>
                  <li>Sort options (Price, Name, etc.)</li>
                  <li>Product cards with quick add to cart</li>
                  <li>Wishlist toggle</li>
                </ul>
              </div>
            </div>

            {/* Product Details */}
            <div className="mb-8 print:mb-4">
              <h3 className="text-xl font-semibold mb-2">4. Product Details</h3>
              <p className="text-sm text-muted-foreground mb-2 print:text-gray-500">Route: /product/:id</p>
              <p className="text-muted-foreground print:text-gray-600 mb-2">
                Detailed view of individual products with specifications.
              </p>
              <div className="bg-muted/50 print:bg-gray-100 p-3 rounded-lg">
                <p className="text-sm font-medium mb-1">Key Features:</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground print:text-gray-600">
                  <li>Large product image</li>
                  <li>Product name and description</li>
                  <li>Price display</li>
                  <li>Quantity selector</li>
                  <li>Add to cart button</li>
                  <li>Add to wishlist button</li>
                  <li>Product specifications</li>
                </ul>
              </div>
            </div>

            {/* Cart */}
            <div className="mb-8 print:mb-4">
              <h3 className="text-xl font-semibold mb-2">5. Shopping Cart</h3>
              <p className="text-sm text-muted-foreground mb-2 print:text-gray-500">Route: /cart</p>
              <p className="text-muted-foreground print:text-gray-600 mb-2">
                Shopping cart showing all added items with quantity management.
              </p>
              <div className="bg-muted/50 print:bg-gray-100 p-3 rounded-lg">
                <p className="text-sm font-medium mb-1">Key Features:</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground print:text-gray-600">
                  <li>Cart items list</li>
                  <li>Quantity adjustment (+/-)</li>
                  <li>Remove item option</li>
                  <li>Price calculations</li>
                  <li>Subtotal display</li>
                  <li>Proceed to checkout button</li>
                </ul>
              </div>
            </div>

            {/* Checkout */}
            <div className="mb-8 print:mb-4 print:break-before-page">
              <h3 className="text-xl font-semibold mb-2">6. Checkout</h3>
              <p className="text-sm text-muted-foreground mb-2 print:text-gray-500">Route: /checkout</p>
              <p className="text-muted-foreground print:text-gray-600 mb-2">
                Order completion page with shipping and payment details.
              </p>
              <div className="bg-muted/50 print:bg-gray-100 p-3 rounded-lg">
                <p className="text-sm font-medium mb-1">Key Features:</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground print:text-gray-600">
                  <li>Shipping address form</li>
                  <li>Order summary</li>
                  <li>Payment method selection</li>
                  <li>Order total with tax</li>
                  <li>Place order button</li>
                </ul>
              </div>
            </div>

            {/* Orders */}
            <div className="mb-8 print:mb-4">
              <h3 className="text-xl font-semibold mb-2">7. Order History</h3>
              <p className="text-sm text-muted-foreground mb-2 print:text-gray-500">Route: /orders</p>
              <p className="text-muted-foreground print:text-gray-600 mb-2">
                Complete list of past and current orders with status tracking.
              </p>
              <div className="bg-muted/50 print:bg-gray-100 p-3 rounded-lg">
                <p className="text-sm font-medium mb-1">Key Features:</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground print:text-gray-600">
                  <li>Order list with dates</li>
                  <li>Order status badges</li>
                  <li>Order totals</li>
                  <li>Order details expansion</li>
                  <li>Reorder functionality</li>
                </ul>
              </div>
            </div>

            {/* Wishlist */}
            <div className="mb-8 print:mb-4">
              <h3 className="text-xl font-semibold mb-2">8. Wishlist</h3>
              <p className="text-sm text-muted-foreground mb-2 print:text-gray-500">Route: /wishlist</p>
              <p className="text-muted-foreground print:text-gray-600 mb-2">
                Saved products for future purchase consideration.
              </p>
              <div className="bg-muted/50 print:bg-gray-100 p-3 rounded-lg">
                <p className="text-sm font-medium mb-1">Key Features:</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground print:text-gray-600">
                  <li>Wishlist product grid</li>
                  <li>Remove from wishlist</li>
                  <li>Add to cart from wishlist</li>
                  <li>Product quick view</li>
                </ul>
              </div>
            </div>

            {/* Profile */}
            <div className="mb-8 print:mb-4 print:break-before-page">
              <h3 className="text-xl font-semibold mb-2">9. Profile</h3>
              <p className="text-sm text-muted-foreground mb-2 print:text-gray-500">Route: /profile</p>
              <p className="text-muted-foreground print:text-gray-600 mb-2">
                User account settings and profile management.
              </p>
              <div className="bg-muted/50 print:bg-gray-100 p-3 rounded-lg">
                <p className="text-sm font-medium mb-1">Key Features:</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground print:text-gray-600">
                  <li>Personal information display</li>
                  <li>Edit profile option</li>
                  <li>Company details</li>
                  <li>Address management</li>
                  <li>Password change</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Routes Table */}
          <section className="mb-12 print:mb-6">
            <h2 className="text-2xl font-bold border-b border-border pb-2 mb-4">Route Configuration</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 font-semibold">Route</th>
                    <th className="text-left py-2 px-3 font-semibold">Component</th>
                    <th className="text-left py-2 px-3 font-semibold">Access</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground print:text-gray-600">
                  <tr className="border-b border-border/50"><td className="py-2 px-3">/</td><td className="py-2 px-3">Dashboard</td><td className="py-2 px-3">Protected</td></tr>
                  <tr className="border-b border-border/50"><td className="py-2 px-3">/login</td><td className="py-2 px-3">Login</td><td className="py-2 px-3">Public</td></tr>
                  <tr className="border-b border-border/50"><td className="py-2 px-3">/dashboard</td><td className="py-2 px-3">Dashboard</td><td className="py-2 px-3">Protected</td></tr>
                  <tr className="border-b border-border/50"><td className="py-2 px-3">/products</td><td className="py-2 px-3">Products</td><td className="py-2 px-3">Protected</td></tr>
                  <tr className="border-b border-border/50"><td className="py-2 px-3">/product/:id</td><td className="py-2 px-3">ProductDetails</td><td className="py-2 px-3">Protected</td></tr>
                  <tr className="border-b border-border/50"><td className="py-2 px-3">/cart</td><td className="py-2 px-3">Cart</td><td className="py-2 px-3">Protected</td></tr>
                  <tr className="border-b border-border/50"><td className="py-2 px-3">/checkout</td><td className="py-2 px-3">Checkout</td><td className="py-2 px-3">Protected</td></tr>
                  <tr className="border-b border-border/50"><td className="py-2 px-3">/orders</td><td className="py-2 px-3">Orders</td><td className="py-2 px-3">Protected</td></tr>
                  <tr className="border-b border-border/50"><td className="py-2 px-3">/wishlist</td><td className="py-2 px-3">Wishlist</td><td className="py-2 px-3">Protected</td></tr>
                  <tr className="border-b border-border/50"><td className="py-2 px-3">/profile</td><td className="py-2 px-3">Profile</td><td className="py-2 px-3">Protected</td></tr>
                  <tr><td className="py-2 px-3">/create-password</td><td className="py-2 px-3">CreatePassword</td><td className="py-2 px-3">Public</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Data Models */}
          <section className="mb-12 print:mb-6 print:break-before-page">
            <h2 className="text-2xl font-bold border-b border-border pb-2 mb-4">Data Models</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Product</h3>
              <div className="bg-muted/50 print:bg-gray-100 p-3 rounded-lg font-mono text-sm">
                <pre className="whitespace-pre-wrap">{`{
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  sku: string
  inStock: boolean
}`}</pre>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Order</h3>
              <div className="bg-muted/50 print:bg-gray-100 p-3 rounded-lg font-mono text-sm">
                <pre className="whitespace-pre-wrap">{`{
  id: string
  date: string
  status: "pending" | "approved" | "in-transit" | "delivered"
  items: CartItem[]
  total: number
}`}</pre>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">CartItem</h3>
              <div className="bg-muted/50 print:bg-gray-100 p-3 rounded-lg font-mono text-sm">
                <pre className="whitespace-pre-wrap">{`{
  product: Product
  quantity: number
}`}</pre>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center text-sm text-muted-foreground print:text-gray-500 pt-8 border-t border-border">
            <p>LAX Customer Portal - System Documentation</p>
            <p className="mt-1">© {new Date().getFullYear()} LAX. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
