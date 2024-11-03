import React, { useState, useEffect } from 'react';
import { Menu, X, Code, Brain, Megaphone, Palette, Mail, ArrowRight, Database, Globe } from 'lucide-react';

// Define type for the scrollTo function
type ScrollToFunction = (sectionId: string) => void;

// Define type for navItems array
interface NavItem {
  name: string;
  section: string;
}

// Animated background component
const AnimatedBackground: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute w-full h-full">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-blue-500/5 w-2 h-2 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${5 + Math.random() * 10}s linear infinite`,
            animationDelay: `${-Math.random() * 5}s`
          }}
        />
      ))}
    </div>
  </div>
);

interface NavbarProps {
  scrollTo: ScrollToFunction;
}

const Navbar: React.FC<NavbarProps> = ({ scrollTo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { name: 'Home', section: 'home' },
    { name: 'Services', section: 'services' },
    { name: 'About', section: 'about' },
    { name: 'Contact', section: 'contact' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center space-x-2">
            <Globe className="text-blue-600" size={28} />
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              RR TECH
            </span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map(item => (
              <button
                key={item.name}
                onClick={() => scrollTo(item.section)}
                className="text-gray-600 hover:text-blue-600 transition-colors relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
              </button>
            ))}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-blue-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4">
            {navItems.map(item => (
              <button
                key={item.name}
                onClick={() => {
                  scrollTo(item.section);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description }) => (
  <div className="group relative bg-white/50 backdrop-blur-lg p-6 rounded-xl border border-gray-200 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative">
      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl mb-4 group-hover:scale-110 transition-transform">
        <Icon className="text-white" size={24} />
      </div>
      <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
        {title}
      </h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const App: React.FC = () => {
  const scrollTo: ScrollToFunction = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const [count, setCount] = useState({ projects: 0, clients: 0, years: 0 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => ({
        projects: prev.projects >= 200 ? 200 : prev.projects + 2,
        clients: prev.clients >= 150 ? 150 : prev.clients + 1,
        years: prev.years >= 10 ? 10 : prev.years + 1
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar scrollTo={scrollTo} />
      
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-16 px-4 overflow-hidden">
        <AnimatedBackground />
        <div className="max-w-7xl mx-auto text-center relative">
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-blue-100 text-blue-600">
            Next-Gen Tech Solutions
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Transform Your Business
            </span>
            <br />
            with Advanced Technology
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Leveraging cutting-edge solutions to propel your business into the future
          </p>
          <button
            onClick={() => scrollTo('contact')}
            className="group bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-3 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all"
          >
            Get Started
            <ArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </button>

          <div className="grid grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{count.projects}+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{count.clients}+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{count.years}+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-16 px-4">
        <AnimatedBackground />
        <div className="max-w-7xl mx-auto relative">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Empowering businesses with advanced technological solutions
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon={Brain}
              title="AI & Machine Learning"
              description="Custom AI solutions that drive your business growth"
            />
            <ServiceCard
              icon={Code}
              title="Software Development"
              description="End-to-end software development services tailored to your needs"
            />
            <ServiceCard
              icon={Megaphone}
              title="Digital Marketing"
              description="Boost your online presence with our marketing strategies"
            />
            <ServiceCard
              icon={Palette}
              title="UI/UX Design"
              description="Designs that enhance user experience and engagement"
            />
            <ServiceCard
              icon={Database}
              title="Data Analytics"
              description="Data-driven insights to make informed decisions"
            />
            <ServiceCard
              icon={Mail}
              title="Customer Support"
              description="24/7 support to assist your customers anytime"
            />
          </div>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="relative py-16 px-4">
        <AnimatedBackground />
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/50 backdrop-blur-lg rounded-xl p-8 border border-gray-200">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                About Us
              </span>
            </h2>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-gray-600 mb-6">
                We are pioneers in technological innovation, specializing in transforming 
                businesses through advanced digital solutions. Our expertise spans artificial 
                intelligence, cloud computing, web development, and digital transformation.
              </p>
              <p className="text-gray-600">
                With a team of expert developers, data scientists, and designers, we deliver 
                cutting-edge solutions that help businesses stay ahead in the rapidly evolving 
                digital landscape. Our commitment to innovation and excellence drives us to 
                consistently deliver exceptional results for our clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-16 px-4">
        <AnimatedBackground />
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Connect With Us
            </span>
          </h2>
          <div className="inline-flex items-center space-x-2 bg-white/50 backdrop-blur-lg px-6 py-3 rounded-lg border border-gray-200">
            <Mail className="text-blue-600" size={24} />
            <a href="mailto:rrgroupoftechnologies@gmail.com" className="text-gray-600 hover:text-blue-600 transition-colors">
              rrgroupoftechnologies@gmail.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
