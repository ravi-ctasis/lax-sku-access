import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { products } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingCart, 
  Heart, 
  Minus, 
  Plus, 
  ArrowLeft, 
  Package
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { HorizontalProductScroll } from '@/components/products/HorizontalProductScroll';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);
  const inWishlist = product ? isInWishlist(product.id) : false;

  // Get suggested products (same category or brand)
  const suggestedProducts = products.filter(
    p => p.id !== id && (p.category === product?.category || p.brand === product?.brand)
  ).slice(0, 10);

  if (!product) {
    return (
      <PortalLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-foreground">Product not found</h2>
          <Button onClick={() => navigate('/products')} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
        </div>
      </PortalLayout>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast({
      title: 'Added to Cart',
      description: `${quantity}x ${product.name} added to cart.`,
    });
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast({
        title: 'Removed from Wishlist',
        description: `${product.name} removed from wishlist.`,
      });
    } else {
      addToWishlist(product);
      toast({
        title: 'Added to Wishlist',
        description: `${product.name} added to wishlist.`,
      });
    }
  };

  return (
    <PortalLayout>
      <div className="space-y-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <Card className="overflow-hidden">
            <div className="aspect-square bg-muted flex items-center justify-center">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </Card>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{product.brand}</Badge>
                <Badge variant="outline">{product.category}</Badge>
              </div>
              <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>
              <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</span>
              <span className="text-lg text-muted-foreground line-through">${(product.price * 1.2).toFixed(2)}</span>
            </div>

            {/* Description */}
            <p className="text-muted-foreground">{product.description}</p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center gap-2 border rounded-lg p-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                className="flex-1 gap-2" 
                size="lg"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className={cn("gap-2", inWishlist && "text-red-500 border-red-500")}
                onClick={handleWishlistToggle}
              >
                <Heart className={cn("h-5 w-5", inWishlist && "fill-red-500")} />
                {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
              </Button>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <Tabs defaultValue="details" className="mt-8">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Product Description</h3>
                <p className="text-muted-foreground">{product.description}</p>
                <p className="text-muted-foreground mt-4">
                  This premium quality product is designed for professional use in industrial environments. 
                  Built with durable materials and engineered for maximum performance and reliability.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="specifications" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Technical Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Brand</span>
                    <span className="font-medium">{product.brand}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium">{product.category}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">SKU</span>
                    <span className="font-medium">{product.sku}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Suggested Products - Horizontal Scroll */}
        {suggestedProducts.length > 0 && (
          <div className="mt-12">
            <HorizontalProductScroll 
              products={suggestedProducts} 
              title="You May Also Like" 
            />
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
