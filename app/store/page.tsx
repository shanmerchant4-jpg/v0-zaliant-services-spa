"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import { ProductSkeleton } from "@/components/product-skeleton"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react'
import { seedProducts } from "@/lib/data/products"

export default function StorePage() {
  const [filteredProducts, setFilteredProducts] = useState(seedProducts)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  useEffect(() => {
    let filtered = seedProducts

    if (search) {
      filtered = filtered.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()) || p.shortDescription.toLowerCase().includes(search.toLowerCase()))
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    setFilteredProducts(filtered)
  }, [search, selectedCategory])

  const categories = ["All", ...new Set(seedProducts.map((p) => p.category))]

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  return (
    <div className="min-h-screen bg-background relative">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-20 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Products</span>
          </h1>
          <p className="text-lg text-muted-foreground">Undetected, Secure & Always Updated Gaming Cheats For Every Battle</p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 glass-card border-primary/20 focus:border-primary/50"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat)}
                className={
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-primary to-accent"
                    : "glass-card border-primary/20 hover:border-primary/50"
                }
              >
                {cat}
              </Button>
            ))}
          </div>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-muted-foreground"
          >
            No products found
          </motion.div>
        ) : (
          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="initial"
            animate="animate"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  )
}
