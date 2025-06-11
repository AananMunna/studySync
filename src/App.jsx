import "./App.css";
import FAQ from "./components/FAQ";
import FeaturesSection from "./components/FeaturesSection";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Leaderboard from "./components/Leaderboard";
import RecentAssignments from "./components/RecentAssignments";

function App() {
  return (
    <div>
      
      <Hero></Hero>
      <HowItWorks></HowItWorks>
      <FeaturesSection></FeaturesSection>
      <Leaderboard></Leaderboard>
      <RecentAssignments></RecentAssignments>
      <FAQ></FAQ>
    </div>
  );
}

export default App;
