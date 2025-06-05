import "./App.css";
import FAQ from "./components/FAQ";
import FeaturesSection from "./components/FeaturesSection";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";

function App() {
  return (
    <div>
      <Hero></Hero>
      <HowItWorks></HowItWorks>
      <FeaturesSection></FeaturesSection>
      <FAQ></FAQ>
    </div>
  );
}

export default App;
