"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface DailyStat {
  date: string
  orders: number
  revenue: number
}

export default function AnalyticsPage() {
  const [dailyStats, setDailyStats] = useState<DailyStat[]>([])
  const [topProducts, setTopProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAnalytics() {
      const supabase = createClient()

      // Get orders data
      const { data: orders } = await supabase.from("orders").select("*").order("created_at", { ascending: true })

      // Process daily stats
      const stats: Record<string, { orders: number; revenue: number }> = {}
      orders?.forEach((order) => {
        const date = new Date(order.created_at).toLocaleDateString()
        if (!stats[date]) {
          stats[date] = { orders: 0, revenue: 0 }
        }
        stats[date].orders += 1
        stats[date].revenue += order.total_amount || 0
      })

      const chartData = Object.entries(stats).map(([date, data]) => ({
        date,
        ...data,
      }))

      setDailyStats(chartData)

      // Get top products
      const { data: analytics } = await supabase
        .from("analytics")
        .select("product_id, event_type")
        .eq("event_type", "purchase")

      const productCounts: Record<string, number> = {}
      analytics?.forEach((a) => {
        productCounts[a.product_id] = (productCounts[a.product_id] || 0) + 1
      })

      const top = Object.entries(productCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([id, count]) => ({ id, count }))

      setTopProducts(top)
      setLoading(false)
    }

    loadAnalytics()
  }, [])

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <Link href="/admin" className="flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Admin
        </Link>

        <h1 className="text-3xl font-bold text-primary mb-8">Analytics Dashboard</h1>

        {/* Revenue & Orders Chart */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold text-primary mb-4">Revenue & Orders Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="date" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#7D5FFF" strokeWidth={2} />
              <Line type="monotone" dataKey="orders" stroke="#FF4AD6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Top Products */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-primary mb-4">Top Selling Products</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="id" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Bar dataKey="count" fill="#7D5FFF" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}
