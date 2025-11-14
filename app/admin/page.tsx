"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    activeUsers: 0,
    products: 0,
  })

  useEffect(() => {
    async function loadStats() {
      const supabase = createClient()

      const [ordersRes, productsRes] = await Promise.all([
        supabase.from("orders").select("total_amount"),
        supabase.from("products").select("id"),
      ])

      const totalOrders = ordersRes.data?.length || 0
      const totalRevenue = ordersRes.data?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0
      const products = productsRes.data?.length || 0

      setStats({
        totalOrders,
        totalRevenue,
        activeUsers: 0,
        products,
      })
    }

    loadStats()
  }, [])

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-zpurple mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-zpurple/10 to-zpink/10">
            <p className="text-sm text-muted-foreground">Total Orders</p>
            <p className="text-3xl font-bold text-zpurple">{stats.totalOrders}</p>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-zpurple/10 to-zpink/10">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-3xl font-bold text-zpink">${stats.totalRevenue.toFixed(2)}</p>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-zpurple/10 to-zpink/10">
            <p className="text-sm text-muted-foreground">Products</p>
            <p className="text-3xl font-bold text-zpurple">{stats.products}</p>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-zpurple/10 to-zpink/10">
            <p className="text-sm text-muted-foreground">Active Users</p>
            <p className="text-3xl font-bold text-zpink">{stats.activeUsers}</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/admin/products">
            <Card className="p-6 hover:bg-zpurple/5 cursor-pointer transition">
              <h3 className="text-lg font-semibold text-zpurple mb-2">Manage Products</h3>
              <p className="text-sm text-muted-foreground">Add, edit, or delete products</p>
            </Card>
          </Link>

          <Link href="/admin/orders">
            <Card className="p-6 hover:bg-zpurple/5 cursor-pointer transition">
              <h3 className="text-lg font-semibold text-zpurple mb-2">View Orders</h3>
              <p className="text-sm text-muted-foreground">Manage customer orders</p>
            </Card>
          </Link>

          <Link href="/admin/analytics">
            <Card className="p-6 hover:bg-zpurple/5 cursor-pointer transition">
              <h3 className="text-lg font-semibold text-zpurple mb-2">Analytics</h3>
              <p className="text-sm text-muted-foreground">View sales and user data</p>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
