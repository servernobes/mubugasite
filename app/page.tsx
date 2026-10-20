import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import LoanCalculator from "./components/LoanCalculator";
import News from "./components/News";
import Videos from "./components/Videos";
import LocationWrapper from "./components/LocationWrapper";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <WhyUs />
      <LoanCalculator />
      <News />
      <Videos />
      <LocationWrapper />
      <FAQ />
      <Contact />
    </>
  );
}
