"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { GlassCard } from "./glass-card"
import { ScrollReveal } from "./scroll-reveal"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import PriceAnimator from "./price-animator"
import { WishlistButton } from "./wishlist-button"

interface Product {
  id: string
  name: string
  price: number
  description: string
  features?: string[]
  image_url?: string
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <ScrollReveal direction="up">
      <motion.div whileHover={{ y: -8 }} className="group">
        <GlassCard className="overflow-hidden h-full">
          {/* Image Container */}
          <div className="relative overflow-hidden h-64 bg-gradient-to-br from-primary/20 to-accent/20">
            <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <WishlistButton productId={product.id} className="bg-black/50 backdrop-blur-sm hover:bg-black/70" />
            </div>
            <motion.img
              src={product.image_url || "/placeholder.svg?height=256&width=400"}
              alt={product.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                {product.name}
              </h3>
              <motion.p
                className="text-3xl font-bold text-accent"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
              >
                <PriceAnimator price={product.price} />
              </motion.p>
            </div>

            <p className="text-sm text-muted-foreground">{product.description}</p>

            <ul className="space-y-2 text-sm">
              {product.features?.slice(0, 2).map((feature, i) => (
                <motion.li
                  key={i}
                  className="flex gap-2 text-muted-foreground"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="text-accent">•</span>
                  {feature}
                </motion.li>
              ))}
            </ul>

            <Link href={`/store/${product.id}`}>
              <Button className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg shadow-primary/30 glow-primary group/btn gap-2">
                View Details
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </GlassCard>
      </motion.div>
    </ScrollReveal>
  )
}
