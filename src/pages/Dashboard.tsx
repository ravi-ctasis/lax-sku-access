import { Link } from 'react-router-dom';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { orders, products, currentCustomer } from '@/data/mockData';
import {
  Package,
  ShoppingCart,
  ClipboardList,
  TrendingUp,
  ArrowRight,
  Clock,
  CheckCircle,
  Truck,
} from 'lucide-react';

const Dashboard = () => {
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;
  const approvedOrders = orders.filter((o) => o.status === 'approved').length;
  const shippedOrders = orders.filter((o) => o.status === 'shipped').length;
  const totalSpent = orders
    .filter((o) => o.status === 'delivered' || o.status === 'shipped')
    .reduce((sum, o) => sum + o.total, 0);

  const recentOrders = orders.slice(0, 3);

  return (
    <PortalLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              Welcome back, {currentCustomer.name.split(' ')[0]}!
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening with your orders today.
            </p>
          </div>
          <Link to="/products">
            <Button className="gap-2">
              Browse Products
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Available Products</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{products.length}</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Package className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-sm text-muted-foreground">
                <span className="text-success font-medium">
                  {currentCustomer.assignedBrands.length} brands
                </span>
                <span>assigned</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Orders</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{pendingOrders}</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-warning" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-sm text-muted-foreground">
                <span>Awaiting admin review</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Transit</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{shippedOrders}</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Truck className="h-6 w-6 text-secondary" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-sm text-muted-foreground">
                <span className="text-secondary font-medium">{approvedOrders} approved</span>
                <span>ready to ship</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-3xl font-bold text-foreground mt-1">
                    ${totalSpent.toLocaleString('en-US', { minimumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-sm text-muted-foreground">
                <span>Across all delivered orders</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <Card className="lg:col-span-2 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
              <Link to="/orders">
                <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-foreground">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between px-6 py-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                        <ClipboardList className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <span className='flex'>Order Id: &nbsp;
                        <p className="font-medium text-foreground">{order.id}</p>
                        </span>
                        <p className="text-sm text-muted-foreground">
                          {order.items.length} item{order.items.length > 1 ? 's' : ''} • {order.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <StatusBadge status={order.status} />
                      <p className="font-semibold text-foreground">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/products" className="block">
                <div className="flex items-center gap-4 p-4 rounded-lg border hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Browse Products</p>
                    <p className="text-sm text-muted-foreground">View assigned SKUs</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Link>

              <Link to="/cart" className="block">
                <div className="flex items-center gap-4 p-4 rounded-lg border hover:border-secondary hover:bg-secondary/5 transition-all cursor-pointer group">
                  <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                    <ShoppingCart className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">View Cart</p>
                    <p className="text-sm text-muted-foreground">Review & checkout</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-secondary transition-colors" />
                </div>
              </Link>

              <Link to="/orders" className="block">
                <div className="flex items-center gap-4 p-4 rounded-lg border hover:border-success hover:bg-success/5 transition-all cursor-pointer group">
                  <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center group-hover:bg-success/20 transition-colors">
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Order History</p>
                    <p className="text-sm text-muted-foreground">Track past orders</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-success transition-colors" />
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </PortalLayout>
  );
};

export default Dashboard;
