import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, CreditCard, Shield, Zap, Gift } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShopModal = ({ isOpen, onClose }: ShopModalProps) => {
  const [coinAmount, setCoinAmount] = useState(50);
  const [paypalEmail, setPaypalEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Base rate: 50 coins = $3 (configurable)
  const baseCoins = 50;
  const basePrice = 3;
  const pricePerCoin = basePrice / baseCoins; // $0.06 per coin
  
  const usdAmount = (coinAmount * pricePerCoin).toFixed(2);

  const handleCoinAmountChange = (value: string) => {
    const amount = parseInt(value) || 0;
    if (amount >= 0 && amount <= 10000) {
      setCoinAmount(amount);
    }
  };

  const handleUsdAmountChange = (value: string) => {
    const amount = parseFloat(value) || 0;
    if (amount >= 0 && amount <= 600) {
      const coins = Math.round(amount / pricePerCoin);
      setCoinAmount(coins);
    }
  };

  const handlePurchase = async () => {
    if (!paypalEmail) {
      toast({
        title: "Email Required",
        description: "Please enter your PayPal email address",
        variant: "destructive"
      });
      return;
    }

    if (coinAmount < 10) {
      toast({
        title: "Minimum Purchase",
        description: "Minimum purchase is 10 coins",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Purchase Successful!",
        description: `You've successfully purchased ${coinAmount} coins for $${usdAmount}`,
      });
      setIsProcessing(false);
      onClose();
      setCoinAmount(50);
      setPaypalEmail("");
    }, 2000);
  };

  const quickAmounts = [
    { coins: 50, bonus: 0, popular: false },
    { coins: 100, bonus: 10, popular: false },
    { coins: 250, bonus: 35, popular: true },
    { coins: 500, bonus: 85, popular: false },
    { coins: 1000, bonus: 200, popular: false },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Coins className="h-6 w-6 text-primary" />
            Purchase Coins
          </DialogTitle>
          <DialogDescription>
            Buy coins to unlock premium content and support your favorite creators
          </DialogDescription>
        </DialogHeader>

        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          {/* Left Side - Purchase Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Custom Amount</CardTitle>
                <CardDescription>
                  Enter your desired amount or select from quick options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="coins">Coins</Label>
                    <div className="relative">
                      <Coins className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="coins"
                        type="number"
                        value={coinAmount}
                        onChange={(e) => handleCoinAmountChange(e.target.value)}
                        placeholder="50"
                        className="pl-10"
                        min="10"
                        max="10000"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="usd">USD Amount</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        id="usd"
                        type="number"
                        value={usdAmount}
                        onChange={(e) => handleUsdAmountChange(e.target.value)}
                        placeholder="3.00"
                        className="pl-8"
                        step="0.01"
                        min="0.60"
                        max="600"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                  <div className="flex justify-between">
                    <span>Rate:</span>
                    <span>${pricePerCoin.toFixed(3)} per coin</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Coins:</span>
                    <span className="font-medium">{coinAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total Cost:</span>
                    <span>${usdAmount}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paypal">PayPal Email</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="paypal"
                      type="email"
                      value={paypalEmail}
                      onChange={(e) => setPaypalEmail(e.target.value)}
                      placeholder="your-email@example.com"
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button 
                  onClick={handlePurchase} 
                  className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                  disabled={isProcessing}
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Purchase ${usdAmount}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Security & Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Why Choose Our Coins?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>Secure PayPal payment processing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Zap className="h-4 w-4 text-blue-500" />
                    <span>Instant coin delivery</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Gift className="h-4 w-4 text-purple-500" />
                    <span>Support your favorite creators</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Quick Purchase Options */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Purchase Options</h3>
              <div className="space-y-3">
                {quickAmounts.map((option) => (
                  <Card 
                    key={option.coins}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      option.popular ? 'ring-2 ring-primary bg-primary/5' : ''
                    } ${coinAmount === option.coins + option.bonus ? 'bg-primary/10 ring-1 ring-primary' : ''}`}
                    onClick={() => setCoinAmount(option.coins + option.bonus)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <Coins className="h-4 w-4 text-primary" />
                              <span className="font-semibold">
                                {(option.coins + option.bonus).toLocaleString()} Coins
                              </span>
                              {option.popular && (
                                <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                                  Most Popular
                                </span>
                              )}
                            </div>
                            {option.bonus > 0 && (
                              <span className="text-sm text-green-600 font-medium">
                                +{option.bonus} bonus coins!
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">
                            ${((option.coins + option.bonus) * pricePerCoin).toFixed(2)}
                          </div>
                          {option.bonus > 0 && (
                            <div className="text-xs text-muted-foreground line-through">
                              ${(option.coins * pricePerCoin).toFixed(2)}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-4">
                <div className="text-center space-y-2">
                  <Gift className="h-8 w-8 text-primary mx-auto" />
                  <h4 className="font-semibold">First Purchase Bonus</h4>
                  <p className="text-sm text-muted-foreground">
                    Get 20% extra coins on your first purchase!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};