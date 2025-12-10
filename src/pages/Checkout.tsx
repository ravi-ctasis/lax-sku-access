import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useCart } from '@/context/CartContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Package, CheckCircle, ArrowLeft, Send } from 'lucide-react';
import { toast } from 'sonner';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    poNumber: '',
    notes: '',
    useDefaultAddress: true,
    shippingAddress: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate order submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setOrderSubmitted(true);
    clearCart();
    toast.success('Order request submitted successfully!');
    setIsSubmitting(false);
  };

  if (orderSubmitted) {
    return (
      <PortalLayout>
        <div className="max-w-lg mx-auto text-center py-16 animate-fade-in">
          <div className="mx-auto w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-6">
            <CheckCircle className="h-10 w-10 text-success" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Order Request Submitted!
          </h1>
          <p className="text-muted-foreground mb-8">
            Your order has been submitted for review. You'll receive a confirmation email once
            it's approved by the LAX team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate('/orders')} className="gap-2">
              View Orders
            </Button>
            <Button variant="outline" onClick={() => navigate('/products')}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </PortalLayout>
    );
  }

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <PortalLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/cart')}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Checkout</h1>
            <p className="text-muted-foreground mt-1">
              Complete your order request
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="defaultAddress"
                      checked={formData.useDefaultAddress}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          useDefaultAddress: checked as boolean,
                        }))
                      }
                    />
                    <Label htmlFor="defaultAddress" className="font-normal cursor-pointer">
                      Use my default shipping address
                    </Label>
                  </div>

                  {formData.useDefaultAddress ? (
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="font-medium text-foreground">ACME Corporation</p>
                      <p className="text-sm text-muted-foreground">
                        123 Industrial Way
                        <br />
                        Suite 400
                        <br />
                        Los Angeles, CA 90001
                        <br />
                        United States
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="shippingAddress">Shipping Address</Label>
                      <Textarea
                        id="shippingAddress"
                        placeholder="Enter full shipping address..."
                        value={formData.shippingAddress}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            shippingAddress: e.target.value,
                          }))
                        }
                        rows={4}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Order Details */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Order Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="poNumber">PO Number (Optional)</Label>
                    <Input
                      id="poNumber"
                      placeholder="Enter your purchase order number"
                      value={formData.poNumber}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, poNumber: e.target.value }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes for LAX Fulfillment (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any special instructions or notes..."
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, notes: e.target.value }))
                      }
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Order Items Review */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Order Items ({totalItems})</CardTitle>
                </CardHeader>
                <CardContent className="divide-y">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                      <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <Package className="h-6 w-6 text-muted-foreground/30" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.sku} • Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold text-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="shadow-card sticky top-20">
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
                      <span className="text-muted-foreground">TBD</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="text-muted-foreground">TBD</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="font-semibold text-foreground">Estimated Total</span>
                      <span className="font-bold text-lg text-foreground">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Final amount will be confirmed upon order approval
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                    <p className="text-sm font-medium text-foreground">What happens next?</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Your order request will be reviewed by LAX</li>
                      <li>• You'll receive confirmation once approved</li>
                      <li>• Shipping details will be sent via email</li>
                    </ul>
                  </div>

                  <Button
                    type="submit"
                    className="w-full gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Submit Order Request
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </PortalLayout>
  );
};

export default Checkout;
