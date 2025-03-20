import { Button, ButtonRow } from "@/components/Button";
import ContactForm from "@/components/ContactForm";
import Modal from "@/components/Modal";
import Section from "@/components/Section";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { members } from "../components/membersList";

const CoachInfo = ({ setCoach, imgSrc, fname, past, description }) => (
  <div>
    <div className="" id={JSON.stringify({fname}).split(":")[1].replace("\"", "").replace("\"\}", "").toLowerCase()}></div>
    <div className="flex flex-col md:flex-row text-lg shadow p-20">
      {/* anchor to jump to each members' section from home page */}
      <div className="w-full md:w-1/5 flex flex-col items-center">
        <Image
          className="rounded-full shadow-lg mb-2 w-4/5"
          src={imgSrc}
          width={400}
          height={400}
          alt=" profile picture"
        />
      </div>
      <div className="w-full md:w-4/5">
        <h2 className="font-bold text-2xl text-ivy-blue mb-2">{fname}</h2>
        <p>College Counseling Professional</p>
        {past.map((p, i) => (
          <p className="font-medium" key={i}>
            {p}
          </p>
        ))}
        <p className="my-3">{description}</p>
        <div className="flex items-start">
          <Button
            onClick={() => {
              setCoach(fname);
            }}
            data-bs-toggle="modal"
            data-bs-target="#coachModal"
          >
            Request an introductory Session with {fname}
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default function About() {
  // FULL, INFO, CALL, or EVAL
  const [modalType, setModalType] = useState("INFO");
  const [coach, setCoach] = useState();

  return (
    <>
      <Head>
        <title>About Us - Ivy Ready College Admission Consulting</title>
        <meta
          name="description"
          content="Ivy Ready's team is made up of former admission officers and 
          graduates from top schools who have extensive experience in supporting students 
          with college planning and admission. Our mission is to provide a personalized admission 
          strategy for each student."
        />
      </Head>
      
      <Modal
        id="contactModal"
        title={
          modalType == "INFO"
            ? "Tell us how we can best serve you."
            : "Enter your info for a quick call."
        }
      >

      <ContactForm type={modalType} />

      </Modal>

      <Modal
        id="coachModal"
        title={`Request an Introductory Session with ${coach}`}
      >
        <ContactForm type="INFO" coachName={coach} />
      </Modal>

      {/* "banner" */}
      <div
        className="flex bg-about-hero bg-cover bg-white bg-center pt-20 sm:py-72"
        style={{ height: "400px" }}
      >
        <div className="m-auto text-center">
          <h1
            className="text-white text-4xl lg:text-7xl "
            style={{ textShadow: "5px 5px 5px black" }}
          >
            About Us
          </h1>
          <h2 className="text-white shadow text-center mb-10"
            style={{ textShadow: "5px 5px 5px black" }}
          > Professionals Dedicated to Excellence</h2>
        </div>
      </div>
      

      <Section title="Our Mission" centerContent>
        <p className="text-lg text-center my-3">
          Ivy Ready&apos;s mission is to provide a personalized admission strategy for each student by 
          capitalizing on their strengths, background, interest and aspirations. We value the diversity 
          of the families we serve and devote tremendous effort to ensure every student has the opportunity 
          to share their compelling story.
        </p>
        <ButtonRow setModalType={setModalType} lightBg />
      </Section>
      <Section
        title=""
        darkBg
      >
        <h2 className="text-center">Meet a Few Members of Our Team and Their Admission Background</h2>
        <p className="text-lg text-center 2xl">
        Our team is comprised of former admission officers and graduates of highly selective schools. 
        Contact us if a coach with the particular background you seek is not listed . We have an extended 
        list not shown here. We are dedicated to finding the perfect coach for you.

        </p>
      </Section>
      {members.map(({ fname, imgSrc, past, description }, i) => (
        <Section key={i} darkBg={i % 2 != 0}>
          <CoachInfo
            setCoach={setCoach}
            setModalType={setModalType}
            fname={fname}
            imgSrc={imgSrc}
            past={past}
            description={description}
          />
        </Section>
      ))}
      <ButtonRow setModalType={setModalType} lightBg />
    </>
     
  );
}
