"use client"

import { motion } from "framer-motion"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { Trash2 } from 'lucide-react'
import Link from "next/link"
import PromoCodeInput from "@/components/promo-code-input"
import { PROMO_CODES } from "@/lib/data/products"

export default function CartPage() {
  const { items, removeItem, clearCart, applyPromo, removePromo, promoCode, subtotal, discount, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background relative">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 md:px-8 py-20 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="w-24 h-24 mx-auto rounded-full glass-card flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">Ready to enhance your gaming experience?</p>
            <Link href="/store">
              <Button size="lg" className="glow-primary">Browse Products</Button>
            </Link>
          </motion.div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">{items.length} {items.length === 1 ? 'item' : 'items'} in your cart</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, i) => (
              <motion.div
                key={`${item.id}-${i}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-lg p-6 flex gap-4 hover:border-primary/40 transition-colors"
              >
                {item.image && (
                  <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-24 h-24 object-cover rounded-lg" />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-primary font-bold text-xl">${item.price.toFixed(2)}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)} className="text-destructive hover:bg-destructive/10">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card rounded-lg p-6 h-fit sticky top-24"
          >
            <h2 className="font-bold text-xl mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {promoCode && discount > 0 && (
                <div className="flex justify-between text-accent items-center">
                  <span>Discount ({promoCode})</span>
                  <div className="flex items-center gap-2">
                    <span>-${discount.toFixed(2)}</span>
                    <Button variant="ghost" size="sm" onClick={removePromo} className="h-6 w-6 p-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </Button>
                  </div>
                </div>
              )}

              <div className="border-t border-border pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>

            {!promoCode && (
              <PromoCodeInput onApply={applyPromo} validCodes={Object.keys(PROMO_CODES)} />
            )}

            <Link href="/checkout">
              <Button className="w-full glow-primary mb-3">Proceed to Checkout</Button>
            </Link>

            <Button variant="outline" className="w-full glass-card" onClick={() => clearCart()}>
              Clear Cart
            </Button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
