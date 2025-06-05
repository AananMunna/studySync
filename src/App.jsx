import "./App.css";
import FAQ from "./components/FAQ";
import FeaturesSection from "./components/FeaturesSection";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import RecentAssignments from "./components/RecentAssignments";
import ScrollToTop from "./components/ScrollToTop";
import TopContributors from "./components/TopContributors";

function App() {
  return (
    <div>
      <ScrollToTop />
      <Hero></Hero>
      <HowItWorks></HowItWorks>
      <TopContributors></TopContributors>
      <FeaturesSection></FeaturesSection>
      <RecentAssignments></RecentAssignments>
      <FAQ></FAQ>
    </div>
  );
}

export default App;
