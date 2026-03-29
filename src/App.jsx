import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, Menu, X } from 'lucide-react';

// Design System Components
const PaperGrain = () => (
  <svg
    className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-0"
    style={{ opacity: 0.02 }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <filter id="noiseFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
  </svg>
);

const VerticalGridlines = () => (
  <div className="pointer-events-none fixed inset-0 z-0 mx-auto grid max-w-[1600px] grid-cols-12 px-6 sm:px-12 md:px-24">
    <div className="col-span-3 border-r border-foreground/10 h-full"></div>
    <div className="col-span-3 border-r border-foreground/10 h-full"></div>
    <div className="col-span-3 border-r border-foreground/10 h-full"></div>
    <div className="col-span-3 border-r border-foreground/10 h-full"></div>
  </div>
);

const PrimaryButton = ({ children, className = '', ...props }) => (
  <button
    className={`group relative overflow-hidden bg-foreground px-8 py-4 text-xs tracking-[0.2em] text-accent-foreground uppercase transition-shadow duration-500 hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)] shadow-[0_4px_16px_rgba(0,0,0,0.15)] ${className}`}
    {...props}
  >
    <div className="absolute inset-0 block w-full h-full transform transition-transform duration-500 ease-out -translate-x-full bg-accent group-hover:translate-x-0 z-0" />
    <span className="relative z-10 flex items-center gap-2">
      {children}
      <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
    </span>
  </button>
);

const SecondaryButton = ({ children, className = '', ...props }) => (
  <button
    className={`group relative border border-foreground bg-transparent px-8 py-4 text-xs tracking-[0.2em] text-foreground uppercase transition-all duration-500 hover:bg-foreground hover:text-white ${className}`}
    {...props}
  >
    <span className="relative z-10">{children}</span>
  </button>
);

// Sections
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-500 ${scrolled ? 'bg-background/95 backdrop-blur border-b border-foreground/10' : 'bg-transparent'}`}>
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 md:px-24">
        <div className="flex items-center justify-between h-24">
          <div className="font-playfair text-sm tracking-[0.3em] uppercase">
            A R Mercerisers
          </div>
          <div className="hidden lg:flex items-center gap-12">
            {['Products', 'Process', 'About', 'Contact'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="font-inter text-xs tracking-[0.2em] uppercase transition-colors duration-500 hover:text-accent">
                {link}
              </a>
            ))}
            <PrimaryButton className="px-6 py-3" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Request a Sample</PrimaryButton>
          </div>
          <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden absolute top-24 left-0 w-full bg-background border-b border-foreground/10 p-6 flex flex-col gap-6">
          {['Products', 'Process', 'About', 'Contact'].map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="font-inter text-sm tracking-[0.2em] uppercase transition-colors duration-500 hover:text-accent">
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

const Hero = () => (
  <section className="relative min-h-screen flex flex-col pt-24 z-10">
    <div className="flex-grow flex items-center w-full relative">
      <div className="max-w-[1600px] mx-auto w-full px-6 sm:px-12 md:px-24 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 items-center py-12 md:py-0">
        <div className="col-span-1 md:col-span-7 pr-0 md:pr-12 lg:pr-24 z-20">
          <h1 className="font-playfair text-6xl md:text-8xl lg:text-9xl leading-[0.9] text-foreground mb-8">
            Where Cotton <span className="italic text-accent block md:inline">Becomes</span> Silk
          </h1>
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px w-8 md:w-12 bg-foreground"></div>
            <span className="font-inter text-xs uppercase tracking-[0.25em] text-foreground">Coimbatore, India · Est. 2019</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-6">
            <PrimaryButton onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore Our Products
            </PrimaryButton>
            <SecondaryButton onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })}>
              The Mercerising Process
            </SecondaryButton>
          </div>
        </div>
        <div className="col-span-1 md:col-span-5 relative h-[50vh] md:h-[70vh] group">
          <img
            src="/yarn.jpg"
            alt="Premium Mercerised Fabric Texture"
            className="w-full h-full object-cover grayscale transition-all duration-1500 group-hover:grayscale-0 group-hover:scale-105 shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
          />
          <div className="absolute inset-0 border-[0.5rem] border-background/20 mix-blend-overlay pointer-events-none"></div>
          <div className="absolute top-1/2 -right-4 md:-right-8 -translate-y-1/2 font-inter text-xs uppercase tracking-[0.25em] text-foreground [writing-mode:vertical-rl] rotate-180">
            Mercerised / Since 2019
          </div>
        </div>
      </div>
    </div>

    <div className="w-full border-t border-foreground/10 bg-background/50 backdrop-blur z-20">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 md:px-24 w-full divide-y md:divide-y-0 md:divide-x divide-foreground/10 grid grid-cols-2 md:grid-cols-4">
        {[
          { stat: "20+", label: "Years of Experienced Team" },
          { stat: "50+", label: "MT Capacity per Month" },
          { stat: "25+", label: "Customers" },
        ].map((item, i) => (
          <div key={i} className="py-6 flex flex-col items-center justify-center gap-2">
            <span className="font-playfair text-3xl md:text-4xl">{item.stat}</span>
            <span className="font-inter text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground text-center px-4">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="relative py-24 md:py-32 bg-foreground text-background z-10 mx-[1px]">
    <div className="max-w-[1600px] mx-auto px-6 sm:px-12 md:px-24 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-center">
      <div className="col-span-1 border-t border-background/20 pt-8" />
      <div className="col-span-1 md:col-span-4 self-start">
        <span className="font-inter text-xs uppercase tracking-[0.25em] text-background/60 block mb-8">Our Craft</span>
        <p className="font-inter text-base md:text-lg leading-relaxed text-background/80 relative">
          <span className="float-left font-playfair text-7xl md:text-8xl leading-none pr-4 pt-2 text-accent">M</span>
          ercerisation is not merely a process &mdash; it is a transformation. Since 2019, A R Mercerisers has refined this century-old treatment into a precise science. Founded in Coimbatore, the heart of India's textile innovation, we subject premium cotton fibre to controlled tension and alkali baths, permanently altering its cellular structure. The result is unparalleled luster, strength, and brilliance.
        </p>
      </div>
      <div className="col-span-1 md:col-span-7 pl-0 md:pl-12 lg:pl-24">
        <h2 className="font-playfair text-4xl md:text-5xl lg:text-7xl leading-tight">
          <span className="italic text-accent">The lustre of silk.</span><br />
          The soul of cotton.
        </h2>
      </div>
    </div>
  </section>
);

const Products = () => {
  const products = [
    { title: "Mercerised Cotton Yarn", range: "20s to 120s Count", img: "/Mercerised Cotton Yarn.jpg", desc: "Premium yarn for shirting, hosiery, and embroidery, treated for maximum dye absorption and silk-like sheen." },
    { title: "Mercerised Fabric", range: "Woven & Knitted", img: "/Mercerised Fabric.jpg", desc: "Grey and bleached fabrics treated to achieve a perfect drape and sustained brilliance for high-end apparel." },
    { title: "Hank Mercerisation", range: "Batch Excellence", img: "/Hank Mercerisation.jpg", desc: "Precision batch-processed yarn ideal for fine count embroidery threads and specialized applications." },
    { title: "Caustic Recovery", range: "Sustainable Practice", img: "/Caustic Recovery.jpg", desc: "Eco-conscious closed-loop recovery of sodium hydroxide, drastically reducing our environmental footprint." }
  ];

  return (
    <section id="products" className="relative py-24 md:py-32 bg-background z-10">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-24 mb-16 md:mb-24 text-center">
        <span className="font-inter text-xs uppercase tracking-[0.25em] text-muted-foreground block mb-6">The Collection</span>
        <h2 className="font-playfair text-5xl md:text-7xl">Precision, <span className="italic text-accent">At Every Count</span></h2>
      </div>
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-24 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {products.map((p, i) => (
          <div key={i} className="group relative border-t border-foreground/10 pt-8 flex flex-col items-center text-center cursor-pointer bg-background transition-shadow duration-500 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:z-20">
            <div className="w-full aspect-[4/5] overflow-hidden mb-8 bg-muted relative">
              <img src={p.img} alt={p.title} className="w-full h-full object-cover grayscale transition-all duration-1500 group-hover:grayscale-0 group-hover:scale-105" />
            </div>
            <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4 transition-colors duration-500 group-hover:text-accent">{p.range}</span>
            <h3 className="font-playfair text-2xl md:text-3xl mb-4 text-foreground">{p.title}</h3>
            <p className="font-inter text-sm md:text-base text-muted-foreground leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    { num: "01", title: "Grey Fabric Inspection", desc: "Raw cotton yarn or fabric undergoes rigorous quality inspection for count, evenness, and tensile parameters." },
    { num: "02", title: "Singeing & Desizing", desc: "Surface fibres are removed by singeing; sizing agents are washed out to prepare a clean substrate." },
    { num: "03", title: "Caustic Impregnation", desc: "Fabric and yarn passes through a 300 g/L sodium hydroxide bath at controlled temperature, swelling the fibres." },
    { num: "04", title: "Tension Control", desc: "Stretched under precision mechanical tension — the critical step that produces the silk-like lustre." },
    { num: "05", title: "Washing & Neutralisation", desc: "Caustic soda is thoroughly washed out and neutralised; liquor is reclaimed for reuse." },
    { num: "06", title: "Final Inspection", desc: "Tested for lustre (AATCC standards), shrinkage, dye uptake, and tensile strength before dispatch." }
  ];

  return (
    <section id="process" className="relative py-24 md:py-32 bg-muted/30 z-10 border-t border-foreground/5">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 md:px-24 mb-20 md:mb-32 text-center md:text-left">
        <span className="font-inter text-xs uppercase tracking-[0.25em] text-muted-foreground block mb-6">The Method</span>
        <h2 className="font-playfair text-5xl md:text-7xl">Six Steps to <span className="italic text-accent">Perfection</span></h2>
      </div>
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 md:px-24">
        {steps.map((step, i) => (
          <div key={i} className="group flex flex-col md:flex-row border-t border-foreground/10 py-12 md:py-16 items-start gap-8 md:gap-24 transition-colors duration-700 hover:bg-white/50">
            <span className="font-playfair text-5xl md:text-7xl text-foreground/20 italic group-hover:text-accent transition-colors duration-700 w-24 flex-shrink-0">{step.num}</span>
            <div className="flex-grow max-w-3xl">
              <h3 className="font-playfair text-3xl md:text-4xl mb-6 text-foreground">{step.title}</h3>
              <p className="font-inter text-base md:text-lg text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Certifications = () => (
  <div className="max-w-5xl mx-auto text-center border-t border-background/20 pt-16 md:pt-24">
    <h2 className="font-playfair text-4xl md:text-5xl lg:text-7xl leading-tight">
      <span className="italic text-accent">"Quality is not an act — </span><br />
      it is the discipline of every shift."
    </h2>
  </div>
);

const Testimonials = () => (
  <section id="testimonials" className="relative py-24 md:py-32 bg-background z-10">
    <div className="max-w-[1600px] mx-auto px-6 sm:px-12 md:px-24 mb-20 md:mb-32">
      <span className="font-inter text-xs uppercase tracking-[0.25em] text-muted-foreground block mb-6">Client Voices</span>
      <h2 className="font-playfair text-5xl md:text-7xl">Trusted by <span className="italic text-accent">Discerning</span> Mills</h2>
    </div>
    <div className="max-w-[1600px] mx-auto px-6 sm:px-12 md:px-24 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
      {[
        { text: "A R Mercerisers consistently delivers yarn with unmatched lustre and colour consistency. They are our preferred supplier for high-end shirting.", name: "Mr. Rajiv Nair", title: "Procurement Head, Arvind Fabrics" },
        { text: "Their caustic recovery process reflects a genuine commitment to sustainable manufacturing. Rare in this industry.", name: "Ms. Priya Subramaniam", title: "Sustainability Director, Welspun India" },
        { text: "We've sourced mercerised yarn from across India and Europe. None match the tensile strength and sheen of A R Mercerisers.", name: "Mr. Kenji Tanaka", title: "Import Manager, Osaka Textile Group" }
      ].map((t, i) => (
        <div key={i} className="group relative border-l border-foreground/10 pl-8 py-4 transition-colors duration-700 hover:border-accent hover:shadow-[0_8px_24px_rgba(0,0,0,0.02)] bg-background">
          <div className="flex gap-1 mb-6 text-foreground/20 transition-transform duration-700 group-hover:scale-110 group-hover:text-accent w-fit origin-left">
            {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill="currentColor" />)}
          </div>
          <p className="font-playfair text-lg md:text-xl leading-relaxed text-foreground mb-8">"{t.text}"</p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
              <img src={`https://i.pravatar.cc/150?img=${i + 11}`} alt={t.name} className="w-full h-full object-cover grayscale transition-all duration-1500 group-hover:grayscale-0" />
            </div>
            <div>
              <h4 className="font-inter text-sm font-medium text-foreground transition-colors duration-700 group-hover:text-accent">{t.name}</h4>
              <span className="font-inter text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{t.title}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const Industries = () => (
  <section id="industries" className="relative py-24 md:py-32 bg-background z-10">
    <div className="max-w-[1600px] mx-auto px-6 sm:px-12 md:px-24 mb-16 md:mb-24">
      <span className="font-inter text-xs uppercase tracking-[0.25em] text-muted-foreground block mb-6">We Serve</span>
      <h2 className="font-playfair text-5xl md:text-7xl">Global <span className="italic text-accent">Applications</span></h2>
    </div>
    <div className="max-w-[1600px] mx-auto px-6 sm:px-12 md:px-24 grid grid-cols-1 md:grid-cols-12 gap-y-12 gap-x-8">
      {[
        { title: "Premium Apparel & Fashion", desc: "High-end shirting and tailored garments demanding zero shrinkage and lasting brilliance." },
        { title: "Embroidery & Thread", desc: "Fine count threads engineered for flawless machine and hand embroidery." },
        { title: "Industrial Textiles", desc: "Specialised applications demanding exceptional structural integrity." },
      ].map((ind, i) => (
        <div key={i} className={`col-span-1 md:col-span-6 lg:col-span-4 border-t border-foreground/10 pt-8 pb-12 transition-all duration-700 hover:border-accent hover:bg-muted/10 px-8 cursor-pointer ${i % 2 !== 0 ? 'mt-0 md:mt-16 lg:mt-0' : ''} ${i % 3 === 1 ? 'lg:mt-16' : ''} ${i % 3 === 2 ? 'lg:mt-32' : ''}`}>
          <span className="font-inter text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60 block mb-6">0{i + 1}</span>
          <h3 className="font-playfair text-2xl md:text-3xl text-foreground mb-4">{ind.title}</h3>
          <p className="font-inter text-sm text-muted-foreground leading-relaxed">{ind.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="relative py-24 md:py-32 bg-foreground text-background z-10 mx-[1px]">
    <div className="max-w-[1600px] mx-auto px-6 sm:px-12 md:px-24 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
      <div>
        <span className="font-inter text-xs uppercase tracking-[0.25em] text-background/60 block mb-6">Begin the Conversation</span>
        <h2 className="font-playfair text-5xl md:text-7xl mb-16">Request a <span className="italic text-accent">Sample</span></h2>

        <div className="space-y-12">
          {["Name", "Company", "Email Address", "Product Interest"].map((field) => (
            <div key={field} className="relative group">
              <input
                type="text"
                placeholder={`Enter your ${field.toLowerCase()}`}
                className="w-full bg-transparent border-b border-background/20 py-4 font-playfair italic text-lg lg:text-xl text-background focus:outline-none focus:border-accent transition-colors duration-500 placeholder-background/40"
              />
              <label className="absolute -top-4 left-0 font-inter text-[10px] uppercase tracking-[0.2em] text-background/60 group-focus-within:text-accent transition-colors duration-500">{field}</label>
            </div>
          ))}
          <PrimaryButton className="w-full md:w-auto mt-8 !bg-background !text-foreground group-hover:!text-white">Submit Request</PrimaryButton>
        </div>
      </div>
      <div className="flex flex-col justify-end lg:pl-16">
        <div className="space-y-12 border-t border-background/20 pt-12">
          <div>
            <h4 className="font-inter text-xs uppercase tracking-[0.25em] text-background/60 mb-4">Headquarters</h4>
            <p className="font-inter text-background/80 leading-relaxed text-sm">6, Second Cross Street, Chinthamani Nagar, K.K. Pudur<br />Coimbatore – 641 038<br />Tamil Nadu, India</p>
          </div>
          <div>
            <h4 className="font-inter text-xs uppercase tracking-[0.25em] text-background/60 mb-4">Contact</h4>
            <p className="font-inter text-background/80 leading-relaxed text-sm mb-2">+91 98940 92756</p>
            <p className="font-inter text-background/80 leading-relaxed text-sm mb-2">+91 94430 45966</p>
            <p className="font-inter text-background/80 leading-relaxed text-sm mb-2">+91 98424 87538</p>
            <p className="font-inter text-background/80 leading-relaxed text-sm mb-2">armercerisers@gmail.com</p>
          </div>
          <div>
            <h4 className="font-inter text-xs uppercase tracking-[0.25em] text-background/60 mb-4">Legal</h4>
            <p className="font-inter text-background/80 leading-relaxed text-sm">GST: 33ABMFA9621L1Z5</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="relative bg-background pt-24 pb-12 z-10 text-center border-t border-foreground/10">
    <div className="max-w-[1600px] mx-auto px-6 sm:px-12 md:px-24">
      <h2 className="font-playfair text-4xl md:text-6xl uppercase tracking-widest text-foreground mb-6">A R Mercerisers</h2>
      <p className="font-inter text-sm md:text-base text-muted-foreground uppercase tracking-[0.3em] mb-16">Where Cotton Becomes Silk</p>
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-foreground/10 pt-8">
        <p className="font-inter text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground">© 2026 A R Mercerisers. Coimbatore, India.</p>
        <div className="flex gap-6">
          {['Privacy', 'Terms', 'Sitemap'].map(link => (
            <a key={link} href="#" className="font-inter text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-accent transition-colors duration-500">{link}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-accent selection:text-white relative">
      <PaperGrain />
      <VerticalGridlines />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Products />
        <Process />
        <Certifications />
        <Testimonials />
        <Industries />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
