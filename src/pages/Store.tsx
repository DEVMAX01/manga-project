import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, Zap, Crown, Star } from "lucide-react";

const Store = () => {
  const coinPackages = [
    {
      id: 1,
      coins: 100,
      price: 0.99,
      bonus: 0,
      popular: false,
    },
    {
      id: 2,
      coins: 500,
      price: 4.99,
      bonus: 50,
      popular: false,
    },
    {
      id: 3,
      coins: 1000,
      price: 9.99,
      bonus: 150,
      popular: true,
    },
    {
      id: 4,
      coins: 2500,
      price: 19.99,
      bonus: 500,
      popular: false,
    },
    {
      id: 5,
      coins: 5000,
      price: 39.99,
      bonus: 1500,
      popular: false,
    },
  ];

  const premiumFeatures = [
    "Ad-free reading experience",
    "Unlimited bookmarks",
    "Early access to new chapters",
    "Exclusive premium content",
    "Priority customer support",
    "Advanced reading statistics",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Store</h1>
          <p className="text-muted-foreground text-lg">
            Get coins to unlock premium chapters and features
          </p>
        </div>

        {/* Coin Packages */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Coins className="h-6 w-6 text-primary" />
            Coin Packages
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {coinPackages.map((pkg) => (
              <Card key={pkg.id} className={`relative ${pkg.popular ? 'ring-2 ring-primary' : ''}`}>
                {pkg.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Coins className="h-5 w-5 text-primary" />
                    <span className="text-2xl font-bold">{pkg.coins.toLocaleString()}</span>
                  </div>
                  {pkg.bonus > 0 && (
                    <div className="text-sm text-green-600 font-medium">
                      +{pkg.bonus} Bonus Coins
                    </div>
                  )}
                  <div className="text-3xl font-bold">${pkg.price}</div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    Purchase
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Premium Subscription */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Crown className="h-6 w-6 text-primary" />
            Premium Subscription
          </h2>
          
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl flex items-center justify-center gap-2">
                <Crown className="h-8 w-8 text-primary" />
                Premium Monthly
              </CardTitle>
              <CardDescription className="text-lg">
                Unlock the full manga reading experience
              </CardDescription>
              <div className="text-4xl font-bold mt-4">$9.99/month</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {premiumFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full" size="lg">
                Subscribe to Premium
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Daily Rewards */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            Daily Rewards
          </h2>
          
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle>Daily Login Bonus</CardTitle>
              <CardDescription>
                Get free coins every day just by logging in!
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="flex items-center justify-center gap-1">
                <Coins className="h-6 w-6 text-primary" />
                <span className="text-2xl font-bold">+50 Coins</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Come back tomorrow for your next reward
              </p>
              <Button className="w-full" disabled>
                Claimed Today
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Store;