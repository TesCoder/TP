import Head from "next/head";
import styles from "@/styles/Home.module.css";
import useContactForm from "../hooks/useContactForm";
import { useState } from "react";
import sendEmail from "../lib/sendEmail";
import Alert from "@/components/Alert";
import Link from "next/link";
import Image from "next/image";
import { members } from "../components/membersList";
import { Button, ButtonRow } from "@/components/Button";

export const FORM_TYPES = { INFO: 1, CALL: 2, FULL: 3 };

const Profile = ({ fname, name, imgSrc, admCollege, description }) => (
  <div className="flex flex-row items-center mb-3 border shadow-md rounded-lg p-2">
    <Image
      className="rounded-full w-1/5 shadow-2xl"
      src={imgSrc}
      width={128}
      height={128}
      alt=" profile picture"
    />
    <div className="flex flex-col w-3/5 justify-center text-center">
      <span className="text-ivy-blue text-center text-2xl font-semibold">
        {name}{" "}
      </span>
      <span className="text-ivy-blue text-center ">
        Admission Experience: {admCollege}
      </span>
      {/* <span className="truncate flex-auto ml-4 text-center justify-center">{description}</span> */}
      <a
        className="underline hover:cursor"
        onClick={() =>
          (window.location.href =
            "/about-us#" +
            JSON.stringify({ fname })
              .split(":")[1]
              .replace('"', "")
              .replace('"}', "")
              .toLowerCase())
        }
      >
        Learn More About {fname}
      </a>
      {/* <Link
        className="underline hover:cursor"
        href={`/about-us#${JSON.stringify({ fname })
          .split(":")[1]
          .replace('"', "")
          .replace('"}', "")
          .toLowerCase()}`}
      >
        Learn More About {fname}
      </Link> */}
    </div>

    {/* <button className="" href="/about-us">Learn More</button> */}
    {/* <Button
            onClick={() => {
              setCoach(name);
            }}
            data-bs-toggle="modal"
            data-bs-target="#coachModal"
          >
            Learn More About {name}
        </Button> */}
  </div>
);

export default function ContactForm({ type, coachName, showProfile }) {
  // Form Types: FULL, INFO, CALL, or EVAL
  const { values, handleChange } = useContactForm(); // hook
  const [isSubmitting, setSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    success: false,
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents page from reloading when a form is submtted
    setSubmitting(true);
    // console.log("Values:", values);
    try {
      const res = await sendEmail({ type, coach: coachName, ...values });
      if (res.status === 250) {
        setResponseMessage({
          success: true,
          message:
            "Thank you for your message. We will be reaching out to you soon.",
        });
        window.location.href = "/form-submitted#top";
      }
    } catch (e) {
      // console.log(e);
      setResponseMessage({
        success: false,
        message:
          "Oops something went wrong. Please try again. If error persists, please email us.",
      });
    }
    setSubmitting(false);
  };

  if (responseMessage.success) {
    return (
      <Alert
        message={responseMessage.message}
        success={responseMessage.success}
      />
    );
  }

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        {type == "FULL" && (
          <>
            <h1 className="font-medium md:font-light text-2xl md:text-4xl text-ivy-blue mb-3">
              Have any Questions?
            </h1>
            <p>Please complete the form below for a prompt reply.</p>
          </>
        )}


        {showProfile &&
          members.map(({ fname, name, imgSrc, admCollege, description }, i) => {
            if (name === coachName) {
              // console.log({coachName})
              return (
                <Profile
                  key={i}
                  fname={fname}
                  name={name}
                  imgSrc={imgSrc}
                  admCollege={admCollege}
                  description={description}
                />
              );
            }
            // return (
            //   console.log("not match")
            // );
          })}

        <div className="row mb-3">
          <label htmlFor="name" className="form-label">
            Name{" "}
            <span className="text-ivy-red font-thin text-sm">Required</span>
          </label>
          <div className="col">
            <input
              type="text"
              name="fname"
              value={values.fname}
              onChange={handleChange}
              className="form-control"
              placeholder="First name"
              aria-label="First name"
              required
            />
          </div>
          <div className="col">
            <input
              type="text"
              name="lname"
              value={values.lname}
              onChange={handleChange}
              className="form-control"
              placeholder="Last name"
              aria-label="Last name"
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address{" "}
            <span className="text-ivy-red font-thin text-sm">Required</span>
          </label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className="form-control"
            id="email"
            placeholder="name@example.com"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            className="form-control"
            id="phone"
            placeholder="123-456-7890"
            // required
          />
        </div>
        {type == "FULL" && (
          <>
            <div className="mb-3">
              <label htmlFor="contact" className="form-label">
                Preferred Contact Method
              </label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  name="contact"
                  onChange={handleChange}
                  type="checkbox"
                  value="Phone"
                  id="phone"
                />
                <label className="form-check-label" htmlFor="phone">
                  {" "}
                  Phone{" "}
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  name="contact"
                  onChange={handleChange}
                  type="checkbox"
                  value="Email"
                  id="email"
                />
                <label className="form-check-label" htmlFor="email">
                  {" "}
                  Email{" "}
                </label>
              </div>
            </div>
            
            
            
          </>
        )}

        {["FULL", "INFO", "EVAL"].includes(type) && (
          <div className="mb-3">
            <label htmlFor="service" className="form-label">
              {type == "EVAL" ? "Message" : "Message"}
            </label>
            <textarea
              className="form-control"
              name="service"
              id="service"
              onChange={handleChange}
              value={values.service}
              rows="3"
            ></textarea>
          </div>
        )}

        

        <div className="col-12">
          <button
            className="btn bg-ivy-red text-white hover:bg-red-700 hover:shadow-lg"
            type="submit"
          >
            {isSubmitting ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Submit"
            )}
          </button>
          
          {/* Error would show here */}
          <Alert
            message={responseMessage.message}
            success={responseMessage.success}
          />
        </div>

      </form>
    </div>
  );
}
