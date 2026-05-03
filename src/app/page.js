import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
import Process from "@/sections/Process";
import Testimonials from "@/sections/Testimonials";
import Contact from "@/sections/Contact";
import FloatingButtons from "@/Components/FloatingButtons";

export default function Home() {
  return (
    <>
      <section id="home">
        <Hero />
      </section>
      <section id="service">
        <Services />
      </section>
      <section id="process">
        <Process />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <section id="contact">
        <Contact />
      </section>

      {/* Floating Buttons */}
      <FloatingButtons />
    </>
  );
}
