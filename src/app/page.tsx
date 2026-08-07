import { Hero } from "@/components/Hero";
import { Advantages, ContactStrip, CtaSection, Docs, Faq, Goal, Intro, Legal, Services, Values } from "@/components/Sections";
import { JsonLd, faqSchema, servicesSchema } from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Advantages />
      <Services />
      <Legal />
      <Docs />
      <ContactStrip />
      <Faq />
      <CtaSection />
      <Values />
      <Goal />
      <JsonLd data={[...servicesSchema(), faqSchema()]} />
    </>
  );
}
