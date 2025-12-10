import { useState } from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatusBadge } from '@/components/ui/status-badge';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { orders } from '@/data/mockData';
import { Order } from '@/types';
import { Search, Package, ExternalLink, Calendar, MapPin } from 'lucide-react';

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.poNumber?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PortalLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Order History</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage your past orders
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by order ID or PO number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11"
          />
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order, index) => (
            <Card
              key={order.id}
              className="shadow-card hover:shadow-card-hover transition-shadow animate-slide-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardContent className="p-4 lg:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className='flex'>
                      Order Id: &nbsp;
                      <h3 className="font-semibold text-foreground">{order.id}</h3>
                      </span>
                      <StatusBadge status={order.status} />
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{order.date}</span>
                      </div>
                      <span>{order.items.length} item{order.items.length > 1 ? 's' : ''}</span>
                    </div>
                  </div>

                  {/* Items Preview */}
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {order.items.slice(0, 3).map((item, i) => (
                        <div
                          key={item.id}
                          className="w-10 h-10 rounded-lg bg-muted border-2 border-card flex items-center justify-center"
                        >
                          <Package className="h-4 w-4 text-muted-foreground" />
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <div className="w-10 h-10 rounded-lg bg-muted border-2 border-card flex items-center justify-center">
                          <span className="text-xs font-medium text-muted-foreground">
                            +{order.items.length - 3}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Total & Actions */}
                  <div className="flex items-center justify-between lg:justify-end gap-4">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-lg font-bold text-foreground">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedOrder(order)}
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-3">
                            Order {order.id}
                            <StatusBadge status={order.status} />
                          </DialogTitle>
                        </DialogHeader>

                        <div className="space-y-6 mt-4">
                          {/* Order Meta */}
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Order Date</p>
                              <p className="font-medium text-foreground">{order.date}</p>
                            </div>
                            {order.poNumber && (
                              <div>
                                <p className="text-muted-foreground">PO Number</p>
                                <p className="font-medium text-foreground">{order.poNumber}</p>
                              </div>
                            )}
                            {order.trackingNumber && (
                              <div className="col-span-2">
                                <p className="text-muted-foreground">Tracking Number</p>
                                <a
                                  href={`https://www.ups.com/track?tracknum=${order.trackingNumber}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-medium text-secondary hover:underline flex items-center gap-1"
                                >
                                  {order.trackingNumber}
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              </div>
                            )}
                          </div>

                          {/* Items */}
                          <div>
                            <h4 className="font-semibold text-foreground mb-3">Order Items</h4>
                            <div className="space-y-3">
                              {order.items.map((item) => (
                                <div
                                  key={item.id}
                                  className="flex items-center gap-4 p-3 bg-muted rounded-lg"
                                >
                                  <div className="w-12 h-12 rounded-lg bg-background flex items-center justify-center">
                                    <Package className="h-6 w-6 text-muted-foreground" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-foreground truncate">
                                      {item.name}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      {item.sku} • Qty: {item.quantity}
                                    </p>
                                  </div>
                                  <p className="font-semibold text-foreground">
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Total */}
                          <div className="border-t pt-4">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-foreground">Order Total</span>
                              <span className="text-2xl font-bold text-foreground">
                                ${order.total.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-16">
            <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No orders found</h3>
            <p className="text-muted-foreground">
              {searchQuery
                ? 'Try adjusting your search criteria'
                : "You haven't placed any orders yet"}
            </p>
          </div>
        )}
      </div>
    </PortalLayout>
  );
};

export default Orders;
