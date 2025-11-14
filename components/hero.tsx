import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Shield, Zap, Clock, Award, Users, ShoppingBag, Star, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

const Hero = ({ scrollToProducts }) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Animated Background with Glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      
      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 border-2 border-primary/40 rotate-45 shadow-glow"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute top-40 right-20 w-24 h-24 border-2 border-primary/30 rounded-full shadow-glow"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-32 left-1/4 w-40 h-40 border-2 border-primary/35 shadow-glow"
          style={{ clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)" }}
          animate={{ rotate: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/3 w-28 h-28 border-2 border-primary/40 rotate-12 shadow-glow"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-primary-glow/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>
      
      <div className="container relative z-10 mx-auto px-4">
        {/* Top Stats Badges */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="glass px-5 py-2.5 border-primary/40 shadow-glow hover:shadow-glow-lg hover:scale-105 transition-all duration-300">
            <Shield className="w-4 h-4 mr-2 text-primary" />
            <span className="font-semibold">Trusted by 1,500+ Users</span>
          </Badge>
          <Badge className="glass px-5 py-2.5 border-primary/40 shadow-glow hover:shadow-glow-lg hover:scale-105 transition-all duration-300">
            <Users className="w-4 h-4 mr-2 text-primary" />
            <span className="font-semibold">350 Online Now</span>
          </Badge>
          <Badge className="glass px-5 py-2.5 border-primary/40 shadow-glow hover:shadow-glow-lg hover:scale-105 transition-all duration-300">
            <Award className="w-4 h-4 mr-2 text-primary" />
            <span className="font-semibold">100% Secure</span>
          </Badge>
        </motion.div>
        
        <div className="flex flex-col items-center text-center space-y-8">
          
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Welcome to{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
                Zaliant Services!
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary-glow/20 to-primary/20 blur-xl opacity-50 animate-glow-pulse" />
            </span>
          </motion.h1>
 
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Premium products crafted to enhance your gameplay and dominate your opponents
            with ease.
          </motion.p>
          
          {/* Feature Cards with Glassmorphism */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="glass-card p-8 hover:scale-105 transition-all duration-500 group cursor-pointer">
              <div className="relative">
                <Shield className="w-12 h-12 text-primary mb-4 mx-auto group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">Undetected</h3>
              <p className="text-sm text-muted-foreground">Advanced protection keeps you safe</p>
            </div>
            
            <div className="glass-card p-8 hover:scale-105 transition-all duration-500 group cursor-pointer">
              <div className="relative">
                <Zap className="w-12 h-12 text-primary mb-4 mx-auto group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">Instant Delivery</h3>
              <p className="text-sm text-muted-foreground">Get access immediately after purchase</p>
            </div>
            
            <div className="glass-card p-8 hover:scale-105 transition-all duration-500 group cursor-pointer">
              <div className="relative">
                <Clock className="w-12 h-12 text-primary mb-4 mx-auto group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">Our team is always here to help</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button 
              onClick={scrollToProducts}
              variant="hero" 
              size="lg" 
              className="text-lg px-8 py-6 h-auto group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Store
                <ShoppingBag className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
            <Button 
              onClick={() => window.open('https://status.zaliantservices.com', '_blank')}
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 h-auto border-primary/50 hover:bg-primary/20 hover:shadow-glow group"
            >
              <span className="flex items-center gap-2">
                Check Status
                <TrendingUp className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform" />
              </span>
            </Button>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl mt-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <div className="glass-card p-6 text-center hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold mb-1">99.9%</div>
              <div className="text-sm text-muted-foreground font-medium mb-3">Uptime</div>
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-muted/20">
                <div className="h-full bg-gradient-to-r from-primary via-primary-glow to-accent" style={{ width: '99%' }}></div>
              </div>
            </div>
            
            <div className="glass-card p-6 text-center hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <ShoppingBag className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold mb-1">3.5K+</div>
              <div className="text-sm text-muted-foreground font-medium mb-3">Products Sold</div>
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-muted/20">
                <div className="h-full bg-gradient-to-r from-primary via-primary-glow to-accent" style={{ width: '92%' }}></div>
              </div>
            </div>
            
            <div className="glass-card p-6 text-center hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <Star className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold mb-1">4.98</div>
              <div className="text-sm text-muted-foreground font-medium mb-3">Avg Rating</div>
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-muted/20">
                <div className="h-full bg-gradient-to-r from-primary via-primary-glow to-accent" style={{ width: '98%' }}></div>
              </div>
            </div>
            
            <div className="glass-card p-6 text-center hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold mb-1">24/7</div>
              <div className="text-sm text-muted-foreground font-medium mb-3">Support</div>
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-muted/20">
                <div className="h-full bg-gradient-to-r from-primary via-primary-glow to-accent" style={{ width: '100%' }}></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
