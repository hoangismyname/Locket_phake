"use client"

import type { User } from "@supabase/supabase-js"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Bell, Shield, HelpCircle, Info, LogOut, ChevronRight, UserIcon, Moon, Sun } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface SettingsMenuProps {
  user: User
  profile: any
}

export function SettingsMenu({ user, profile }: SettingsMenuProps) {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const settingsItems = [
    {
      icon: UserIcon,
      label: "Account",
      href: "/account",
      description: "Manage your account information",
    },
    {
      icon: Bell,
      label: "Notifications",
      href: "/settings/notifications",
      description: "Push notifications and alerts",
    },
    {
      icon: Shield,
      label: "Privacy & Security",
      href: "/settings/privacy",
      description: "Control your privacy settings",
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      href: "#",
      description: "Get help and contact support",
    },
    {
      icon: Info,
      label: "About",
      href: "/settings/about",
      description: "App version and legal information",
    },
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Profile Section */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} />
              <AvatarFallback className="text-lg">
                {profile?.display_name?.[0] || user.email?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold">{profile?.display_name || "User"}</h3>
              <p className="text-sm text-muted-foreground">@{profile?.username || "username"}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Theme Toggle */}
      <Card>
        <CardContent className="p-0">
          <Button variant="ghost" className="w-full justify-between p-4 h-auto" onClick={toggleTheme}>
            <div className="flex items-center gap-3">
              {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <div className="text-left">
                <p className="font-medium">Appearance</p>
                <p className="text-sm text-muted-foreground">
                  {mounted ? (theme === "dark" ? "Dark mode" : "Light mode") : "System"}
                </p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Settings Items */}
      <Card>
        <CardContent className="p-0">
          {settingsItems.map((item, index) => (
            <div key={item.label}>
              <Button
                variant="ghost"
                className="w-full justify-between p-4 h-auto"
                asChild={item.href !== "#"}
                disabled={item.href === "#"}
              >
                {item.href !== "#" ? (
                  <Link href={item.href}>
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <div className="text-left">
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <div className="text-left">
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
              {index < settingsItems.length - 1 && <div className="border-b mx-4" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Sign Out */}
      <Card>
        <CardContent className="p-4">
          <Button variant="destructive" className="w-full" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
