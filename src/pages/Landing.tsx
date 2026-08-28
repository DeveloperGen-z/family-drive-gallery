import { motion } from "framer-motion";
import {
  Camera,
  Heart,
  Image as ImageIcon,
  Star,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const features = [
  {
    icon: Camera,
    title: "Beautiful Gallery",
    desc: "Every cherished moment displayed in a warm, inviting gallery that feels like flipping through a family photo album.",
  },
  {
    icon: ImageIcon,
    title: "Easy Downloads",
    desc: "Save your favorite memories with one click. High-quality photos ready to print, share, or frame.",
  },
  {
    icon: Heart,
    title: "Safe & Private",
    desc: "Your family photos stay secure. Only people with the link can view your treasured memories.",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    text: "Finally a way to share family photos that everyone can actually use! Grandma figured it out in minutes.",
    stars: 5,
  },
  {
    name: "David R.",
    text: "We use this for every reunion now. The gallery is beautiful and downloading photos is so simple.",
    stars: 5,
  },
  {
    name: "Emily K.",
    text: "Love the warm, cozy feel of the whole experience. It really feels like a family photo album.",
    stars: 5,
  },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* ─── Navbar ─── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50"
      >
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center size-9 rounded-xl bg-primary/10">
              <Camera className="size-5 text-primary" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Family Drive Gallery
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/auth")}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign in
            </button>
            <button
              onClick={() => navigate("/auth")}
              className="px-5 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all shadow-sm"
            >
              Get Started
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ─── Hero ─── */}
      <section className="relative">
        {/* Warm gradient wash behind hero */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-accent/30 blur-[120px]" />
          <div className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />
        </div>

        <div className="mx-auto max-w-5xl px-6 pt-24 pb-20 text-center">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 backdrop-blur px-4 py-1.5 text-sm text-muted-foreground mb-8"
          >
            <Heart className="size-3.5 text-primary fill-primary" />
            Trusted by thousands of families
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.08]"
          >
            Your family moments,{" "}
            <span className="text-primary">beautifully shared</span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            A warm, elegant gallery for your cherished family photos. Browse,
            admire, and download your favorite memories — all in one place.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => navigate("/auth")}
              className="group flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground rounded-xl text-base font-medium hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
            >
              View the Gallery
              <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <a
              href="#features"
              className="flex items-center gap-2 px-6 py-3.5 text-base font-medium text-muted-foreground hover:text-foreground border border-border/60 rounded-xl hover:bg-card/50 transition-all"
            >
              Learn more
              <ChevronRight className="size-4" />
            </a>
          </motion.div>

          {/* Hero image mockup */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-16 relative mx-auto max-w-3xl"
          >
            <div className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur shadow-2xl shadow-primary/5 overflow-hidden p-2">
              <div className="rounded-xl bg-muted/50 grid grid-cols-3 gap-2 p-2 aspect-[16/9]">
                {[
                  "bg-primary/15",
                  "bg-accent/25",
                  "bg-primary/10",
                  "bg-accent/20",
                  "bg-primary/20",
                  "bg-accent/15",
                ].map((bg, i) => (
                  <motion.div
                    key={i}
                    className={`rounded-lg ${bg} flex items-center justify-center`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.08, duration: 0.5 }}
                  >
                    <ImageIcon className="size-6 text-primary/20" />
                  </motion.div>
                ))}
              </div>
            </div>
            {/* Soft glow behind mockup */}
            <div className="absolute -inset-8 -z-10 rounded-3xl bg-primary/5 blur-2xl" />
          </motion.div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section id="features" className="py-24 relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Everything your family needs
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-lg mx-auto">
              Simple, beautiful, and secure — built for sharing moments that
              matter.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group rounded-2xl border border-border/50 bg-card/60 backdrop-blur p-7 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex items-center justify-center size-11 rounded-xl bg-primary/10 text-primary mb-5 group-hover:bg-primary/15 transition-colors">
                  <f.icon className="size-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Loved by families everywhere
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              See what people are saying about their experience.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="rounded-2xl border border-border/50 bg-card/60 backdrop-blur p-7"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <Star
                      key={si}
                      className="size-4 text-primary fill-primary"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 italic">
                  "{t.text}"
                </p>
                <p className="text-sm font-semibold">{t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl bg-primary text-primary-foreground px-10 py-16 text-center overflow-hidden"
          >
            <div className="absolute inset-0 -z-0">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 blur-[60px]" />
            </div>
            <div className="relative z-10">
              <Heart className="size-8 mx-auto mb-5 opacity-80" />
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Start sharing your memories
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8 max-w-md mx-auto">
                Create your family gallery in seconds. No complicated setup, no
                fuss — just beautiful photos.
              </p>
              <button
                onClick={() => navigate("/auth")}
                className="group inline-flex items-center gap-2 px-8 py-3.5 bg-white text-foreground rounded-xl text-base font-medium hover:bg-white/90 transition-all shadow-md"
              >
                Open the Gallery
                <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border/50 py-10">
        <div className="mx-auto max-w-5xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Camera className="size-4 text-primary" />
            <span className="text-sm font-medium">Family Drive Gallery</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Made with{" "}
            <Heart className="inline size-3 text-primary fill-primary" /> for
            families everywhere.
          </p>
        </div>
      </footer>
    </div>
  );
}
