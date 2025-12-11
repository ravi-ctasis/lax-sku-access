import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface HorizontalProductScrollProps {
  products: Product[];
  title: string;
}

export function HorizontalProductScroll({ products, title }: HorizontalProductScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addItem(product, 1);
    toast.success(`Added ${product.name} to cart`);
  };

  const handleWishlistToggle = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success(`Removed ${product.name} from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`Added ${product.name} to wishlist`);
    }
  };

  if (products.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('left')}
            className="h-9 w-9"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('right')}
            className="h-9 w-9"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product) => {
          const inWishlist = isInWishlist(product.id);
          return (
            <Card
              key={product.id}
              className="flex-shrink-0 w-[220px] cursor-pointer hover:shadow-lg transition-shadow group"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="aspect-square bg-muted relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <button
                  onClick={(e) => handleWishlistToggle(e, product)}
                  className={cn(
                    "absolute top-2 right-2 w-8 h-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center transition-colors",
                    inWishlist ? "text-red-500" : "text-muted-foreground hover:text-red-500"
                  )}
                >
                  <Heart className={cn("h-4 w-4", inWishlist && "fill-red-500")} />
                </button>
              </div>
              <CardContent className="p-3">
                <Badge variant="secondary" className="mb-2 text-xs">{product.brand}</Badge>
                <h3 className="font-semibold text-foreground line-clamp-2 text-sm mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
