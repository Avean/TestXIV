import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, MapPin, Mail, ExternalLink, Menu, X, 
  ChevronRight, Users, BookOpen, Clock, Building2,
  FileText, UserCheck, GraduationCap, Landmark, CreditCard, Info,
  Search, ArrowUpDown, ArrowUp, ArrowDown, Loader2, User, AlertCircle
} from 'lucide-react';

// --- Data ---
const sponsors = [
  { name: "IM PAN", logo: "https://impan.pl/images/logo_impan.png", url: "https://www.impan.pl/" },
  { name: "University\nof Warsaw", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/LOGO_IKP_%28cropped%29.png", url: "https://www.uw.edu.pl/" },
  { name: "Research\nUniversity", logo: "https://inicjatywadoskonalosci.uw.edu.pl/wp-content/uploads/sites/11/2021/07/logotyp-IDUB-EN-poziom-kolor.svg", url: "https://inicjatywadoskonalosci.uw.edu.pl/" }
  // { name: "Banach\nCenter", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbVct31q5jxsD7157PDnkW1nP2Wcgd0_ADcw&s", url: "https://www.impan.pl/en/activities/banach-center" }
];

const partners = [
  { name: "Juliusz P. Schauder\nCenter", logo: "https://cbn.umk.pl/image/layout_set_logo?img_id=64404&t=1773087958576", url: "https://cbn.umk.pl/" }
];

// --- Layout Components ---

const HeroBackground = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}>
    <div className="absolute top-0 left-0 w-full h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop")' }}
      >
        <div className="absolute inset-0 bg-primary-900/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/50 via-transparent to-primary-900/90" />
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[15%] left-[10%] text-white/15 font-serif italic text-3xl md:text-5xl transform -rotate-12">∂u/∂t = αΔu</motion.div>
        <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-[60%] left-[5%] text-white/10 font-serif italic text-4xl md:text-6xl transform rotate-6">∂²u/∂t² = c²Δu</motion.div>
        <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute top-[25%] right-[5%] md:right-[10%] text-white/15 font-serif italic text-2xl md:text-4xl transform rotate-12">∂ₜu + (u⋅∇)u = -∇p + νΔu</motion.div>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute top-[70%] right-[10%] md:right-[15%] text-white/10 font-serif italic text-3xl md:text-5xl transform -rotate-6">∇⋅u = 0</motion.div>
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 3 }} className="absolute top-[45%] left-[30%] md:left-[40%] text-white/5 font-serif italic text-5xl md:text-7xl">iℏ∂ₜψ = -ℏ²/2m Δψ + Vψ</motion.div>
        <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} className="absolute bottom-[15%] left-[30%] text-white/15 font-serif italic text-3xl md:text-5xl transform rotate-3">-Δu = λu</motion.div>
      </div>
    </div>
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Always transparent at the top, solid when scrolled
  const headerClass = isScrolled 
    ? 'shadow-lg' 
    : 'bg-transparent';

  const navPadding = isScrolled ? 'py-3' : 'py-5';

  const textClass = 'text-white';
  const linkClass = 'text-gray-200 hover:text-white';

  const mobileMenuBg = 'bg-primary-900/95 backdrop-blur-md border-white/10 shadow-2xl';
    
  const mobileLinkClass = 'text-gray-200 hover:text-accent-400 hover:bg-white/5';
    
  const mobileActiveLinkClass = 'text-accent-400 bg-white/10';

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Registration', href: '/registration' },
    { name: 'Participants', href: '/participants' },
    { name: 'Programme', href: '/program' },
    { name: 'Scientific Committee', href: '/scientific' },
    { name: 'Organizing Committee', href: '/organization' },
  ];

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${headerClass}`}>
        <HeroBackground className={`transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center transition-all duration-300 ${navPadding} relative z-[40]`}>
          <div className="flex items-center gap-3 lg:gap-6">
            {!isHome && (
              <div className="flex items-center gap-3 lg:gap-6 border-r border-gray-400/30 pr-3 lg:pr-6 shrink-0">
                {sponsors.map((sponsor, idx) => (
                  <a key={idx} href={sponsor.url} target="_blank" rel="noreferrer" className="flex items-center shrink-0">
                    <img 
                      src={sponsor.logo} 
                      alt={sponsor.name.replace('\n', ' ')} 
                      className={`h-8 lg:h-9 w-auto object-contain shrink-0 transition-all duration-300 hover:scale-105 brightness-0 invert opacity-80 hover:opacity-100`} 
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </a>
                ))}
              </div>
            )}
            <Link to="/" className={`font-serif text-xl sm:text-2xl font-bold tracking-wider shrink-0 whitespace-nowrap ${textClass}`}>
              XIV FPDE
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href}
                className={`text-sm font-medium tracking-wide uppercase transition-colors ${
                  location.pathname === link.href ? 'text-accent-400' : linkClass
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className={`xl:hidden ${textClass} relative z-[60]`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-primary-900/40 backdrop-blur-sm z-[40] xl:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed top-0 right-0 h-screen w-72 max-w-[80vw] z-[45] flex flex-col border-l ${mobileMenuBg} xl:hidden`}
            >
              <div className="flex-1 overflow-y-auto px-6 pt-24 pb-8 flex flex-col items-center space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block w-full text-center px-4 py-3 text-lg font-medium rounded-xl transition-colors ${
                      location.pathname === link.href 
                        ? mobileActiveLinkClass 
                        : mobileLinkClass
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const Footer = () => {
  return (
    <footer className="bg-primary-900 py-12 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-white font-serif text-xl font-bold tracking-wider">
          XIV FPDE
        </div>
        <p className="text-gray-400 text-sm text-center md:text-left">
          © 2026 XIV Forum of Partial Differential Equations. All rights reserved.
        </p>
        <div className="text-gray-400 text-sm">
          Last update: March 2026
        </div>
      </div>
    </footer>
  );
};

const PageHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
    <HeroBackground />
    <motion.div
      className="relative z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">{title}</h1>
      {subtitle && <p className="text-accent-400 text-lg">{subtitle}</p>}
      <div className="w-16 h-1 bg-accent-500 mx-auto mt-8" />
    </motion.div>
  </div>
);

// --- Pages ---

const CountdownTimer = () => {
  const targetDate = new Date('2026-09-13T09:00:00').getTime();
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    updateTime(); // Initial call
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="mt-16 bg-gray-50 rounded-2xl p-8 sm:p-10 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="text-center md:text-left">
        <h3 className="text-2xl sm:text-3xl font-serif text-primary-900 mb-2">Conference starts in</h3>
        <p className="text-gray-500">13 September 2026, 9:00</p>
      </div>
      <div className="flex justify-center gap-3 sm:gap-6">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Minutes', value: timeLeft.minutes },
          { label: 'Seconds', value: timeLeft.seconds }
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white border border-gray-200 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-serif font-bold text-primary-900 shadow-sm">
              {item.value.toString().padStart(2, '0')}
            </div>
            <span className="mt-3 text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

function CropBox({ src, alt = "", a, b, c, d }) {
  const width = c - a;
  const height = d - b;

  return (
    <div className="absolute inset-0">
      <img
        src={src}
        alt={alt}
        className="absolute max-w-none"
        style={{
          width: `${10000 / width}%`,
          height: `${10000 / height}%`,
          left: `-${(a / width) * 100}%`,
          top: `-${(b / height) * 100}%`,
        }}
      />
    </div>
  );
}


const HomePage = () => {
  const isMobile = useIsMobile();
  
  const invitedSpeakers = [
    { name: "Iwona Chlebicka", affiliation: "University of Warsaw, Poland", url: "https://www.mimuw.edu.pl/~ichlebicka/", image: "", imagePosition: "center 5%" },
    { name: "Aleksander Ćwiszewski", affiliation: "Nicolaus Copernicus University, Poland", url: "https://www.mat.umk.pl/knam/pracownicy/?id=7100700", image: "", imagePosition: "center" },
    { name: "Francois Genoud", affiliation: "EPFL, Switzerland", url: "https://people.epfl.ch/francois.genoud", image: "", imagePosition: "center" },
    { name: "Jacek Jendrej", affiliation: "Sorbonne Université, France", url: "https://webusers.imj-prg.fr/~jacek.jendrej/", image: "", imagePosition: "center" },
    { name: "Grzegorz Karch", affiliation: "University of Wrocław, Poland", url: "https://karch.math.uni.wroc.pl/", image: "", imagePosition: "center" },
    { name: "Michał Kowalczyk", affiliation: "University of Chile, Chile", url: "https://www.cmm.uchile.cl/?cmm_people=michal-kowalczyk", image: "", imagePosition: "center" },
    { name: "Konstantin Merz", affiliation: "ETH Zurich, Switzerland", url: "https://people.phys.ethz.ch/~mkonstanti/", image: "", imagePosition: "center" },
    { name: "Katarzyna Pietruska-Pałuba", affiliation: "University of Warsaw, Poland", url: "https://www.mimuw.edu.pl/pl/pracownicy/431/", image: "", imagePosition: "center" },
    { name: "Łukasz Płociniczak", affiliation: "Wrocław University of Science and Technology, Poland", url: "https://prac.im.pwr.edu.pl/~plociniczak/", image: "", imagePosition: "center" },
    { name: "Julio Rossi (Not Confirmed)", affiliation: "University of Buenos Aires, Argentina", url: "#", image: "", imagePosition: "center" },
    { name: "Jakub Skrzeczkowski", affiliation: "University of Oxford, UK", url: "https://www.maths.ox.ac.uk/people/jakub.skrzeczkowski", image: "", imagePosition: "center" },
    { name: "Maciej Starostka", affiliation: "Gdańsk University of Technology, Poland", url: "https://pg.edu.pl/p/maciej-starostka-64529", image: "", imagePosition: "center" },
    { name: "Andrzej Szulkin", affiliation: "Stockholm University, Sweden", url: "https://www.su.se/english/profiles/a/andrzejs", image: "", imagePosition: "center" },
    { name: "Agnieszka Świerczewska-Gwiazda", affiliation: "University of Warsaw, Poland", url: "https://www.mimuw.edu.pl/~aswiercz/", image: "", imagePosition: "center" },
    { name: "Tomasz Tyranowski", affiliation: "University of Twente, Netherlands", url: "https://people.utwente.nl/t.m.tyranowski", image: "", imagePosition: "center" },
    { name: "Nils Waterstraat", affiliation: "MLU Halle-Wittenberg, Germany", url: "https://analysis.mathematik.uni-halle.de/mitarbeiter/nils_waterstraat/", image: "", imagePosition: "center" },
    { name: "Anna Zatorska-Goldstein", affiliation: "University of Warsaw, Poland", url: "https://www.mimuw.edu.pl/~azator/", image: "", imagePosition: "center" }
  ];

  return (
    <main className="relative">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroBackground />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-accent-500 font-medium tracking-[0.2em] uppercase mb-4 text-sm sm:text-base">
              13 – 19 September 2026
            </p>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-white leading-tight mb-6">
              XIV Forum of <br />
              <span className="italic font-light">Partial Differential Equations</span>
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-200 mb-16">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-accent-500" />
                <span>Będlewo Conference Center, Poland</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/registration" 
                className="px-8 py-3 bg-accent-500 hover:bg-accent-600 text-white font-medium rounded-full transition-all transform hover:scale-105 shadow-lg shadow-accent-500/30"
              >
                Register Now
              </Link>
              <Link 
                to="/program" 
                className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium rounded-full border border-white/20 transition-all"
              >
                View Programme
              </Link>
            </div>
          </motion.div>
        </div>
      </section>


      

      <section className="py-24 relative overflow-hidden">
        {/* Nakładka rozjaśniająca (85% bieli + lekkie rozmycie), aby tekst był idealnie czytelny */}
        <div className="absolute inset-0 z-0 bg-white/85 backdrop-blur-[2px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-serif text-primary-900 mb-6">General Information</h2>
              <div className="w-16 h-1 bg-accent-500 mb-8" />
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                The Forum of Partial Differential Equations is an international conference devoted to recent advances in the theory and applications of partial differential equations.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                The meeting aims to bring together researchers at different career stages to present new results, exchange ideas, and foster collaborations across various areas of PDEs.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                The conference is organized by the Institute of Mathematics of the Polish Academy of Sciences, University of Warsaw, and University of Wrocław.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div 
                className="aspect-[4/3] rounded-3xl overflow-hidden"
                style={{
                  // Mocne rozmycie na wszystkich 4 krawędziach (góra, dół, lewo, prawo)
                  maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
                  maskComposite: 'intersect',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
                  WebkitMaskComposite: 'source-in'
                }}
              >
                { <img 
                  src="https://scontent-fra5-1.xx.fbcdn.net/v/t39.30808-6/502464674_1129662912302205_1360854566771377972_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=2a1932&_nc_ohc=2VSXw59k1AQQ7kNvwGXWBcj&_nc_oc=AdrTxIMvYwP32SzxmHWf9TKnojtKyomFREJkU3Esb8oFrQ_N6qt7ilVzCu-h3_RTw34&_nc_zt=23&_nc_ht=scontent-fra5-1.xx&_nc_gid=T8pZ-h-LXJxRRFpXYn8RAw&_nc_ss=7a32e&oh=00_AfzSNrp4PGsOeVmb8onA3tUMZSRgj0bB1sR_euTppwUKHA&oe=69C844B6" 
                  alt="Będlewo Palace" 
                  className="w-full h-full object-cover"
                  style={{ 
                    // Parametry do przesuwania i zoomowania zdjęcia:
                    objectPosition: '20% 50%', // Zmień na np. '50% 30%' aby przesunąć w górę/dół
                    // transform: 'scale(1.2)',  // Zmień na np. 'scale(1.0)' lub 'scale(1.3)' aby oddalić/przybliżyć
                  }}
                  referrerPolicy="no-referrer"
                /> 
                // <CropBox
                //   src="https://scontent-fra5-1.xx.fbcdn.net/v/t39.30808-6/502464674_1129662912302205_1360854566771377972_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=2a1932&_nc_ohc=2VSXw59k1AQQ7kNvwGXWBcj&_nc_oc=AdrTxIMvYwP32SzxmHWf9TKnojtKyomFREJkU3Esb8oFrQ_N6qt7ilVzCu-h3_RTw34&_nc_zt=23&_nc_ht=scontent-fra5-1.xx&_nc_gid=T8pZ-h-LXJxRRFpXYn8RAw&_nc_ss=7a32e&oh=00_AfzSNrp4PGsOeVmb8onA3tUMZSRgj0bB1sR_euTppwUKHA&oe=69C844B6"
                //   alt="Będlewo Palace"
                //   a={0}
                //   b={15}
                //   c={100}
                //   d={100}
                // />              
                }
                
              </div>
              <div className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 bg-primary-900 text-white p-6 sm:p-8 rounded-2xl shadow-2xl z-10 border border-white/10 backdrop-blur-sm">
                <p className="text-3xl sm:text-4xl font-serif font-bold text-accent-500 mb-1">14th</p>
                <p className="text-xs sm:text-sm uppercase tracking-wider opacity-80">Edition</p>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CountdownTimer />
          </motion.div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        {/* Nakładka lekko szara (90% szarości + rozmycie), odróżnia się od sekcji wyżej */}
        <div className="absolute inset-0 z-0 bg-gray-50/90 backdrop-blur-[3px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-serif text-primary-900 mb-4">Invited Speakers</h2>
              <div className="w-16 h-1 bg-accent-500 mx-auto" />
            </motion.div>
          </div>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05
                }
              }
            }}
          >
            {invitedSpeakers.map((speaker, idx) => (
              <motion.div
                key={idx}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
              >
                <a 
                  href={speaker.url !== "#" ? speaker.url : undefined}
                  target={speaker.url !== "#" ? "_blank" : undefined}
                  rel={speaker.url !== "#" ? "noreferrer" : undefined}
                  className={`relative block h-full bg-white p-5 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 group ${speaker.url !== "#" ? "hover:-translate-y-1 hover:shadow-lg hover:border-accent-300 cursor-pointer" : ""}`}
                >
                  {speaker.url !== "#" && (
                    <ExternalLink size={14} className="absolute top-3 right-3 text-gray-300 group-hover:text-accent-500 transition-colors" />
                  )}
                  <div className="flex items-center justify-between gap-4 h-full">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-serif font-bold text-primary-900 mb-1 leading-tight pr-2 group-hover:text-accent-600 transition-colors">{speaker.name}</h4>
                      <p className="text-gray-600 text-sm leading-snug">{speaker.affiliation}</p>
                    </div>
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-primary-50 border-2 border-primary-100 flex items-center justify-center shrink-0">
                      {speaker.image ? (
                        <img 
                          src={speaker.image} 
                          alt={speaker.name} 
                          className="w-full h-full object-cover" 
                          style={{ objectPosition: speaker.imagePosition || 'center' }}
                        />
                      ) : (
                        <User size={24} className="text-primary-400" />
                      )}
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        {/* Nakładka biała (90% bieli + rozmycie) */}
        <div className="absolute inset-0 z-0 bg-white/90 backdrop-blur-[2px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div>
              <h2 className="text-4xl font-serif text-primary-900 mb-4">Important Information</h2>
              <div className="w-16 h-1 bg-accent-500 mx-auto" />
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            <div 
              className="w-full md:w-[calc(50%-16px)] lg:w-[calc(25%-24px)] bg-white/95 backdrop-blur-sm shadow-xl p-8 rounded-2xl text-center border border-white/50"
            >
              <Calendar size={32} className="mx-auto text-accent-500 mb-4" />
              <h4 className="text-lg font-serif font-bold text-primary-900 mb-2">Dates</h4>
              <p className="text-gray-600">13 – 19 September 2026</p>
            </div>
            
            <div 
              className="w-full md:w-[calc(50%-16px)] lg:w-[calc(25%-24px)] bg-white/95 backdrop-blur-sm shadow-xl p-8 rounded-2xl text-center border border-white/50 flex flex-col items-center"
            >
              <MapPin size={32} className="mx-auto text-accent-500 mb-4" />
              <h4 className="text-lg font-serif font-bold text-primary-900 mb-2">Location</h4>
              <p className="text-gray-600 mb-4">Będlewo Conference Center, Poland</p>
              <a 
                href="https://www.google.com/maps/place/Pa%C5%82ac+Potockich+B%C4%99dlewo/@52.2357476,16.7268353,17z/data=!4m9!3m8!1s0x47044cfea71ce475:0x981c4c654fa2c08c!5m2!4m1!1i2!8m2!3d52.2357443!4d16.7294102!16s%2Fg%2F121qyrzx?entry=ttu&g_ep=EgoyMDI2MDIwNC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-600 hover:text-accent-700 hover:underline mt-auto"
              >
                View on the map <ExternalLink size={14} />
              </a>
            </div>
            
            <div 
              className="w-full md:w-[calc(50%-16px)] lg:w-[calc(25%-24px)] bg-white/95 backdrop-blur-sm shadow-xl p-8 rounded-2xl text-center border border-white/50"
            >
              <Clock size={32} className="mx-auto text-accent-500 mb-4" />
              <h4 className="text-lg font-serif font-bold text-primary-900 mb-2">Deadlines</h4>
              <div className="text-gray-600 space-y-1">
                <p><span className="font-medium text-gray-900">Registration:</span> TBA</p>
                <p><span className="font-medium text-gray-900">Abstracts:</span> TBA</p>
              </div>
            </div>
            
            <div 
              className="w-full md:w-[calc(50%-16px)] lg:w-[calc(25%-24px)] bg-white/95 backdrop-blur-sm shadow-xl p-8 rounded-2xl text-center border border-white/50 flex flex-col items-center justify-center"
            >
              <Mail size={32} className="mx-auto text-accent-500 mb-4" />
              <h4 className="text-lg font-serif font-bold text-primary-900 mb-2">Contact</h4>
              <div className="text-gray-600 space-y-1 text-sm">
                <p><span className="font-medium text-gray-900">Email:</span> <a href="mailto:xivforum@impan.pl" className="text-accent-600 hover:text-accent-700 hover:underline transition-colors">xivforum@impan.pl</a></p>
                <p><span className="font-medium text-gray-900">Organizers:</span> J.&nbsp;Mederski, B.&nbsp;Bieganowski, S.&nbsp;Cygan</p>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-12 border-t border-gray-100 mb-8">
            <div>
              <h3 className="text-2xl font-serif text-primary-900">Related Events</h3>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://panda2026.pwr.edu.pl/"
              target="_blank"
              rel="noreferrer"
              className="w-full md:w-[calc(33.333%-11px)] block p-5 rounded-xl border border-white/50 shadow-md bg-white/95 backdrop-blur-sm hover:-translate-y-1 hover:shadow-xl hover:border-accent-300 hover:bg-white transition-all duration-300 group"
            >
              <h4 className="text-lg font-serif font-bold text-primary-800 mb-2 group-hover:text-accent-600 transition-colors">Probability and Analysis 2026</h4>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <Calendar size={14} className="text-gray-400" />
                11 – 15 May 2026, Będlewo
              </p>
            </a>
            
            <a
              href="https://sites.google.com/impan.pl/ntepde2026"
              target="_blank"
              rel="noreferrer"
              className="w-full md:w-[calc(33.333%-11px)] block p-5 rounded-xl border border-white/50 shadow-md bg-white/95 backdrop-blur-sm hover:-translate-y-1 hover:shadow-xl hover:border-accent-300 hover:bg-white transition-all duration-300 group"
            >
              <h4 className="text-lg font-serif font-bold text-primary-800 mb-2 group-hover:text-accent-600 transition-colors">New trends in elliptic PDEs</h4>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <Calendar size={14} className="text-gray-400" />
                13 – 17 July 2026, Będlewo
              </p>
            </a>

            <a
              href="http://somachi-ptm.pwr.edu.pl/"
              target="_blank"
              rel="noreferrer"
              className="w-full md:w-[calc(33.333%-11px)] block p-5 rounded-xl border border-white/50 shadow-md bg-white/95 backdrop-blur-sm hover:-translate-y-1 hover:shadow-xl hover:border-accent-300 hover:bg-white transition-all duration-300 group"
            >
              <h4 className="text-lg font-serif font-bold text-primary-800 mb-2 group-hover:text-accent-600 transition-colors">SOMACHI</h4>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <Calendar size={14} className="text-gray-400" />
                7 – 12 September 2026, Wrocław
              </p>
            </a>
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden border-t border-gray-200/50">
        {/* Nakładka szara (95% szarości + rozmycie) */}
        <div className="absolute inset-0 z-0 bg-gray-50/95 backdrop-blur-[4px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Sponsors */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-serif text-gray-500 uppercase tracking-widest">Sponsors</h2>
            </div>
            
            <div className="grid grid-cols-3 gap-3 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
              {sponsors.map((sponsor, idx) => (
                <a 
                  key={idx} 
                  href={sponsor.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="group relative flex flex-col items-center justify-between aspect-square sm:aspect-[4/3] bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-6 transition-all duration-300 hover:shadow-lg hover:border-accent-300 hover:-translate-y-1"
                >
                  <div className="w-full flex-1 flex items-center justify-center mb-2 sm:mb-4 min-h-0">
                    <img 
                      src={sponsor.logo} 
                      alt={sponsor.name.replace('\n', ' ')} 
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        e.currentTarget.nextElementSibling?.classList.add('flex');
                      }}
                    />
                    <div className="hidden flex-col items-center justify-center text-gray-200">
                      <Building2 className="w-6 h-6 sm:w-10 sm:h-10" />
                    </div>
                  </div>
                  <span className="text-[10px] sm:text-sm md:text-lg font-serif font-bold text-primary-900 text-center leading-tight group-hover:text-accent-600 transition-colors">
                    {sponsor.name.split('\n').map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <>
                            <br className="block lg:hidden" />
                            <span className="hidden lg:inline"> </span>
                          </>
                        )}
                      </React.Fragment>
                    ))}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Partners */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-2xl font-serif text-gray-500 uppercase tracking-widest">Partners</h2>
            </div>
            
            <div className="flex justify-center gap-3 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
              {partners.map((partner, idx) => (
                <a 
                  key={idx} 
                  href={partner.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="group relative flex flex-col items-center justify-between w-[32%] min-w-[110px] sm:min-w-[220px] max-w-[280px] aspect-square sm:aspect-[4/3] bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-6 transition-all duration-300 hover:shadow-lg hover:border-accent-300 hover:-translate-y-1"
                >
                  <div className="w-full flex-1 flex items-center justify-center mb-2 sm:mb-4 min-h-0">
                    <img 
                      src={partner.logo} 
                      alt={partner.name.replace('\n', ' ')} 
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        e.currentTarget.nextElementSibling?.classList.add('flex');
                      }}
                    />
                    <div className="hidden flex-col items-center justify-center text-gray-200">
                      <Building2 className="w-6 h-6 sm:w-10 sm:h-10" />
                    </div>
                  </div>
                  <span className="text-[10px] sm:text-sm md:text-lg font-serif font-bold text-primary-900 text-center leading-tight group-hover:text-accent-600 transition-colors">
                    {partner.name.split('\n').map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <>
                            <br className="block lg:hidden" />
                            <span className="hidden lg:inline"> </span>
                          </>
                        )}
                      </React.Fragment>
                    ))}
                  </span>
                </a>
              ))}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
};

const RegistrationPage = () => {
  return (
    <main className="flex-grow relative pb-24">
      <div className="absolute inset-0 z-[-1] bg-gray-50/90 backdrop-blur-[3px]" />
      <PageHeader title="Registration" subtitle="Join the XIV Forum of Partial Differential Equations" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-serif text-primary-900 mb-6 flex items-center gap-3">
                <UserCheck className="text-accent-500" /> Conference Fees
              </h3>
              <ul className="space-y-6">
                <li className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="text-lg font-medium text-primary-900 mb-2">Regular Fee</div>
                  <div className="text-3xl font-light text-accent-600">2200 PLN <span className="text-lg text-gray-500">(~520 EUR)</span></div>
                </li>
                <li className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="text-lg font-medium text-primary-900 mb-2">Reduced Fee</div>
                  <div className="text-3xl font-light text-accent-600 mb-2">1600 PLN <span className="text-lg text-gray-500">(~380 EUR)</span></div>
                  <div className="text-sm text-gray-500 italic">— limited number of places</div>
                </li>
              </ul>
              
              <div className="mt-8 space-y-4 text-gray-600 text-sm leading-relaxed">
                <p>
                  The reduced fee is limited and depends on the number of conference subsidies available. We encourage you to register as soon as possible to secure the reduced registration fee. A small number of conference fee waivers may also be offered to early-career researchers without financial support. More information will be provided in June.
                </p>
                <p>
                  The fee covers transportation to and from Poznań on the arrival and departure days, and full-board accommodation.
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-serif text-primary-900 mb-6 flex items-center gap-3">
                <Mail className="text-accent-500" /> How to Register
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Please complete the online registration form to secure your place at the conference. If you have any questions regarding the registration process, feel free to contact us.
              </p>
              
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSe-atxfF1fm6vXikSZhwWYcNRTVmS7zP1JEjtskxzIcEIqgAA/viewform?usp=header"
                target="_blank"
                rel="noreferrer"
                className="block w-full text-center px-8 py-4 bg-accent-500 hover:bg-accent-600 text-white font-medium rounded-xl transition-all transform hover:-translate-y-1 shadow-lg shadow-accent-500/30 mb-6"
              >
                Go to Registration Form <ExternalLink size={18} className="inline ml-2" />
              </a>
              
              <div className="flex items-center justify-center gap-3 text-gray-600 bg-gray-50 p-4 rounded-xl">
                <Mail size={20} className="text-primary-900" />
                <span>Contact: <a href="mailto:xivforum@impan.pl" className="text-accent-600 hover:underline font-medium">xivforum@impan.pl</a></span>
              </div>
            </div>
          </div>

          {/* Payment Information Section */}
          <div className="mt-12 pt-12 border-t border-gray-100">
            <div className="bg-gradient-to-br from-primary-900 to-primary-800 rounded-2xl p-8 md:p-10 text-white shadow-xl relative overflow-hidden">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 -mt-10 -mr-10 text-primary-700 opacity-30 pointer-events-none">
                <Landmark size={240} strokeWidth={1} />
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-serif mb-8 flex items-center gap-3 text-white">
                  <CreditCard className="text-accent-400" /> Payment Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                  <div className="space-y-6">
                    <h4 className="text-primary-200 font-medium uppercase tracking-wider text-sm border-b border-primary-700/50 pb-2">Bank Details</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="text-primary-300 text-sm mb-1">Bank Name</div>
                        <div className="font-medium text-lg">Bank Gospodarstwa Krajowego</div>
                        <div className="text-sm text-primary-200">Al. Jerozolimskie 7, 00-955 Warszawa, Poland</div>
                      </div>
                      <div>
                        <div className="text-primary-300 text-sm mb-1">Account Number (IBAN EUR)</div>
                        <div className="font-mono text-lg tracking-wider bg-primary-950/50 inline-block px-3 py-1.5 rounded-md border border-primary-700/50">
                          PL 80 1130 1017 0020 1467 1520 0008
                        </div>
                      </div>
                      <div>
                        <div className="text-primary-300 text-sm mb-1">Account Number (IBAN PLN)</div>
                        <div className="font-mono text-lg tracking-wider bg-primary-950/50 inline-block px-3 py-1.5 rounded-md border border-primary-700/50">
                          PL 48 1130 1017 0020 1467 1520 0002
                        </div>
                      </div>
                      <div>
                        <div className="text-primary-300 text-sm mb-1">SWIFT / BIC</div>
                        <div className="font-mono text-lg tracking-wider">GOSKPLPW</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h4 className="text-primary-200 font-medium uppercase tracking-wider text-sm border-b border-primary-700/50 pb-2">Payment Address & Title</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="text-primary-300 text-sm mb-1">Account Holder</div>
                        <div className="font-medium text-lg">Ośrodek Badawczo-Konferencyjny IMPAN w Będlewie</div>
                      </div>
                      <div className="mt-6 p-4 bg-white/10 border border-white/20 rounded-xl backdrop-blur-sm">
                        <div className="text-primary-200 text-sm mb-1">Transfer Description (Important)</div>
                        <div className="font-mono font-medium text-white text-lg">FORUM PDE + name of the participant</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Justified Cases Section */}
            <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-6 text-blue-900">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <AlertCircle size={20} className="text-blue-600" /> Financial Support
              </h4>
              <p className="text-sm leading-relaxed text-blue-800">
                In justified cases and subject to availability of funds, it is possible to apply for financial support for participation in the conference. Applications will be handled individually. Interested participants should contact the organisers directly at <a href="mailto:xivforum@impan.pl" className="font-medium text-blue-700 hover:underline">xivforum@impan.pl</a>.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

interface Participant {
  name: string;
  surname: string;
  affiliation: string;
}

const ParticipantsPage = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Participant, direction: 'asc' | 'desc' }>({ key: 'surname', direction: 'asc' });

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const SHEET_ID = "1VffiImOEmeS45pU_LhfasbGLAAkNoK3ASsNCB64V1K4";
        const GID = "1757362562";
        const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${GID}&tq=${encodeURIComponent("select A, B, C where A is not null")}`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        
        const text = await response.text();
        // Google Visualization API returns a JSON wrapped in a function call
        const jsonString = text.substring(47).slice(0, -2);
        const json = JSON.parse(jsonString);
        
        const data = json.table.rows.map((row: any) => ({
          name: row.c[0]?.v || '',
          surname: row.c[1]?.v || '',
          affiliation: row.c[2]?.v || ''
        }));
        
        setParticipants(data);
      } catch (err) {
        console.error("Error fetching participants:", err);
        setError("Failed to load participants list. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  const filteredAndSorted = useMemo(() => {
    let result = participants;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.surname.toLowerCase().includes(query) ||
        p.affiliation.toLowerCase().includes(query)
      );
    }
    
    result.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    
    return result;
  }, [participants, searchQuery, sortConfig]);

  const handleSort = (key: keyof Participant) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const SortIcon = ({ columnKey }: { columnKey: keyof Participant }) => {
    if (sortConfig.key !== columnKey) return <ArrowUpDown size={14} className="text-gray-400 ml-1" />;
    return sortConfig.direction === 'asc' 
      ? <ArrowUp size={14} className="text-accent-500 ml-1" /> 
      : <ArrowDown size={14} className="text-accent-500 ml-1" />;
  };

  return (
    <main className="flex-grow relative pb-24">
      <div className="absolute inset-0 z-[-1] bg-gray-50/90 backdrop-blur-[3px]" />
      <PageHeader title="Participants" subtitle="List of registered attendees" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-2xl font-serif text-primary-900 flex items-center gap-3">
                <Users className="text-accent-500" />
                Participants
              </h3>
              {!loading && !error && (
                <p className="text-sm text-gray-500 mt-1">
                  {participants.length} registered participants • Auto-updated from Google Sheets
                </p>
              )}
            </div>
            
            <div className="relative w-full md:w-72">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search (name / affiliation)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 sm:text-sm transition-all"
              />
            </div>
          </div>

          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-gray-400">
              <Loader2 size={40} className="animate-spin mb-4 text-accent-500" />
              <p>Loading participants list...</p>
            </div>
          ) : error ? (
            <div className="py-12 text-center text-red-500 bg-red-50 rounded-xl border border-red-100">
              <p>{error}</p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-primary-900">
                    <tr>
                      <th 
                        scope="col" 
                        className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider cursor-pointer hover:bg-primary-800 transition-colors"
                        onClick={() => handleSort('name')}
                      >
                        <div className="flex items-center">
                          Name <SortIcon columnKey="name" />
                        </div>
                      </th>
                      <th 
                        scope="col" 
                        className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider cursor-pointer hover:bg-primary-800 transition-colors"
                        onClick={() => handleSort('surname')}
                      >
                        <div className="flex items-center">
                          Surname <SortIcon columnKey="surname" />
                        </div>
                      </th>
                      <th 
                        scope="col" 
                        className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider cursor-pointer hover:bg-primary-800 transition-colors"
                        onClick={() => handleSort('affiliation')}
                      >
                        <div className="flex items-center">
                          Affiliation <SortIcon columnKey="affiliation" />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {filteredAndSorted.length > 0 ? (
                      filteredAndSorted.map((participant, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50/50 hover:bg-gray-50'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {participant.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {participant.surname}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {participant.affiliation}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                          No participants found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden flex flex-col gap-4">
                {filteredAndSorted.length > 0 ? (
                  filteredAndSorted.map((participant, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-2">
                      <div className="font-bold text-gray-900 text-lg">
                        {participant.name} {participant.surname}
                      </div>
                      <div className="text-sm text-gray-600 flex items-start gap-2">
                        <Building2 size={16} className="mt-0.5 text-accent-500 shrink-0" />
                        <span>{participant.affiliation}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center text-gray-500 bg-white rounded-xl border border-gray-100 shadow-sm">
                    No participants found matching your search.
                  </div>
                )}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </main>
  );
};

const SHEET_ID = "1qzXcSyGqvO82RKZHYP4ongcIbIbkXkHhNWaZ2FAbb6k";
const SHEET_GID = "293368709"; 
const RANGE = "A:F"; 

interface ScheduleSlot {
  name: string;
  title: string;
}

interface ScheduleRow {
  time: string;
  days: ScheduleSlot[];
  rawText: string;
}

const ProgramPage = () => {
  const [schedule, setSchedule] = useState<ScheduleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?gid=${SHEET_GID}&range=${RANGE}&tqx=out:json`;
        const response = await fetch(url);
        const text = await response.text();
        
        const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);/);
        if (!match) throw new Error("Invalid response format");
        
        const data = JSON.parse(match[1]);
        const rows = data.table.rows;
        
        const parsedSchedule: ScheduleRow[] = [];
        
        for (let i = 0; i < rows.length; i += 2) {
          const nameRow = rows[i]?.c || [];
          const titleRow = rows[i + 1]?.c || [];
          
          const time = nameRow[0]?.v || "";
          const days: ScheduleSlot[] = [];
          let rawText = time + " ";
          
          for (let col = 1; col <= 5; col++) {
            const name = nameRow[col]?.v || "";
            const title = titleRow[col]?.v || "";
            days.push({ name, title });
            rawText += `${name} ${title} `;
          }
          
          parsedSchedule.push({ time, days, rawText: rawText.toLowerCase() });
        }
        
        setSchedule(parsedSchedule);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch schedule:", err);
        setError("Failed to load schedule. Please try again later.");
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  const filteredSchedule = schedule.filter(row => 
    searchQuery === "" || row.rawText.includes(searchQuery.toLowerCase())
  );

  const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <main className="flex-grow relative pb-24">
      <div className="absolute inset-0 z-[-1] bg-gray-50/90 backdrop-blur-[3px]" />
      <PageHeader title="Programme & Abstracts" subtitle="Schedule and submissions" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12"
        >
          <div className="text-center mb-12">
            <BookOpen size={48} className="mx-auto text-accent-500 mb-6" />
            <h3 className="text-2xl font-serif text-primary-900 mb-4">Abstract Submission</h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-4">
              Deadline for abstract submission: <strong className="text-primary-900">TBA</strong>
            </p>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              We invite participants to submit abstracts for their presentations. Please note that abstract submission requires a Google account.
            </p>
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSduwu2knI4b5rp9Smi4iNHGQgHP5o-giGyg3KN_gCNWGB-D4A/viewform?usp=header"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-8 py-3 bg-primary-900 hover:bg-primary-800 text-white font-medium rounded-full transition-all"
            >
              Submit Abstract <ExternalLink size={16} className="ml-2" />
            </a>
          </div>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
            <h4 className="text-lg font-medium text-blue-900 mb-2 flex items-center gap-2">
              <AlertCircle size={20} className="text-blue-600" /> Alternative Submission
            </h4>
            <p className="text-blue-800">
              If you wish to submit an abstract without using a Google account, please send your abstract directly to the conference organizers at <a href="mailto:xivforum@impan.pl" className="font-bold hover:underline">xivforum@impan.pl</a>.
            </p>
          </div>
        </motion.div>

        {/* Schedule Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-2xl font-serif text-primary-900 flex items-center gap-2">
                <Calendar className="text-accent-500" /> Conference Schedule
              </h3>
              <p className="text-sm text-gray-500 mt-1">Auto-updated from Google Sheets</p>
            </div>
            
            <div className="relative max-w-md w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search (speaker / title)…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-accent-500 focus:border-accent-500 sm:text-sm transition-colors"
              />
            </div>
          </div>

          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-accent-500 mb-4"></div>
              <p className="text-gray-500">Loading schedule...</p>
            </div>
          ) : error ? (
            <div className="py-12 text-center text-red-500 bg-red-50 rounded-xl">
              <p>{error}</p>
            </div>
          ) : (
            <>
              {/* Desktop View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-primary-900 to-primary-800 text-white">
                      <th className="py-4 px-3 text-center font-bold rounded-tl-xl whitespace-nowrap text-sm">Time</th>
                      {dayNames.map((day, i) => (
                        <th key={day} className={`py-4 px-4 text-center font-bold ${i === 4 ? 'rounded-tr-xl' : ''}`}>
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSchedule.length > 0 ? (
                      filteredSchedule.map((row, i) => (
                        <tr key={i} className={`border-b border-gray-100 last:border-0 transition-colors ${i % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50/50 hover:bg-gray-50'}`}>
                          <td className="py-4 px-3 text-center font-bold text-primary-900 bg-primary-50/30 border-r border-gray-100 whitespace-nowrap text-sm">
                            {row.time}
                          </td>
                          {row.days.map((slot, j) => (
                            <td key={j} className="py-4 px-4 text-center align-middle border-r border-gray-100 last:border-0">
                              {slot.name && (
                                <div className="font-bold text-gray-900 text-sm">{slot.name}</div>
                              )}
                              {slot.title && (
                                <div className="text-xs text-gray-500 mt-1 italic">{slot.title}</div>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-gray-500">
                          No matching items found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="md:hidden space-y-8">
                {filteredSchedule.length > 0 ? (
                  dayNames.map((day, dayIdx) => {
                    const hasContent = filteredSchedule.some(row => 
                      row.days[dayIdx].name || row.days[dayIdx].title
                    );
                    
                    if (!hasContent) return null;

                    return (
                      <div key={day} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                        <div className="bg-primary-900 text-white px-4 py-3 font-bold uppercase tracking-wider text-sm">
                          {day}
                        </div>
                        <div className="divide-y divide-gray-100">
                          {filteredSchedule
                            .filter(row => row.days[dayIdx].name || row.days[dayIdx].title)
                            .map((row, i) => {
                            const slot = row.days[dayIdx];
                            
                            return (
                              <div key={i} className={`flex p-4 gap-3 items-center transition-colors ${i % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50/50 hover:bg-gray-50'}`}>
                                <div className="flex-shrink-0 text-center">
                                  <span className="inline-block px-2 py-1 bg-primary-50 text-primary-900 font-bold text-xs rounded-lg whitespace-nowrap">
                                    {row.time}
                                  </span>
                                </div>
                                <div className="flex-grow">
                                  {slot.name && <div className="font-bold text-gray-900 text-sm">{slot.name}</div>}
                                  {slot.title && <div className="text-xs text-gray-500 mt-1 italic">{slot.title}</div>}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-12 text-center text-gray-500 border border-gray-100 rounded-xl">
                    No matching items found.
                  </div>
                )}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </main>
  );
};

const ScientificCommitteePage = () => {
  const members = [
    { name: "Krzysztof Bogdan", affiliation: "Wrocław University of Science and Technology", url: "https://wmat.pwr.edu.pl/pracownicy/krzysztof-bogdan" },
    { name: "Aleksander Ćwiszewski", affiliation: "Nicolaus Copernicus University in Toruń", url: "https://www.mat.umk.pl/knam/pracownicy/?id=7100700" },
    { name: "Piotr Gwiazda", affiliation: "Polish Academy of Sciences (IMPAN)", url: "https://www.impan.pl/en/institute/scientific-staff" },
    { name: "Tomasz Jakubowski", affiliation: "Wrocław University of Science and Technology", url: "https://prac.im.pwr.edu.pl/~jakubow/" },
    { name: "Joanna Janczewska", affiliation: "Gdańsk University of Technology", url: "https://pg.edu.pl/en/p/joanna-janczewska-19734" },
    { name: "Grzegorz Karch", affiliation: "University of Wrocław", url: "https://karch.math.uni.wroc.pl/" },
    { name: "Karolina Kropielnicka", affiliation: "Polish Academy of Sciences (IM PAN)", url: "https://mat.ug.edu.pl/~kmalina/" },
    { name: "Wojciech Kryszewski", affiliation: "Lodz University of Technology", url: "https://im.p.lodz.pl/en/WojciechKryszewski" },
    { name: "Błażej Miasojedow", affiliation: "University of Warsaw", url: "https://www.mimuw.edu.pl/~bmia/" },
    { name: "Piotr Mucha", affiliation: "University of Warsaw", url: "https://www.mimuw.edu.pl/~pbmucha/" },
    { name: "Piotr Zgliczyński", affiliation: "Jagiellonian University", url: "https://ww2.ii.uj.edu.pl/~zgliczyn/" }
  ];

  return (
    <main className="flex-grow relative pb-24">
      <div className="absolute inset-0 z-[-1] bg-gray-50/90 backdrop-blur-[3px]" />
      <PageHeader title="Scientific Committee" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <motion.div 
          className="flex flex-wrap justify-center gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05
              }
            }
          }}
        >
          {members.map((member, idx) => (
            <motion.div 
              key={idx}
              className="w-full md:w-[calc(50%-12px)]"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <a 
                href={member.url}
                target="_blank"
                rel="noreferrer"
                className="block h-full bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-accent-300 cursor-pointer group"
              >
                <div className="bg-primary-50 p-3 rounded-lg text-primary-900 shrink-0 transition-colors group-hover:bg-primary-100">
                  <GraduationCap size={24} />
                </div>
                <div className="flex-grow">
                  <h4 className="text-lg font-serif font-bold text-primary-900 group-hover:text-accent-600 transition-colors">{member.name}</h4>
                  <p className="text-gray-600 text-sm mt-1 mb-3">{member.affiliation}</p>
                  <span className="inline-flex items-center text-sm font-medium text-accent-600 group-hover:text-accent-700 transition-colors">
                    Website <ExternalLink size={14} className="ml-1" />
                  </span>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
};

const OrganizingCommitteePage = () => {
  const members = [
    { name: "Jarosław Mederski", affiliation: "Polish Academy of Sciences (IMPAN)", url: "https://jmederski.impan.pl/", image: "" },
    { name: "Bartosz Bieganowski", affiliation: "University of Warsaw", url: "https://mimuw.edu.pl/~bartoszb/", image: "" },
    { name: "Szymon Cygan", affiliation: "University of Wrocław", url: "https://scygan.math.uni.wroc.pl/", image: "" }
  ];

  return (
    <main className="flex-grow relative pb-24">
      <div className="absolute inset-0 z-[-1] bg-gray-50/90 backdrop-blur-[3px]" />
      <PageHeader title="Organizing Committee" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <motion.div 
          className="flex flex-wrap justify-center gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {members.map((member, idx) => (
            <motion.div 
              key={idx}
              className="w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-21.33px)]"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <a
                href={member.url}
                target="_blank"
                rel="noreferrer"
                className="block h-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-accent-300 cursor-pointer group"
              >
                <div className="w-24 h-24 mx-auto bg-accent-50 rounded-full flex items-center justify-center text-accent-600 mb-6 transition-transform duration-300 group-hover:scale-105 group-hover:bg-accent-100 overflow-hidden border-2 border-transparent group-hover:border-accent-200">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <Users size={32} />
                  )}
                </div>
                <h4 className="text-xl font-serif font-bold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">{member.name}</h4>
                <p className="text-gray-600 text-sm mb-4">{member.affiliation}</p>
                <span className="inline-flex items-center text-sm font-medium text-accent-600 group-hover:text-accent-700 transition-colors">
                  Website <ExternalLink size={14} className="ml-1" />
                </span>
              </a>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-600">
            For any inquiries, please contact the organizers at <br />
            <a href="mailto:xivforum@impan.pl" className="text-accent-600 font-medium hover:underline text-lg mt-2 inline-block">xivforum@impan.pl</a>
          </p>
        </div>
      </div>
    </main>
  );
};

// --- App Root ---

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-sans text-gray-900 selection:bg-accent-500 selection:text-white relative">
        {/* Globalne stałe tło z efektem paralaksy dla całej aplikacji */}
        <div 
          className="fixed inset-0 z-[-2]"
          style={{
            backgroundImage: 'url("https://lh3.googleusercontent.com/d/1Ryr8EP7S9YS6N1jzYwltiNyP-t9kg7eH")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/participants" element={<ParticipantsPage />} />
          <Route path="/program" element={<ProgramPage />} />
          <Route path="/scientific" element={<ScientificCommitteePage />} />
          <Route path="/organization" element={<OrganizingCommitteePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
