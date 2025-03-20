import ContactForm from "@/components/ContactForm";
import Section from "@/components/Section";
import Head from "next/head";

export default function HourlyConsultation() {
  return (
    <>
      <Head>
        <title>
          Hourly Consultation - Ivy Ready College Admission Consulting
        </title>
        <meta
          name="description"
          content="Ivy Ready's hourly consultation services provide students with personalized college planning guidance from experienced experts to help them reach their goals."
        />
      </Head>

      {/* "banner" */}
      <div
        className="flex bg-hourly-banner bg-cover bg-white pt-20 sm:py-72"
        style={{ height: "400px" }}
      >
        <div className="m-auto text-center">
          <h1
            className="text-white text-4xl lg:text-7xl "
            style={{ textShadow: "5px 5px 5px black" }}
          >
            Hourly Consultation
          </h1>
          <h2 className="text-white shadow text-center mb-10"
            style={{ textShadow: "5px 5px 5px black" }}
          > An excellent alterntive to long-term packages.</h2>
        </div>
      </div>

      <Section>
        <ContactForm type="FULL" />
      </Section>
    </>
  );
}
