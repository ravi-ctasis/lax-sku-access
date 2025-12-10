import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Plus, Minus, Package, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > 0 && quantity <= product.stock) {
      addItem(product, quantity);
      toast.success(`Added ${quantity}x ${product.name} to cart`);
      setQuantity(1);
    }
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.success(`Removed ${product.name} from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`Added ${product.name} to wishlist`);
    }
  };

  const incrementQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrementQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <Card 
      className="group overflow-hidden transition-all duration-300 hover:shadow-card-hover animate-fade-in cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative aspect-square bg-muted overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <Package className="h-16 w-16 text-muted-foreground/30" />
        </div>
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="text-xs font-medium">
            {product.brand}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <button
            onClick={handleWishlistToggle}
            className={cn(
              "w-8 h-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center transition-colors",
              inWishlist ? "text-red-500" : "text-muted-foreground hover:text-red-500"
            )}
          >
            <Heart className={cn("h-4 w-4", inWishlist && "fill-red-500")} />
          </button>
        </div>
        <div className="absolute bottom-3 right-3">
          <Badge
            variant="outline"
            className={cn(
              'text-xs font-medium',
              product.stock > 20
                ? 'border-success/30 text-success bg-success/5'
                : product.stock > 0
                ? 'border-warning/30 text-warning bg-warning/5'
                : 'border-destructive/30 text-destructive bg-destructive/5'
            )}
          >
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="mb-3">
          <p className="text-xs text-muted-foreground mb-1">{product.sku}</p>
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-muted-foreground">{product.category}</span>
        </div>

        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center border rounded-lg">
            <button
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              className="p-2 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="h-4 w-4" />
            </button>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 1;
                setQuantity(Math.min(Math.max(1, val), product.stock));
              }}
              className="w-14 text-center border-0 focus-visible:ring-0"
              min={1}
              max={product.stock}
            />
            <button
              onClick={incrementQuantity}
              disabled={quantity >= product.stock}
              className="p-2 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex-1 gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
