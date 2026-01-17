import { SectionHeader } from "./SectionHeader";
import { ContactInteractive } from "./ContactInteractive";
import type { Translations } from "@/i18n/translations";

type ContactSectionProps = {
  copy: Translations["contact"];
};

export function ContactSection({ copy }: ContactSectionProps) {
  return (
    <section
      id="contact"
      className="section-defer scroll-mt-16 bg-background py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeader
          eyebrow={copy.header.eyebrow}
          title={copy.header.title}
          description={copy.header.description}
        />
        <ContactInteractive copy={copy} />
      </div>
    </section>
  );
}
