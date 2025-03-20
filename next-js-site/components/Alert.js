export default function Alert({ success, message }) {
  if (!message) return;
  return (
    <div
      className="bg-ivy-red py-4 px-4 rounded-lg shadow-md text-white font-raleway"
      role="alert"
    >
      <h2 className="text-3xl font-semibold text-white">
        {/* <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Info:"><use xlink:href="#info-fill" /></svg> */}
        {/* {success ? "Form Submitted!" : "Form Error"} */}
        {/* tmporarily removed Form Error as it's doing so incorrectly & dont' want user to see.
        Return after fixing"*/}
        {success ? "Form Submitted!" : "Form Error"}
      </h2>
      <hr className="my-2" />
      <p className="text-lg text-white">{message}</p>
      <br />
      <p className="text-white">- Ivy Ready</p>
    </div>
  );
}
