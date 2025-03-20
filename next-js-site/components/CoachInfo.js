import Image from "next/image";
import { Button, ButtonRow } from "@/components/Button";

// oriiginal const
//   const CoachInfo = ({ setCoach, imgSrc, name, past, description }) => (

export default function CoachInfo({ setCoach, imgSrc, name, past, description }) {
    return (
        <div className="flex flex-col md:flex-row text-lg">

          <div className="w-full md:w-1/5 flex flex-col items-center">
            <Image
              className="rounded-full shadow-md mb-2 w-4/5"
              src={imgSrc}
              width={128}
              height={128}
              alt=" profile picture"
            />
          </div>
          <div className="w-full md:w-4/5">
            <h2 className="font-bold text-2xl text-ivy-blue mb-2">{name}</h2>
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
                  setCoach(name);
                }}
                data-bs-toggle="modal"
                data-bs-target="#coachModal"
              >
                Request an introductory Session with {name}
              </Button>
            </div>
          </div>
        </div>
      );
    }