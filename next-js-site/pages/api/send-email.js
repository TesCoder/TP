import vCardsJS from "vcards-js";
import { sendEmail } from "./utils/sendEmail";
import { updateSheet } from "./utils/updateSheet";
import { getPersonalInfo } from "@/lib/e";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

// IR-2021Oct30 Jane Doe
const today = new Date();
const prefix =
  "IR-" + today.getFullYear() + months[today.getMonth()] + today.getDate();

const getVCard = ({
  coach,
  type,
  fname,
  lname,
  location,
  email,
  phone,
  year,
  contact,
  option,
  info,
  heard,
  service,
}) => {
  const vCard = vCardsJS();

  vCard.firstName = prefix + " " + fname;
  vCard.lastName = lname;
  vCard.email = email;
  vCard.cellPhone = phone;
  vCard.note = `
    Conversion Date: ${today.toLocaleDateString("en-US", {
      timeZone: "America/Los_Angeles",
    })}
    Conversion Time: ${today.toLocaleTimeString("en-US", {
      timeZone: "America/Los_Angeles",
    })}
    Conversion Type: Form
    Conversion Source: ${heard}
    Student Year: ${year}
    Status: Form submission

    Name: ${fname} ${lname}
    City, State: ${location}
    Email: ${email}
    Phone: ${phone}
    Preferred Contact Method: ${contact}
    Which option interests you?: ${option}
    How did you hear about Ivy Ready?: ${heard}
    What would you like to know more about?: ${info}
    Service Requested: ${service}
    ${coach ? `Coach Request ${coach}` : ""}
    Type: ${type}
  `;

  return vCard;
};

// api endpoint
export default async function handler(req, res) {
  // res.status(200).json({ msg: "REACHED", data: req.body })
  const {
    coach,
    type,
    fname,
    lname,
    location,
    email,
    phone,
    year,
    contact,
    option,
    info,
    heard,
    service,
  } = req.body;

  const vCard = getVCard(req.body);

  // use e API to get address info
  const infoResponse = await getPersonalInfo({ fname, lname, phone, email });
  if (infoResponse) {
    try {
      const { street, city, state, zip } = infoResponse.address;
      // update vCard with address info
      vCard.homeAddress.street = street;
      vCard.homeAddress.city = city;
      vCard.homeAddress.stateProvince = state;
      vCard.homeAddress.postalCode = zip;
    } catch (e) {
      console.log(e)
    }
  }

  const id = `${prefix} ${fname} ${lname}`;
  const success = await updateSheet({
    id,
    address: infoResponse?.address,
    age: infoResponse?.age,
    ...req.body,
  });

  const filename = `${id}.vcf`;
  const emailOptions = {
    subject: `Contact Form Submission`,
    html: `
      <ul>
        <li><strong>Label:</strong> ${id}</li>
        <li><strong>Conversion Date:</strong> ${today.toLocaleDateString(
          "en-US",
          { timeZone: "America/Los_Angeles" }
        )}</li>
        <li><strong>Conversion Time:</strong> ${today.toLocaleTimeString(
          "en-US",
          { timeZone: "America/Los_Angeles" }
        )}</li>
        <li><strong>Conversion Type:</strong> Form</li>
        <li><strong>Conversion Source:</strong> ${heard}</li>
        <li><strong>Student Year:</strong> ${year}</li>
        <li><strong>Status:</strong> Form Submission</li>
        <br>
        <li><strong>Name:</strong> ${fname} ${lname}</li>
        <li><strong>Address (fromE):</strong> ${
          infoResponse.address
            ? `${infoResponse.address.street}, ${infoResponse.address.city}, ${infoResponse.address.state} ${infoResponse.address.zip}`
            : "N/A"
        }</li>
        <li><strong>City, State:</strong> ${location}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Preferred Contact Method:</strong> ${contact}</li>
        <li><strong>Which option interests you?:</strong> ${option}</li>
        <li><strong>How did you hear about Ivy Ready?:</strong> ${heard}</li>
        <li><strong>What would you like to know more about?:</strong> ${info}</li>
        <li><strong>Service Requested:</strong> ${service}</li>
        ${coach ? `<li><strong>Coach Request:</strong> ${coach}</li>` : ""}
        <li><strong>Added to Google Sheet:</strong> ${success}</li>
        <li><strong>Type:</strong> ${type}</li>
      </ul>
      `,
    attachments: [
      {
        filename: filename,
        contentType: `text/vcard`,
        content: vCard.getFormattedString(),
      },
    ],
  };

  const result = await sendEmail(emailOptions);
  // console.log('Result:', result);
  if (result.success) {
    return res.status(250).json(result);
  } else {
    return res.status(404).json(result);
  }
}
