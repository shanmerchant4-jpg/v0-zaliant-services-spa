# Zaliant Services - Digital Products Storefront

A production-grade Next.js e-commerce platform for digital products, built with TypeScript, Tailwind CSS, and Supabase.

## Features

- Modern dark neon aesthetic with zpurple (#7D5FFF) and zpink (#FF4AD6) accents
- Full e-commerce functionality with cart and promo codes
- Real-time social proof and analytics
- User authentication and profiles
- Admin dashboard for product/order management
- Affiliate program with commission tracking
- Email automation for orders and support
- Advanced animations with Framer Motion
- Fully accessible and responsive design
- SEO optimized with structured data

## Tech Stack

- **Framework**: Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Database**: Supabase (PostgreSQL + Row Level Security)
- **Auth**: Supabase Auth with email/password
- **UI Components**: Radix UI primitives + shadcn/ui
- **Animations**: Framer Motion
- **State**: React Context + localStorage
- **Testing**: Jest + React Testing Library
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm/npm/yarn
- Supabase account (or use local dev)

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/zaliant-services.git
cd zaliant-services
\`\`\`

2. Install dependencies:
\`\`\`bash
pnpm install
# or npm install
# or yarn install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Run database migrations (if using Supabase):
\`\`\`bash
# Execute scripts in order:
# scripts/001_create_tables.sql
# scripts/002_create_policies.sql
# scripts/003_seed_products.sql
\`\`\`

5. Start the development server:
\`\`\`bash
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

\`\`\`
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # User dashboard
│   ├── (admin)/           # Admin pages
│   ├── api/               # API routes
│   └── store/             # Product store pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── context/              # React Context providers
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and services
│   ├── data/            # Content and product data
│   ├── supabase/        # Supabase client utilities
│   └── ...              # Other services
├── public/               # Static assets
├── scripts/              # Database migration scripts
└── styles/               # Global styles

\`\`\`

## Configuration

### Products

Edit products in `lib/data/products.ts`:

\`\`\`typescript
export const seedProducts: Product[] = [
  {
    id: "1",
    title: "Your Product",
    price: 49.99,
    // ... other fields
  },
]
\`\`\`

### Content

Edit site copy in `lib/data/content.ts`:

\`\`\`typescript
export const heroContent = {
  headline: "Welcome to Your Site!",
  subtitle: "Your custom subtitle",
  // ... other content
}
\`\`\`

### Promo Codes

Add promo codes in `lib/data/products.ts`:

\`\`\`typescript
export const PROMO_CODES = {
  MYCODE20: { type: "percent", value: 0.2 },
  FIXED10: { type: "fixed", value: 10 },
}
\`\`\`

## Database Setup

The project uses Supabase with three migration scripts:

1. **001_create_tables.sql** - Creates all database tables
2. **002_create_policies.sql** - Sets up Row Level Security policies
3. **003_seed_products.sql** - Seeds initial products

Run these scripts in your Supabase project or via the Supabase CLI.

## Testing

Run tests with:

\`\`\`bash
pnpm test              # Run all tests
pnpm test:watch        # Watch mode
pnpm test:coverage     # With coverage report
\`\`\`

## Building for Production

\`\`\`bash
pnpm build
pnpm start
\`\`\`

## Docker Support

Build and run with Docker:

\`\`\`bash
docker-compose up
\`\`\`

Or build manually:

\`\`\`bash
docker build -t zaliant-services .
docker run -p 3000:3000 zaliant-services
\`\`\`

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Manual Export

\`\`\`bash
pnpm build
# Upload .next folder to your hosting provider
\`\`\`

## Optional Integrations

### Stripe Payments

1. Uncomment Stripe code in `app/api/checkout/route.ts`
2. Add Stripe keys to `.env.local`
3. Install Stripe SDK: `pnpm add stripe @stripe/stripe-js`

### Email (Resend/SendGrid)

1. Add email provider API key to `.env.local`
2. Uncomment email logic in `lib/email-service.ts`

### Sellhub License Management

1. Create account at Sellhub
2. Add API credentials to `.env.local`
3. Implement `services/sellhub.ts` functions

## Security Notes

- All database tables use Row Level Security (RLS)
- API routes validate inputs
- Authentication tokens are httpOnly cookies
- No sensitive data exposed to client

## Performance

- Next.js App Router with streaming SSR
- Image optimization with next/image
- Code splitting and lazy loading
- Tailwind CSS JIT compilation
- Optimized bundle size

## Accessibility

- Semantic HTML elements
- ARIA attributes on interactive components
- Keyboard navigation support
- Focus management in modals/drawers
- Screen reader tested

## License

MIT License - see LICENSE file

## Support

- Discord: https://discord.gg/zaliant
- Email: support@zaliantservices.com
- Docs: https://docs.zaliantservices.com

## Contributing

Contributions welcome! Please read CONTRIBUTING.md first.
