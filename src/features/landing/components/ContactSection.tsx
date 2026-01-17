import { SectionHeader } from "./SectionHeader";
import { ContactInteractive } from "./ContactInteractive";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="section-defer scroll-mt-16 bg-background py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeader
          eyebrow="Contact us"
          title="Let us design the next chapter of your product."
          description="Bring a vision, a challenge, or a launch date. We will help you craft something memorable."
        />
        <ContactInteractive />
      </div>
    </section>
  );
}
