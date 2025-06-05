import "./App.css";
import FAQ from "./components/FAQ";
import FeaturesSection from "./components/FeaturesSection";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import ScrollToTop from "./components/ScrollToTop";
import TopContributors from "./components/TopContributors";

function App() {
  return (
    <div>
      <ScrollToTop />
      <Hero></Hero>
      <HowItWorks></HowItWorks>
      <FeaturesSection></FeaturesSection>
      <TopContributors></TopContributors>
      <FAQ></FAQ>
    </div>
  );
}

export default App;
