"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [fullName, setFullName] = useState("")
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient()
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()

      if (!authUser) {
        router.push("/auth/login")
        return
      }

      const { data: profile } = await supabase.from("profiles").select("*").eq("id", authUser.id).single()

      setUser(authUser)
      if (profile) {
        setFullName(profile.full_name || "")
        setUsername(profile.username || "")
      }
      setLoading(false)
    }

    loadProfile()
  }, [router])

  const handleSave = async () => {
    if (!user) return

    setSaving(true)
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          username: username,
        })
        .eq("id", user.id)

      if (error) throw error

      // Success - maybe show a toast notification
    } catch (error) {
      console.error("Error saving profile:", error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/dashboard" className="flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold text-primary mb-6">Account Settings</h1>

        <Card className="p-6 border-primary/20 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <Input value={user?.email} disabled />
            <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your full name" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Choose a username" />
          </div>

          <Button onClick={handleSave} disabled={saving} className="w-full bg-primary hover:bg-primary/90">
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </Card>
      </div>
    </div>
  )
}
