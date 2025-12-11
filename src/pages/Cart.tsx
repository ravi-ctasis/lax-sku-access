import { Link, useNavigate } from 'react-router-dom';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useCart } from '@/context/CartContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, Package, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { products } from '@/data/mockData';
import { useWishlist } from '@/context/WishlistContext';
import { toast } from 'sonner';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { HorizontalProductScroll } from '@/components/products/HorizontalProductScroll';

const Cart = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, totalPrice, totalItems, addItem } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  // Get related items (items from same categories as cart items)
  const cartCategories = [...new Set(items.map(item => item.category))];
  const relatedItems = products
    .filter(p => cartCategories.includes(p.category) && !items.some(i => i.id === p.id))
    .slice(0, 4);

  // Get recommended products (different from cart and related)
  const recommendedProducts = products
    .filter(p => !items.some(i => i.id === p.id) && !relatedItems.some(r => r.id === p.id))
    .slice(0, 10);

  const handleAddRelatedToCart = (product: typeof products[0]) => {
    addItem(product, 1);
    toast.success(`Added ${product.name} to cart`);
  };

  if (items.length === 0) {
    return (
      <PortalLayout>
        <div className="animate-fade-in">
          <div className="text-center py-16">
            <div className="mx-auto w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
              <ShoppingCart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Browse our product catalog to add items to your cart
            </p>
            <Link to="/products">
              <Button className="gap-2">
                <Package className="h-4 w-4" />
                Browse Products
              </Button>
            </Link>
          </div>

          {/* Recommended Products even when cart is empty */}
          <div className="mt-12">
            <HorizontalProductScroll 
              products={products.slice(0, 10)} 
              title="Popular Products" 
            />
          </div>
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Shopping Cart</h1>
            <p className="text-muted-foreground mt-1">
              {totalItems} item{totalItems > 1 ? 's' : ''} in your cart
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="shadow-card animate-scale-in">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div 
                      className="w-24 h-24 lg:w-32 lg:h-32 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 cursor-pointer overflow-hidden"
                      onClick={() => navigate(`/product/${item.id}`)}
                    >
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <Package className="h-10 w-10 text-muted-foreground/30" />
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2">
                        <div>
                          <p className="text-xs text-muted-foreground">{item.sku}</p>
                          <h3 
                            className="font-semibold text-foreground cursor-pointer hover:text-primary transition-colors"
                            onClick={() => navigate(`/product/${item.id}`)}
                          >
                            {item.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">{item.brand}</p>
                        </div>
                        <p className="text-lg font-bold text-foreground">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          {/* Quantity Controls */}
                          <div className="flex items-center border rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-muted transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => {
                                const val = parseInt(e.target.value) || 1;
                                updateQuantity(item.id, Math.max(1, val));
                              }}
                              className="w-16 text-center border-0 focus-visible:ring-0"
                              min={1}
                            />
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-muted transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            @ ${item.price.toFixed(2)} each
                          </span>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary and Related Items */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                    <span className="text-foreground">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-muted-foreground">Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="text-muted-foreground">Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-foreground">Estimated Total</span>
                    <span className="font-bold text-lg text-foreground">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Link to="/checkout" className="block">
                  <Button className="w-full gap-2">
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>

                <Link to="/products" className="block">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Related Items - Vertical list max 4 items */}
            {relatedItems.length > 0 && (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Related Items</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {relatedItems.map((product) => (
                    <div 
                      key={product.id} 
                      className="flex gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      <div className="w-16 h-16 rounded-lg bg-muted flex-shrink-0 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground text-sm line-clamp-2">{product.name}</h4>
                        <p className="text-primary font-bold text-sm mt-1">${product.price.toFixed(2)}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 flex-shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddRelatedToCart(product);
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Recommended Products - Horizontal Scroll */}
        <div className="mt-8">
          <HorizontalProductScroll 
            products={recommendedProducts} 
            title="You May Also Like" 
          />
        </div>
      </div>
    </PortalLayout>
  );
};

export default Cart;
