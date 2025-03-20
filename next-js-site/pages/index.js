import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import Section from "@/components/Section";
import Modal from "@/components/Modal";
import { Button, ButtonRow, ButtonRow2 } from "@/components/Button";
import { useState } from "react";
import { members } from "../components/membersList";

const HyperLink = ({ href, children }) => (
  <Link className="underline text-ivy-blue font-medium" href={href}>
    {...children}
  </Link>
);

export default function Home() {
  // FULL, INFO, CALL, or EVAL
  const [modalType, setModalType] = useState("INFO");
  const [coach, setCoach] = useState();

  const Profile = ({ fname, name, imgSrc, admCollege, description }) => (
    <div className="w-1/3 md:w-1/6 flex flex-col items-center mx-2">
      <Image
        className="rounded-full shadow-lg mb-2 w-4/5"
        src={imgSrc}
        width={400}
        height={400}
        alt="profile picture"
      />
      <span className="text-ivy-blue ">{fname} </span>
      <span className="truncate w-20 text-center">{admCollege}</span>
      {/* <ButtonRow2 setModalType={setModalType} /> */}
      <button
        className="mb-4"
        onClick={() => {
          setCoach(name);
        }}
        data-bs-toggle="modal"
        data-bs-target="#coachModal"
      >
        Learn More
      </button>
    </div>
  );

  return (
    <>
      <Head>
        <title>
          TouchablePhotos.com
        </title>
        <meta
          name="description"
          content="TouchablePhotos creates photos you can touch."
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

      <Modal id="coachModal" title={`Schedule your intro call with ${coach}`}>
        <ContactForm showProfile={true} coachName={coach} />
      </Modal>

      {/* Main Banner */}
      <div
        className="flex bg-hero bg-cover bg-white pt-20 sm:py-72 "
        style={{ height: "400px" }}
      >
        <div className="m-auto text-center">
          <h1
            className="text-ivy-red text-4xl lg:text-7xl "
            style={{ textShadow: "5px 5px 5px white" }}
          >
            TouchablePhotos.com
          </h1>
          <h4 className='text-2xl my-3 drop-shadow-lg italic font-medium'>
            Bringing your photos to life with photos you can touch.
            <br />
          </h4>
        </div>
      </div>



      <Section>
      <span id="application-support-questions-section"></span>

        <ContactForm type="FULL" />
      </Section>

    </>
  );
}