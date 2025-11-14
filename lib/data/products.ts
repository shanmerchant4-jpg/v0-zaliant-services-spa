export interface Product {
  id: string
  title: string
  slug: string
  shortDescription: string
  longDescription: string
  price: number
  images: string[]
  category: string
  tags: string[]
  features?: string[]
  specs?: Record<string, string>
  badge?: string
  status?: "available" | "sold_out" | "coming_soon"
}

export const seedProducts: Product[] = [
  {
    id: "1",
    title: "Valorant Private",
    slug: "valorant-private",
    shortDescription: "Private build low ban chance.",
    longDescription:
      "Private build with minimal detection risk. Designed for competitive players who need reliability and performance.",
    price: 14.99,
    images: ["/valorant-pro-gaming-tool-purple-neon.jpg"],
    category: "gaming",
    tags: ["valorant", "competitive", "private"],
    features: [
      "Windows 10/11",
      "Intel/Amd",
      "Enable Aimbot",
    ],
    specs: {
      Platform: "Windows 10/11",
      Support: "Discord + Email",
      Updated: "6/11/2025",
    },
    badge: "Undetected",
    status: "available",
  },
  {
    id: "2",
    title: "Valorant Pro",
    slug: "valorant-pro",
    shortDescription: "Included vanguard bypass low ban chance",
    longDescription:
      "Advanced Valorant tool with vanguard bypass technology. Low detection rate with regular updates and priority support.",
    price: 14.99,
    images: ["/valorant-pro-gaming-tool-purple-neon.jpg"],
    category: "gaming",
    tags: ["valorant", "competitive", "bypass"],
    features: [
      "Windows 10/11",
      "Intel/Amd",
      "Vanguard Bypass included",
    ],
    specs: {
      Platform: "Windows 10/11",
      Support: "Priority Discord",
      Updated: "6/11/2025",
    },
    badge: "Undetected",
    status: "available",
  },
  {
    id: "3",
    title: "Permanent Spoofer",
    slug: "permanent-spoofer",
    shortDescription: "Permanent hardware ID spoofing solution",
    longDescription:
      "Enterprise-grade HWID spoofing with permanent configuration. Supports all major hardware components with automatic detection.",
    price: 14.99,
    images: ["/hwid-spoofer-security-tool-cyberpunk-neon.jpg"],
    category: "security",
    tags: ["privacy", "hwid", "permanent"],
    features: [
      "Permanent HWID spoofing",
      "Windows 10-11 support",
      "Intel & AMD compatible",
    ],
    specs: {
      Platform: "Windows 10/11",
      Support: "Priority Discord",
      Updated: "8/11/2025",
    },
    badge: "Undetected",
    status: "available",
  },
]

export const PROMO_CODES = {
  WELCOME10: { type: "fixed", value: 10, description: "Welcome bonus" },
  ZALIANT20: { type: "percent", value: 0.2, description: "20% off" },
  SAVE20: { type: "percent", value: 0.2, description: "20% discount" },
  SUMMER15: { type: "percent", value: 0.15, description: "Summer sale 15%" },
} as const
