"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LogOut, Settings, ShoppingBag, Heart } from "lucide-react"
import { useRouter } from "next/navigation"

interface UserProfile {
  id: string
  email?: string
  full_name?: string
  username?: string
  avatar_url?: string
}

export default function Dashboard() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function loadUserProfile() {
      const supabase = createClient()

      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()

      if (!authUser) {
        router.push("/auth/login")
        return
      }

      // Fetch profile data
      const { data: profile } = await supabase.from("profiles").select("*").eq("id", authUser.id).single()

      setUser({
        id: authUser.id,
        email: authUser.email,
        ...profile,
      })
      setLoading(false)
    }

    loadUserProfile()
  }, [router])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>

  if (!user) return null

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Welcome back, {user.full_name || "User"}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2 bg-transparent">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link href="/store">
            <Card className="p-6 hover:bg-primary/5 cursor-pointer transition border-primary/20">
              <ShoppingBag className="w-8 h-8 text-primary mb-2" />
              <h3 className="text-lg font-semibold text-primary">Browse Products</h3>
              <p className="text-sm text-muted-foreground">Explore our catalog</p>
            </Card>
          </Link>

          <Link href="/dashboard/wishlist">
            <Card className="p-6 hover:bg-accent/5 cursor-pointer transition border-accent/20">
              <Heart className="w-8 h-8 text-accent mb-2" />
              <h3 className="text-lg font-semibold text-accent">Wishlist</h3>
              <p className="text-sm text-muted-foreground">View saved items</p>
            </Card>
          </Link>

          <Link href="/dashboard/settings">
            <Card className="p-6 hover:bg-primary/5 cursor-pointer transition border-primary/20">
              <Settings className="w-8 h-8 text-primary mb-2" />
              <h3 className="text-lg font-semibold text-primary">Settings</h3>
              <p className="text-sm text-muted-foreground">Manage your account</p>
            </Card>
          </Link>
        </div>

        {/* Recent Orders */}
        <Card className="p-6 border-primary/20">
          <h2 className="text-xl font-bold text-primary mb-4">Recent Orders</h2>
          <p className="text-muted-foreground text-center py-8">No orders yet. Start shopping!</p>
        </Card>
      </div>
    </div>
  )
}
