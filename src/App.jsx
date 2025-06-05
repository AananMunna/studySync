import "./App.css";
import FAQ from "./components/FAQ";
import FeaturesSection from "./components/FeaturesSection";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div>
      <ScrollToTop />
      <Hero></Hero>
      <HowItWorks></HowItWorks>
      <FeaturesSection></FeaturesSection>
      <FAQ></FAQ>
    </div>
  );
}

export default App;
