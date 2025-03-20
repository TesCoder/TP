import { Button } from "@/components/Button";
import ContactForm from "@/components/ContactForm";
import Section from "@/components/Section";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Goal = ({ title, content }) => (
  <div className="text-center">
    <h2 className="text-2xl text-ivy-blue">{title}</h2>
    <p className="text-lg text-center my-3 text-gray-700">{content}</p>
  </div>
);

export default function Evaluation() {
  return (
    <>
      <Head>
        <title>
          Application Evalutation - Ivy Ready College Admission Consulting
        </title>
        <meta
          name="description"
          content="Ivy Ready offers expert application evaluation services to provide students with personalized feedback and recommendations to enhance their application and increase their chances of success."
        />
      </Head>
      <Section>
      <Image
          className="mx-auto mb-4"
          src="/images/ivy-eval.png"
          width={200}
          height={200}
          alt="Scale"
        />
        <h1 className="font-medium md:font-light text-2xl md:text-4xl text-ivy-blue mt-10">
          Submit your best application with the feedback of former admission
          officers!
          <Link className="font-bold" href="/evaluation/#sign-up" > (Sign Up) </Link>
        </h1>
      </Section>

      <Section
        centerContent
        darkBg
        title="A one-of-a-kind evaluation for a once-in-a-lifetime opportunity"
      >
        <Image
          src="/images/sample-evaluation.png"
          width={1080}
          height={500}
          alt="Record"
        />
        <p className=" text-xl text-center my-3 text-gray-700">
          Ivy Ready Evaluation makes it easy to identify key areas of
          improvement. While supplemental essays are unique to each school, a
          large percentage of the application is sent to many schools. Thus,
          insights gained from a single evaluation can help students find ways
          to improve their likelihood of admission to multiple schools.
        </p>
      </Section>

      <Section>
        <h1 className="text-3xl font-medium border-l-4 pl-5 mb-2">
          Ivy Ready Evaluation should be every applicant’s companion.
        </h1>
        <h2 className="text-right">
          — Michelle Levine (Director of College Counseling at Hawthorne
          Academy)
        </h2>
        <div className="flex justify-center mt-5">
          <Button
            onClick={() =>
              window.open("/#application-support-questions-section", "_self")
            }
          >
            Get Started
          </Button>
        </div>
      </Section>

      <Section centerContent darkBg>
        <h2 className="font-semibold text-2xl text-center">Overview</h2>
        <p className="text-xl text-center my-2 text-gray-700">
          Ivy Ready Evaluation is a unique opportunity for prospective
          applicants to enhance their college applications with the feedback of
          former admissions officers. While Ivy Ready does offer comprehensive
          Application Support Packages, this evaluation is available for
          students who prefer to work on their application independently but
          receive feedback before official submission.
        </p>

        <h2 className="font-semibold text-2xl text-center">How it Works</h2>
        <p className="text-xl text-center my-2 text-gray-700">
          An evaluation report is included. It gives you an unbiased assessment
          for each key area utilizing a rating scale (more on this is below.) In
          addition, a phone discussion session is included to review the
          assessment and answer any questions you may have.
        </p>

        <h2 className="font-semibold text-2xl text-center">
          Evaluation Package Components:
        </h2>
        <p className="text-xl text-center my-2 text-gray-700">
          Ivy Ready Evaluation is a unique opportunity for prospective
          applicants to enhance their college applications with the feedback of
          former admissions officers. While Ivy Ready does offer comprehensive
          Application Support Packages, this evaluation is available for
          students who prefer to work on their application independently but
          receive feedback before official submission.
        </p>
      </Section>

      <Section centerContent title="Understanding the Evaluation">
        <p className="text-xl text-center my-2 text-gray-700">
          In addition to highlighting the primary strength, setback, and
          potential area of improvement of the applicant, the evaluation
          determines the competitiveness of high key areas using a rating scale.
        </p>
        <Image
          src="/images/rating-scale.png"
          width={600}
          height={500}
          alt="Scale"
        />
        <p className="text-xl text-center my-2 text-gray-700">
          Understanding the scale: if a key area meets the{" "}
          <strong>highest</strong> Ivy Ready Standards, a rating of Ivy Ready is
          assigned next to that key area on the evaluation report. Otherwise,
          the report will state Outstanding (above average), Competitive
          (average), or Developing (below average) as appropriate.
        </p>
      </Section>
      <Section darkBg>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <Goal
            title="Get Actionable Insights"
            content="If the Leadership presentation in an application is not Ivy Ready, we can show you how to incorporate compelling leadership examples."
          />
          <Goal
            title="Impress your Dream School"
            content="Your application represents your achievements and potential. Showcase your accomplishments in a manner that stands out to to schools!"
          />
          <Goal
            title="Stay Ahead of the Competition"
            content="We can show you how to accentuate your strengths & address key areas of improvement before official submission."
          />
          <Goal
            title="Submit your Best Application"
            content="Ivy Ready Evaluation helps you discover what is likely to harm your likelihood of admission at highly selective schools."
          />
          <Goal
            title="Your Best Investment Yet"
            content="A well put together application is pivotal to gaining admission to a highly selective school. We can show you how to make your application Ivy Ready."
          />
          <Goal
            title="Enhance Every Submission"
            content="Insights gained from your evaluation will help you transform every application you submit."
          />
          <Goal
            title="Save Time and Money"
            content="Applying to many schools is time consuming and costly. Avoid common mistakes and give yourself the best chance for admission!"
          />
          <Goal
            title="Seize your Future"
            content="Without a compelling application, you may miss out on the school meant for you. Why take chances when you can get professional feedback beforehand?"
          />
          <span id='sign-up'></span>   
        </div>
      </Section>

       
       
      <Section id="">
        {/* <Image
          className="mx-auto mb-4"
          src="/images/ivy-eval.png"
          width={200}
          height={200}
          alt="Scale"
        /> */}
        <h1 className="font-medium md:font-light text-2xl md:text-4xl text-ivy-blue mb-3">
          Choose from Single-School Evaluation or Multiple-School Package
        </h1>

        <p className="mb-2 text-lg text-gray-700">
          <strong>Single-School Evaluation</strong> includes a holistic review
          of the core application and supplemental essays to one school. The
          evaluation report will highlight key areas of improvement and a
          30-minute phone discussion is included.
        </p>
        <p className="mb-2 text-lg text-gray-700">
          <strong>Multiple-School Evaluation</strong> includes a holistic review
          of the core application and supplemental essays up to five schools.
          (Discounted rate is offered for this option.)
        </p>
        <ContactForm type="EVAL" />
      </Section>
      <div> 
       <a href="#" className="" onClick={()=>gaEventTracker('call')}>-</a>
      </div>
    </>
  );
}
