import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Check, Heart, Users, Lightbulb, Target, Mail, MapPin, ChevronDown } from "lucide-react";

import saanviPhoto from "@/assets/team/saanvi.png.asset.json";
import anaishaPhoto from "@/assets/team/anaisha.png.asset.json";
import nihalPhoto from "@/assets/team/nihal.png.asset.json";
import saatvikPhoto from "@/assets/team/saatvik.png.asset.json";
import saiPhoto from "@/assets/team/sai.png.asset.json";
import pranayPhoto from "@/assets/team/pranay.png.asset.json";
import eshaannPhoto from "@/assets/team/eshaann.png.asset.json";
import malavPhoto from "@/assets/team/malav.png.asset.json";
import benoitPhoto from "@/assets/team/benoit.png.asset.json";
import taheemPhoto from "@/assets/team/taheem.png.asset.json";
import tarunPhoto from "@/assets/team/tarun.png.asset.json";
import kevinPhoto from "@/assets/team/kevin.png.asset.json";
import evanPhoto from "@/assets/team/evan.png.asset.json";
import ethanPhoto from "@/assets/team/ethan.png.asset.json";
import daiwikPhoto from "@/assets/team/daiwik.png.asset.json";
import srivanthPhoto from "@/assets/team/srivanth.png.asset.json";

