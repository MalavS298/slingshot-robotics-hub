import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Heart, Users, Lightbulb, Target, Mail, MapPin, ChevronDown } from "lucide-react";

const nav = [
  { to: "/about", label: "About" },
  { to: "/robot", label: "Robot" },
  { to: "/past-seasons", label: "Past Seasons" },
  { to: "/outreach", label: "Outreach" },
  { to: "/sponsorship", label: "Sponsorship" },
  { to: "/team", label: "Team" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display text-xl font-bold text-primary">Slingshot</span>
          <span className="text-xs text-muted-foreground">#20240</span>
        </Link>
        <nav className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="text-foreground hover:text-primary" activeProps={{ className: "text-primary font-semibold" }}>
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-primary py-8 text-center text-sm text-primary-foreground">
      <p className="font-display">Slingshot #20240</p>
      <p className="mt-1 opacity-80">A FIRST Tech Challenge Robotics Team</p>
    </footer>
  );
}

export function SectionHead({ eyebrow, title, accent, sub }: { eyebrow?: string; title: string; accent?: string; sub: string }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      {eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>}
      <h2 className="font-display text-4xl font-bold md:text-5xl">
        {title} {accent && <span className="text-primary">{accent}</span>}
      </h2>
      <p className="mt-4 text-lg text-muted-foreground">{sub}</p>
    </div>
  );
}

function Section({ children, alt }: { children: ReactNode; alt?: boolean }) {
  return <section className={`px-4 py-20 ${alt ? "bg-secondary" : "bg-background"}`}><div className="mx-auto max-w-6xl">{children}</div></section>;
}

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-hero px-4 text-center text-primary-foreground">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative">
        <span className="rounded-full bg-primary-foreground/15 px-4 py-1.5 text-sm font-semibold">FTC Robotics Team</span>
        <h1 className="mt-6 font-display text-6xl font-black md:text-8xl">Slingshot</h1>
        <p className="mt-2 font-display text-3xl font-bold opacity-90">#20240</p>
        <p className="mx-auto mt-6 max-w-xl text-lg opacity-90">Launching ideas into reality. We're a passionate team dedicated to innovation, teamwork, and having fun!</p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/team" className="rounded-lg bg-card px-6 py-3 font-semibold text-primary shadow hover:opacity-90">Meet The Team</Link>
          <Link to="/robot" className="rounded-lg bg-card px-6 py-3 font-semibold text-primary shadow hover:opacity-90">Our Robot</Link>
        </div>
      </div>
      <Link to="/about" className="absolute bottom-6 flex flex-col items-center text-sm opacity-80">Learn More<ChevronDown className="h-4 w-4" /></Link>
    </section>
  );
}

const values = [
  { icon: Heart, t: "Passion", d: "We love what we do and it shows in everything we build." },
  { icon: Users, t: "Teamwork", d: "Together we achieve more than we ever could alone." },
  { icon: Lightbulb, t: "Creativity", d: "We think outside the box to solve complex challenges." },
  { icon: Target, t: "Dedication", d: "We put in the work to make our ideas come to life." },
];

