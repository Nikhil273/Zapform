import Navbar from './Navbar';
import Hero from './Hero';
import Feature from './Feature';
import HowItWorks from './HowItWorks';
import Codesnipit from './Codesnipit';
import Pricing from './Pricing';
import Footer from './Footer';

const HomePage = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <Hero />
      <Feature />
      <HowItWorks />
      <Codesnipit />
      <Pricing />
      <Footer />
    </div>
  )
}

export default HomePage