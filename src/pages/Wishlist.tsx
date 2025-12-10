import { useNavigate } from 'react-router-dom';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function Wishlist() {
  const navigate = useNavigate();
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (product: typeof items[0]) => {
    addItem(product, 1);
    toast({
      title: 'Added to Cart',
      description: `${product.name} added to cart.`,
    });
  };

  const handleRemove = (productId: string, productName: string) => {
    removeFromWishlist(productId);
    toast({
      title: 'Removed from Wishlist',
      description: `${productName} removed from wishlist.`,
    });
  };

  const handleMoveAllToCart = () => {
    items.forEach((product) => {
      addItem(product, 1);
    });
    clearWishlist();
    toast({
      title: 'All Items Added to Cart',
      description: 'All wishlist items have been moved to cart.',
    });
  };

  if (items.length === 0) {
    return (
      <PortalLayout>
        <div className="flex flex-col items-center justify-center py-16 space-y-6">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
            <Heart className="h-12 w-12 text-muted-foreground" />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">Your Wishlist is Empty</h2>
            <p className="text-muted-foreground max-w-md">
              Start adding products you love to your wishlist. You can easily find them later!
            </p>
          </div>
          <Button onClick={() => navigate('/products')} className="gap-2">
            Browse Products
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Wishlist</h1>
            <p className="text-muted-foreground">{items.length} item{items.length !== 1 ? 's' : ''} saved</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={clearWishlist}>
              Clear All
            </Button>
            <Button onClick={handleMoveAllToCart} className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              Add All to Cart
            </Button>
          </div>
        </div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
              <div 
                className="aspect-square bg-muted relative cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(product.id, product.name);
                  }}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/80 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{product.brand}</Badge>
                  <Badge variant="outline">{product.category}</Badge>
                </div>
                <h3 
                  className="font-semibold text-foreground line-clamp-2 cursor-pointer hover:text-primary transition-colors"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
                  <span className={cn(
                    "text-xs font-medium",
                    product.stock > 20 ? "text-green-600" : product.stock > 0 ? "text-yellow-600" : "text-red-600"
                  )}>
                    {product.stock > 20 ? 'In Stock' : product.stock > 0 ? `${product.stock} left` : 'Out of Stock'}
                  </span>
                </div>
                <Button 
                  className="w-full gap-2" 
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PortalLayout>
  );
}