export function About() {
  return (
    <Section alt>
      <SectionHead eyebrow="Who we are" title="About Slingshot" sub="We're a FIRST Tech Challenge team building robots and having fun while giving back to our community." />
      <div className="grid items-center gap-8 rounded-2xl bg-card p-8 shadow-md md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="font-display text-2xl font-bold">Our Story</h3>
          <p>Slingshot started with a group of friends who loved building things and wanted a bigger challenge. What began as tinkering quickly turned into a shared passion for engineering, programming, and problem-solving.</p>
          <p>United by curiosity and teamwork, we now take on tougher challenges each season and push each other to grow.</p>
        </div>
        <div className="flex flex-col items-center justify-center rounded-xl bg-accent py-12 text-accent-foreground">
          <span className="font-display text-6xl">⟟</span>
          <p className="mt-3 font-display text-xl font-bold">Aim High. Launch Far.</p>
          <p className="text-sm">Team #20240</p>
        </div>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((v) => (
          <div key={v.t} className="rounded-2xl bg-card p-6 text-center shadow-md">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-primary"><v.icon /></div>
            <h4 className="mt-4 font-display text-lg font-bold">{v.t}</h4>
            <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function RobotCard({ season, desc, size, weight, features }: { season: string; desc: string; size: string; weight: string; features: string[] }) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="rounded-2xl bg-card p-6 shadow-md">
        <div className="flex aspect-square items-center justify-center rounded-xl bg-muted text-muted-foreground">Robot photo</div>
      </div>
      <div className="flex flex-col justify-center gap-5">
        <div className="rounded-2xl bg-card p-6 shadow-md"><h3 className="font-display text-xl font-bold">Season {season}</h3><p className="mt-2">{desc}</p></div>
        <div className="grid grid-cols-2 gap-5">
          <div className="rounded-2xl bg-card p-6 text-center shadow-md"><p className="font-display text-3xl font-bold text-primary">{size}</p><p className="text-sm">Max Size</p></div>
          <div className="rounded-2xl bg-card p-6 text-center shadow-md"><p className="font-display text-3xl font-bold text-primary">{weight}</p><p className="text-sm">Weight</p></div>
        </div>
        <div className="rounded-2xl bg-primary p-6 text-primary-foreground shadow-md">
          <h4 className="font-display text-xl font-bold">Key Features</h4>
          <ul className="mt-3 space-y-2">{features.map((f) => <li key={f}>• {f}</li>)}</ul>
        </div>
      </div>
    </div>
  );
}

export function Robot() {
  return (
    <Section>
      <SectionHead eyebrow="Our creation" title="Meet Our Robot" sub="Hours of design, building, and testing go into creating our competition robot each season." />
      <RobotCard season="2025-2026" desc="Our robot is designed for the DECODE challenge, featuring specialized mechanisms for quick intake and launching cycles." size={'18"'} weight="30 lbs" features={["Efficient intake", "Shooting from near and far zones", "Fast scoring cycles", "Reliable autonomous code"]} />
    </Section>
  );
}

export function PastSeasons() {
  return (
    <Section alt>
      <SectionHead title="Past" accent="Seasons" sub="A look back at our previous competition seasons and the robots we've built." />
      <RobotCard season="2024-2025" desc="In INTO THE DEEP, we hung specimens and dropped samples into the dedicated baskets." size={'18"'} weight="34 lbs" features={["Scoring samples in the high basket", "Hanging specimens on the rung", "End game hang", "Strong autonomous programming"]} />
    </Section>
  );
}

function OrangeList({ items }: { items: string[] }) {
  return <ul className="space-y-2 rounded-2xl bg-primary p-6 text-primary-foreground shadow-md">{items.map((i) => <li key={i}>• {i}</li>)}</ul>;
}

export function Outreach() {
  const items = [
    { t: "FLL Mentoring", l: ["STEM demos for elementary students", "Hands-on robotics activities", "Career talks with mentors", "Interactive coding sessions"] },
    { t: "Community STEM", l: ["Library demonstrations", "Science fair participation", "Community center workshops", "Public robot showcases"] },
    { t: "Team Support", l: ["Rookie team support", "Technical guidance sessions", "Strategy workshops", "Resource sharing"] },
  ];
  return (
    <Section alt>
      <SectionHead title="Our" accent="Outreach" sub="We're committed to inspiring the next generation of innovators through community engagement and STEM education." />
      <div className="grid gap-8 md:grid-cols-3">
        {items.map((i) => (
          <div key={i.t} className="space-y-4">
            <div className="rounded-2xl bg-card p-4 shadow-md"><div className="flex aspect-square items-center justify-center rounded-xl bg-muted text-muted-foreground">Photo</div></div>
            <h3 className="text-center font-display text-xl font-bold">{i.t}</h3>
            <OrangeList items={i.l} />
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Sponsorship() {
  const tiers = [
    { n: "Bronze", p: "$250+", l: ["Logo on team website", "Social media recognition", "Thank you certificate"] },
    { n: "Silver", p: "$500+", l: ["All Bronze benefits", "Logo on team banner", "Quarterly team updates", "Invitation to team events"] },
    { n: "Gold", p: "$1,000+", l: ["All Silver benefits", "Logo on team shirts", "Priority recognition at events", "Personalized thank you video"] },
    { n: "Platinum", p: "$2,500+", l: ["All Gold benefits", "Logo on robot", "Featured sponsor spotlight", "Annual impact report"] },
  ];
  return (
    <Section alt>
      <SectionHead title="Become a" accent="Sponsor" sub="Your support helps us compete, learn, and inspire the next generation of engineers and innovators." />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {tiers.map((t) => (
          <div key={t.n} className="space-y-4">
            <div className="rounded-2xl bg-card py-12 text-center font-display text-3xl font-bold text-primary shadow-md">{t.p}</div>
            <h3 className="text-center font-display text-xl font-bold">{t.n}</h3>
            <OrangeList items={t.l} />
          </div>
        ))}
      </div>
      <div className="mt-12 text-center"><Link to="/contact" className="rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow hover:opacity-90">Contact Us to Sponsor</Link></div>
    </Section>
  );
}

export function Team() {
  const members = [
    { n: "Alex", b: "Hi, I'm Alex! I'm our lead builder. I joined FTC because I love figuring out how machines work. In my free time I play soccer." },
    { n: "Priya", b: "Hi, I'm Priya! I write our autonomous code in Java. Outside robotics I enjoy chess and drawing." },
    { n: "Jordan", b: "I'm Jordan, our CAD designer. I joined to turn ideas into real parts. I also play guitar and video games." },
    { n: "Maya", b: "I'm Maya and I lead outreach. I love sharing STEM with younger kids. In my free time I read and swim." },
    { n: "Ethan", b: "I'm Ethan, our driver. I joined FTC for the thrill of competition. I also enjoy basketball and hiking." },
    { n: "Sara", b: "I'm Sara and I manage our engineering notebook. I enjoy writing, baking, and spending time with friends." },
  ];
  return (
    <Section alt>
      <SectionHead title="Meet the" accent="Team" sub="Get to know the passionate individuals who make up our robotics team." />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((m) => (
          <div key={m.n} className="space-y-4">
            <div className="rounded-2xl bg-card p-4 shadow-md"><div className="flex aspect-square items-center justify-center rounded-xl bg-muted font-display text-5xl text-primary">{m.n[0]}</div></div>
            <h3 className="text-center font-display text-xl font-bold">{m.n}</h3>
            <p className="rounded-2xl bg-primary p-6 text-primary-foreground shadow-md">{m.b}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Contact() {
  return (
    <Section>
      <SectionHead eyebrow="Get in touch" title="Join Our Team!" sub="Want to join Slingshot, become a sponsor, or just say hi? We'd love to hear from you!" />
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-card p-8 shadow-md">
          <h3 className="font-display text-xl font-bold">Contact Info</h3>
          <div className="mt-6 space-y-5">
            <div className="flex gap-4"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-primary"><Mail className="h-5 w-5" /></div><div><p className="text-sm text-muted-foreground">Email</p><a href="mailto:contact@slingshot20240.com" className="font-medium">contact@slingshot20240.com</a></div></div>
            <div className="flex gap-4"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-primary"><MapPin className="h-5 w-5" /></div><div><p className="text-sm text-muted-foreground">Location</p><p className="font-medium">Your City, State</p></div></div>
          </div>
          <hr className="my-6" />
          <p className="text-sm text-muted-foreground">Follow Us</p>
          <div className="mt-3 flex gap-3">
            <a href="https://ftcscout.org/teams/20240" target="_blank" rel="noreferrer" className="rounded-lg bg-secondary px-3 py-2 text-sm hover:bg-accent">FTC Scout</a>
            <a href="https://www.firstinspires.org" target="_blank" rel="noreferrer" className="rounded-lg bg-secondary px-3 py-2 text-sm hover:bg-accent">FIRST Inspires</a>
          </div>
        </div>
        <div className="flex flex-col justify-center rounded-2xl bg-primary p-8 text-primary-foreground shadow-md">
          <h3 className="font-display text-2xl font-bold">Become a Sponsor</h3>
          <p className="mt-3 opacity-90">Help us compete and inspire the next generation of engineers! Your support makes a real difference in our team's ability to innovate and succeed.</p>
          <Link to="/sponsorship" className="mt-6 rounded-lg bg-card py-3 text-center font-semibold text-primary hover:opacity-90">Sponsorship Info</Link>
        </div>
      </div>
    </Section>
  );
}
