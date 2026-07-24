import HeroContent from "./HeroContent";
import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";
import HeroCards from "./HeroCards";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">

      <div className="mx-auto max-w-7xl px-6 py-24">

        <HeroContent />

        <HeroButtons />

        <HeroCards />

        <HeroStats />

      </div>

    </section>
  );
};

export default Hero;