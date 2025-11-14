"use client"

import { motion } from "framer-motion"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useRouter } from 'next/navigation'
import { Check, Shield } from 'lucide-react'
import { seedProducts } from "@/lib/data/products"
import Link from "next/link"

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = seedProducts.find(p => p.id === params.id)
  const { addItem } = useCart()
  const router = useRouter()

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col relative">
        <Navigation />
        <div className="flex-1 flex items-center justify-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4 glass-card p-12 rounded-lg"
          >
            <p className="text-2xl font-bold">Product not found</p>
            <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
            <Link href="/store">
              <Button className="glow-primary">Back to Store</Button>
            </Link>
          </motion.div>
        </div>
        <Footer />
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
    })
    router.push("/cart")
  }

  return (
    <div className="min-h-screen bg-background relative">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card rounded-lg overflow-hidden sticky top-24"
          >
            <img 
              src={product.images[0] || "/placeholder.svg?height=600&width=600"} 
              alt={product.title} 
              className="w-full h-auto"
            />
            {product.tag && (
              <div className="absolute top-4 left-4">
                <span className="px-4 py-1.5 bg-gradient-to-r from-primary to-accent rounded-full text-sm font-medium">
                  {product.tag}
                </span>
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-muted-foreground">{product.category}</span>
                <span className="px-2 py-0.5 rounded-full text-xs bg-accent/20 text-accent border border-accent/30">
                  Undetected
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-3">{product.title}</h1>
              <p className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Starting at ${product.price.toFixed(2)}
              </p>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">{product.longDescription}</p>

            {product.features && (
              <div className="glass-card rounded-lg p-6 space-y-3">
                <h3 className="font-semibold text-lg mb-4">What's Included</h3>
                {product.features.map((feature: string, i: number) => (
                  <div key={i} className="flex gap-3 items-start">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="glass-card rounded-lg p-4 border-primary/30">
              <div className="flex gap-3 items-start">
                <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium mb-1">Security Guarantee</p>
                  <p className="text-sm text-muted-foreground">{product.shortDescription}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button size="lg" onClick={handleAddToCart} className="flex-1 glow-primary text-lg py-6">
                Add to Cart →
              </Button>
              <Link href="/store">
                <Button size="lg" variant="outline" className="glass-card py-6">
                  Browse More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
