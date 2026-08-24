import { Hero } from "@/components/hero/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";

export default function HomePage() {
  return (
    <>
      <Hero />
       <AboutSection />
      <ProjectsSection />
      <CertificationsSection />
      <ContactSection />
    </>
  );
}
