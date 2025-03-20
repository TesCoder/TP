import { GoogleSpreadsheet } from "google-spreadsheet";

const { SPREADSHEET_ID, GOOGLE_CLIENT_EMAIL, GOOGLE_SERVICE_PRIVATE_KEY } =
  process.env;

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const colNames = [
  "Date",
  "Time",
  "ConvType",
  "Stage",
  "StageDesc",
  "Email",
  "Phone",
  "FirstName",
  "LastName",
  "Prospect",
  "StudentYear",
  "ProvidedLocation",
  "ContactMethod",
  "Options",
  "InfoRequested",
  "ConvSource",
  "EstimatedDateOfBirth",
  "Address",
  "Street",
  "City",
  "State",
  "Zip",
];

export const updateSheet = async ({
  id,
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
  address,
  age,
}) => {
  console.log("REACHED UPDATE SHEET!");
  try {
    await doc.useServiceAccountAuth({
      client_email: GOOGLE_CLIENT_EMAIL,
      private_key: GOOGLE_SERVICE_PRIVATE_KEY,
    });

    await doc.loadInfo();

    let sheet = doc.sheetsByIndex[0];
    const today = new Date();
    // const month = monthNames[today.getMonth()];
    const desiredTitle = `${today.getFullYear()}`;
    // If first sheet is from previous/other month create new sheet with this year's name
    if (sheet.title != desiredTitle) {
      sheet = await doc.addSheet({
        title: desiredTitle,
        headerValues: colNames,
      });
      await sheet.updateProperties({ index: 0 });
    }

    let dob;
    if (age) {
      // use string aage to estimate date of birth
      age = parseInt(age, 10);
      const currentDate = new Date();
      currentDate.setFullYear(currentDate.getFullYear() - age);
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      const day = currentDate.getDate().toString().padStart(2, "0");
      const year = currentDate.getFullYear();
      dob = `${month}/${day}/${year}`;
    }

    await sheet.addRow({
      Prospect: id,
      FirstName: fname,
      LastName: lname,
      ProvidedLocation: location,
      Email: email,
      Phone: phone,
      StudentYear: year,
      ContactMethod: contact.join(", "),
      Options: option.join(", "),
      InfoRequested: info.join(", "),
      ConvSource: heard.join(", "),
      Date: today.toLocaleDateString("en-US", {
        timeZone: "America/Los_Angeles",
      }),
      Time: today.toLocaleTimeString("en-US", {
        timeZone: "America/Los_Angeles",
      }),
      ConvType: "Form",
      StageDesc: "Form Submission",
      Stage: 0,
      EstimatedDateOfBirth: dob,
      Address:
        address &&
        `${address.street}, ${address.city}, ${address.state} ${address.zip}`,
      Street: address?.street,
      City: address?.city,
      State: address?.state,
      Zip: address?.zip,
    });
    return true;
  } catch (e) {
    console.error("Error updating google sheet:", e);
  }
  return false;
};