const nav = [
  { to: "/", hash: "about", label: "About" },
  { to: "/", hash: "robot", label: "Robot" },
  { to: "/past-seasons", hash: "", label: "Past Seasons" },
  { to: "/outreach", hash: "", label: "Outreach" },
  { to: "/sponsorship", hash: "", label: "Sponsorship" },
  { to: "/team", hash: "", label: "Team" },
  { to: "/", hash: "contact", label: "Contact" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-primary-foreground/15 bg-primary/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display text-xl font-bold text-primary-foreground">Slingshot</span>
          <span className="text-xs text-primary-foreground/70">#20240</span>
        </Link>
        <nav className="flex flex-wrap gap-x-5 gap-y-1 text-sm" aria-label="Main navigation">
          {nav.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              hash={n.hash}
              className="text-primary-foreground/80 hover:text-primary-foreground"
              activeProps={{ className: "font-semibold text-primary-foreground underline underline-offset-8 decoration-2" }}
              activeOptions={{ exact: true, includeHash: true }}
            >
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
      {eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-glow">{eyebrow}</p>}
      <h2 className="font-display text-4xl font-bold md:text-5xl">
        {title} {accent && <span className="text-glow">{accent}</span>}
      </h2>
      <p className="mt-4 text-lg text-muted-foreground">{sub}</p>
    </div>
  );
}

function Section({ children, alt, id }: { children: ReactNode; alt?: boolean; id?: string }) {
  return <section id={id} className={`scroll-mt-28 px-4 py-20 ${alt ? "bg-secondary" : "bg-background"}`}><div className="mx-auto max-w-6xl">{children}</div></section>;
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
          <Link to="/team" className="rounded-lg bg-accent px-6 py-3 font-semibold text-accent-foreground shadow hover:opacity-90">Meet The Team</Link>
          <Link to="/" hash="robot" className="rounded-lg bg-accent px-6 py-3 font-semibold text-accent-foreground shadow hover:opacity-90">Our Robot</Link>
        </div>
      </div>
      <Link to="/" hash="about" className="absolute bottom-6 flex flex-col items-center text-sm opacity-80">Learn More<ChevronDown className="h-4 w-4" /></Link>
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
    <Section id="about" alt>
      <SectionHead eyebrow="Who we are" title="About Slingshot" sub="We're a FIRST Tech Challenge team building robots and having fun while giving back to our community." />
      <div className="grid items-center gap-8 rounded-2xl bg-card p-8 shadow-md md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="font-display text-2xl font-bold">Our Story</h3>
          <p>We are a high school team from Westwood who build robots with a shared passion for engineering, programming, and problem-solving.</p>
          <p>United by curiosity and teamwork, we now take on tougher challenges each season and push each other to grow.</p>
        </div>
        <div className="flex flex-col items-center justify-center rounded-xl bg-hero py-12 text-primary-foreground">
          <span className="font-display text-6xl">⟟</span>
          <p className="mt-3 font-display text-xl font-bold">Aim High. Launch Far.</p>
          <p className="text-sm">Team #20240</p>
        </div>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((v) => (
          <div key={v.t} className="rounded-2xl bg-card p-6 text-center shadow-md">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-accent-foreground"><v.icon /></div>
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
          <div className="rounded-2xl bg-card p-6 text-center shadow-md"><p className="font-display text-3xl font-bold text-glow">{size}</p><p className="text-sm">Max Size</p></div>
          <div className="rounded-2xl bg-card p-6 text-center shadow-md"><p className="font-display text-3xl font-bold text-glow">{weight}</p><p className="text-sm">Weight</p></div>
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
    <Section id="robot">
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

const sponsorBenefits = ["Logo on website", "Logo on social media", "Logo on shirt & displays", "Logo on robot"];

export const sponsorshipTiers = [
  { name: "Orange", price: "$99–299", benefits: [true, true, false, false] },
  { name: "Silver", price: "$300–699", benefits: [true, true, true, false] },
  { name: "Amethyst", price: "$700+", benefits: [true, true, true, true] },
] as const;

export function Sponsorship() {
  return (
    <Section alt>
      <SectionHead title="Become a" accent="Sponsor" sub="Your support helps us compete, learn, and inspire the next generation of engineers and innovators." />
      <div className="overflow-x-auto rounded-2xl bg-card shadow-md">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <caption className="sr-only">Sponsorship tiers and included logo placement benefits</caption>
          <thead>
            <tr className="bg-primary text-primary-foreground">
              <th scope="col" className="p-5 font-display text-lg">Sponsorship tier</th>
              {sponsorBenefits.map((benefit) => <th key={benefit} scope="col" className="p-5 text-center text-sm font-semibold">{benefit}</th>)}
            </tr>
          </thead>
          <tbody>
            {sponsorshipTiers.map((tier) => (
              <tr key={tier.name} className="border-t border-primary-foreground/15">
                <th scope="row" className="p-6">
                  <span className="font-display text-2xl font-bold">{tier.name}</span>
                  <span className="mt-1 block text-sm font-semibold text-glow">{tier.price}</span>
                </th>
                {tier.benefits.map((included, index) => (
                  <td key={sponsorBenefits[index]} className="p-6 text-center">
                    {included ? <><Check className="mx-auto h-7 w-7 text-glow" aria-hidden="true" /><span className="sr-only">Included</span></> : <span aria-label="Not included">—</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-12 text-center"><Link to="/" hash="contact" className="rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow hover:opacity-90">Contact Us to Sponsor</Link></div>
    </Section>
  );
}

export const teamMembers = [
  { name: "Saanvi", category: "Hardware", photo: saanviPhoto.url, x: 170, y: 100, labelSide: "left" },
  { name: "Anaisha", category: "Hardware", photo: anaishaPhoto.url, x: 230, y: 200, labelSide: "left" },
  { name: "Nihal", category: "Hardware", photo: nihalPhoto.url, x: 290, y: 300, labelSide: "left" },
  { name: "Saatvik", category: "Hardware", photo: saatvikPhoto.url, x: 350, y: 400, labelSide: "left" },
  { name: "Sai", category: "Hardware", photo: saiPhoto.url, x: 410, y: 500, labelSide: "left" },
  { name: "Pranay", category: "Hardware", photo: pranayPhoto.url, x: 460, y: 600, labelSide: "left" },
  { name: "Eshaann", category: "Software", photo: eshaannPhoto.url, x: 830, y: 100, labelSide: "right" },
  { name: "Malav", category: "Software", photo: malavPhoto.url, x: 770, y: 200, labelSide: "right" },
  { name: "Benoit", category: "Software", photo: benoitPhoto.url, x: 710, y: 300, labelSide: "right" },
  { name: "Taheem", category: "Software", photo: taheemPhoto.url, x: 650, y: 400, labelSide: "right" },
  { name: "Tarun", category: "Software", photo: tarunPhoto.url, x: 590, y: 500, labelSide: "right" },
  { name: "Kevin", category: "Software", photo: kevinPhoto.url, x: 540, y: 600, labelSide: "right" },
  { name: "Evan", category: "Outreach", photo: evanPhoto.url, x: 500, y: 740, labelSide: "right" },
  { name: "Ethan", category: "Outreach", photo: ethanPhoto.url, x: 500, y: 900, labelSide: "left" },
  { name: "Daiwik", category: "Outreach", photo: daiwikPhoto.url, x: 500, y: 1060, labelSide: "right" },
  { name: "Srivanth", category: "Outreach", photo: srivanthPhoto.url, x: 500, y: 1220, labelSide: "left" },
] as const;

export function Team() {
  return (
    <Section alt>
      <div className="mx-auto mb-4 max-w-2xl text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-glow">Our people</p>
        <h2 className="font-display text-4xl font-bold md:text-5xl">Meet the <span className="text-glow">Team</span></h2>
      </div>

      <div className="mx-auto hidden w-full max-w-5xl md:block">
        <svg viewBox="-10 0 1020 1320" className="h-auto w-full" role="img" aria-labelledby="team-shape-title team-shape-description">
          <title id="team-shape-title">Slingshot #20240 team members</title>
          <desc id="team-shape-description">Hardware and Software members form the two arms of a slingshot, with Outreach members along its handle.</desc>
          <defs>
            <clipPath id="team-portrait-clip" clipPathUnits="userSpaceOnUse"><circle r="62" /></clipPath>
          </defs>
          <path
            d="M170 100 L460 600 L500 670 L540 600 L830 100 M500 670 L500 1220"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.55"
          />
          <text x="500" y="300" textAnchor="middle" className="fill-foreground font-display text-[42px] font-black tracking-wide">SLINGSHOT</text>
          <text x="500" y="340" textAnchor="middle" className="fill-glow font-display text-[22px] font-bold">#20240</text>
          {teamMembers.map((member) => {
            const labelX = member.labelSide === "left" ? -84 : 84;
            const labelAnchor = member.labelSide === "left" ? "end" : "start";
            return (
              <g key={member.name} transform={`translate(${member.x} ${member.y})`}>
                <title>{`${member.name} — ${member.category}`}</title>
                <circle r="69" fill="var(--card)" />
                <image
                  href={member.photo}
                  x="-62"
                  y="-62"
                  width="124"
                  height="124"
                  clipPath="url(#team-portrait-clip)"
                  preserveAspectRatio="xMidYMid slice"
                />
                <circle r="62" fill="none" stroke="var(--glow)" strokeWidth="5" />
                <text x={labelX} y="-4" textAnchor={labelAnchor} className="fill-foreground font-display text-[23px] font-bold">{member.name}</text>
                <text x={labelX} y="23" textAnchor={labelAnchor} className="fill-glow font-sans text-[14px] font-semibold uppercase tracking-[2px]">{member.category}</text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-x-5 gap-y-9 pt-10 min-[420px]:grid-cols-3 md:hidden">
        {teamMembers.map((member) => (
          <div key={member.name} className="flex flex-col items-center text-center">
            <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-glow bg-card shadow-md min-[420px]:h-28 min-[420px]:w-28">
              <img src={member.photo} alt={member.name} className="h-full w-full object-cover" />
            </div>
            <h3 className="mt-3 font-display text-base font-bold">{member.name}</h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-glow">{member.category}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Contact() {
  return (
    <Section id="contact">
      <SectionHead eyebrow="Get in touch" title="Contact Slingshot" sub="Interested in sponsoring us or just want to say hi? We'd love to hear from you!" />
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-card p-8 shadow-md">
          <h3 className="font-display text-xl font-bold">Contact Info</h3>
          <div className="mt-6 space-y-5">
            <div className="flex gap-4"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground"><Mail className="h-5 w-5" /></div><div className="min-w-0"><p className="text-sm text-muted-foreground">Email</p><a href="mailto:slingshotftc@gmail.com" className="break-all font-medium">slingshotftc@gmail.com</a></div></div>
            <div className="flex gap-4"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground"><MapPin className="h-5 w-5" /></div><div><p className="text-sm text-muted-foreground">Location</p><p className="font-medium">Austin, Texas</p></div></div>
          </div>
          <hr className="my-6" />
          <p className="text-sm text-muted-foreground">Follow Us</p>
          <div className="mt-3 flex gap-3">
            <a href="https://ftcscout.org/teams/20240" target="_blank" rel="noreferrer" className="rounded-lg bg-muted px-3 py-2 text-sm text-foreground hover:bg-glow hover:text-accent-foreground">FTC Scout</a>
            <a href="https://www.firstinspires.org" target="_blank" rel="noreferrer" className="rounded-lg bg-muted px-3 py-2 text-sm text-foreground hover:bg-glow hover:text-accent-foreground">FIRST Inspires</a>
          </div>
        </div>
        <div className="flex flex-col justify-center rounded-2xl bg-primary p-8 text-primary-foreground shadow-md">
          <h3 className="font-display text-2xl font-bold">Become a Sponsor</h3>
          <p className="mt-3 opacity-90">Help us compete and inspire the next generation of engineers! Your support makes a real difference in our team's ability to innovate and succeed.</p>
          <Link to="/sponsorship" className="mt-6 rounded-lg bg-accent py-3 text-center font-semibold text-accent-foreground hover:opacity-90">Sponsorship Info</Link>
        </div>
      </div>
    </Section>
  );
}
