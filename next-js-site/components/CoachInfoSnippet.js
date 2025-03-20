import Image from "next/image";
import { Button, ButtonRow } from "@/components/Button";

// oriiginal const
//   const CoachInfo = ({ setCoach, imgSrc, name, past, description }) => (

export default function CoachInfoSnippet({ setCoach, imgSrc, name, admCollege }) {
    return (
      
        <div className="w-full flex flex-row items-center">
        <Image
              className="rounded-full shadow-md m-6"
              src={imgSrc}
              width={128}
              height={128}
              alt=" profile picture"
            />
        <div className="flex flex-col">
            <h2 className="text-center font-bold text-2xl text-ivy-blue mb-2">{name}</h2>
            <p className="text-ivy-blue text-center font-semibold">{admCollege}</p>
        </div>
          {/* <div className="flex items-start">
            <Button
              onClick={() => {
                setCoach(name);
              }}
              data-bs-toggle="modal"
              data-bs-target="#coachModal"
            >
              Request an introductory Session with {name}
            </Button>
        </div> */}
        
        <div className="w-full md:w-4/5">
          
          </div>
        </div>
      );
    }

    