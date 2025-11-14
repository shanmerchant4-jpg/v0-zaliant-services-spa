"use client"

import { motion } from "framer-motion"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle } from "lucide-react"

export default function CheckoutPage() {
  const { items, clearCart } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const total = items.reduce((sum, item) => sum + item.price, 0)

  const handleCheckout = async () => {
    setIsProcessing(true)

    // Simulate payment processing (demo mode)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setOrderComplete(true)
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-2xl mx-auto px-4 md:px-8 py-20 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="mb-6"
          >
            <CheckCircle className="w-24 h-24 text-accent mx-auto" />
          </motion.div>

          <h1 className="text-4xl font-bold mb-4">Order Complete!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for your purchase. Check your email for activation details.
          </p>

          <Button
            onClick={() => {
              clearCart()
              router.push("/store")
            }}
          >
            Continue Shopping
          </Button>
        </main>
        <Footer />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-2xl mx-auto px-4 md:px-8 py-20">
          <Button onClick={() => router.push("/cart")}>Back to Cart</Button>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-2xl mx-auto px-4 md:px-8 py-12">
        <h1 className="text-4xl font-bold mb-12">Checkout</h1>

        <div className="grid gap-8">
          {/* Order Review */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border border-border rounded-lg p-6 bg-card/50"
          >
            <h2 className="font-bold text-xl mb-4">Order Review</h2>
            <div className="space-y-3 mb-6">
              {items.map((item, i) => (
                <div key={i} className="flex justify-between pb-3 border-b border-border/50">
                  <span>{item.name}</span>
                  <span className="font-semibold">${item.price}</span>
                </div>
              ))}
              <div className="flex justify-between pt-3 text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>

          {/* Payment Form (Demo) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-primary/30 rounded-lg p-6 bg-card/50 space-y-6"
          >
            <h2 className="font-bold text-xl">Payment Details (Demo)</h2>

            <div className="space-y-3 p-4 bg-muted/20 rounded border border-border text-sm text-muted-foreground">
              <p>Demo Mode: Use any card number to complete your order</p>
              <p>Card: 4242 4242 4242 4242</p>
              <p>Expiry: 12/25</p>
              <p>CVC: 123</p>
            </div>

            <Button size="lg" onClick={handleCheckout} disabled={isProcessing} className="w-full glow-accent">
              {isProcessing ? "Processing..." : `Complete Purchase - $${total.toFixed(2)}`}
            </Button>

            <Button variant="outline" className="w-full bg-transparent" onClick={() => router.push("/cart")}>
              Back to Cart
            </Button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
