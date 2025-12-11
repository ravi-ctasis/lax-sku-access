import { Link } from 'react-router-dom';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { orders, products, currentCustomer } from '@/data/mockData';
import { HorizontalProductScroll } from '@/components/products/HorizontalProductScroll';
import { Progress } from '@/components/ui/progress';
import {
  Package,
  ShoppingCart,
  ClipboardList,
  TrendingUp,
  ArrowRight,
  Clock,
  CheckCircle,
  Truck,
  Heart,
  Sparkles,
  Calendar,
  CreditCard,
} from 'lucide-react';

const Dashboard = () => {
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;
  const approvedOrders = orders.filter((o) => o.status === 'approved').length;
  const shippedOrders = orders.filter((o) => o.status === 'shipped').length;
  const deliveredOrders = orders.filter((o) => o.status === 'delivered').length;
  const totalOrders = orders.length;
  const totalSpent = orders
    .filter((o) => o.status === 'delivered' || o.status === 'shipped')
    .reduce((sum, o) => sum + o.total, 0);

  const recentOrders = orders.slice(0, 4);
  const featuredProducts = products.slice(0, 10);

  // Calculate order completion percentage
  const completionRate = totalOrders > 0 ? Math.round((deliveredOrders / totalOrders) * 100) : 0;

  return (
    <PortalLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Hero Welcome Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-secondary p-8 lg:p-10">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/20 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/10 rounded-full translate-x-1/4 translate-y-1/4" />
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white/90 text-sm">
                <Sparkles className="h-4 w-4" />
                <span>Welcome to your portal</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white">
                Hello, {currentCustomer.name.split(' ')[0]}! 👋
              </h1>
              <p className="text-white/80 text-lg max-w-xl">
                Track your orders, discover new products, and manage your account all in one place.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link to="/products">
                  <Button variant="secondary" className="gap-2 bg-white text-primary hover:bg-white/90">
                    <Package className="h-4 w-4" />
                    Browse Products
                  </Button>
                </Link>
                <Link to="/wishlist">
                  <Button variant="ghost" className="gap-2 text-white border-white/30 border hover:bg-white/10">
                    <Heart className="h-4 w-4" />
                    My Wishlist
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex gap-4 lg:gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center min-w-[100px]">
                <p className="text-3xl lg:text-4xl font-bold text-white">{totalOrders}</p>
                <p className="text-white/70 text-sm">Total Orders</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center min-w-[100px]">
                <p className="text-3xl lg:text-4xl font-bold text-white">{products.length}</p>
                <p className="text-white/70 text-sm">Products</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1 duration-300 border-l-4 border-l-warning">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Pending Orders</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{pendingOrders}</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-warning" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">Awaiting review</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1 duration-300 border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Approved</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{approvedOrders}</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">Ready to ship</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1 duration-300 border-l-4 border-l-secondary">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">In Transit</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{shippedOrders}</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Truck className="h-6 w-6 text-secondary" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">On the way</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1 duration-300 border-l-4 border-l-success">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Total Spent</p>
                  <p className="text-3xl font-bold text-foreground mt-1">
                    ${totalSpent.toLocaleString('en-US', { minimumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">Lifetime value</p>
            </CardContent>
          </Card>
        </div>

        {/* Order Progress & Quick Actions Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Progress Card */}
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Order Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-4">
                <div className="relative inline-flex items-center justify-center">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      className="text-muted"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${completionRate * 3.52} 352`}
                      className="text-success transition-all duration-1000"
                    />
                  </svg>
                  <span className="absolute text-3xl font-bold text-foreground">{completionRate}%</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Completion Rate</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Delivered</span>
                  <span className="font-semibold text-success">{deliveredOrders}</span>
                </div>
                <Progress value={(deliveredOrders / totalOrders) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-card lg:col-span-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link to="/products" className="block">
                  <div className="flex items-center gap-4 p-4 rounded-xl border hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-md">
                      <Package className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">Browse Products</p>
                      <p className="text-sm text-muted-foreground">{products.length} items available</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>

                <Link to="/cart" className="block">
                  <div className="flex items-center gap-4 p-4 rounded-xl border hover:border-secondary hover:bg-secondary/5 transition-all cursor-pointer group">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center shadow-md">
                      <ShoppingCart className="h-6 w-6 text-secondary-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">View Cart</p>
                      <p className="text-sm text-muted-foreground">Review & checkout</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>

                <Link to="/orders" className="block">
                  <div className="flex items-center gap-4 p-4 rounded-xl border hover:border-success hover:bg-success/5 transition-all cursor-pointer group">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-success to-success/70 flex items-center justify-center shadow-md">
                      <ClipboardList className="h-6 w-6 text-success-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">Order History</p>
                      <p className="text-sm text-muted-foreground">{totalOrders} total orders</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-success group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>

                <Link to="/profile" className="block">
                  <div className="flex items-center gap-4 p-4 rounded-xl border hover:border-warning hover:bg-warning/5 transition-all cursor-pointer group">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-warning to-warning/70 flex items-center justify-center shadow-md">
                      <CreditCard className="h-6 w-6 text-warning-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">Account Settings</p>
                      <p className="text-sm text-muted-foreground">Manage profile</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-warning group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-primary" />
              Recent Orders
            </CardTitle>
            <Link to="/orders">
              <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-foreground">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {recentOrders.map((order, index) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between px-6 py-4 hover:bg-muted/50 transition-colors"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                      <Package className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Order #{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.items.length} item{order.items.length > 1 ? 's' : ''} • {order.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status={order.status} />
                    <p className="font-bold text-foreground min-w-[80px] text-right">
                      ${order.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Featured Products */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-warning" />
                Featured Products
              </h2>
              <p className="text-muted-foreground text-sm mt-1">Discover our top picks for you</p>
            </div>
            <Link to="/products">
              <Button variant="outline" size="sm" className="gap-1">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <HorizontalProductScroll products={featuredProducts} />
        </div>
      </div>
    </PortalLayout>
  );
};

export default Dashboard;
