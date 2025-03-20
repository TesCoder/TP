import { sendEmail } from "./utils/sendEmail"


export default async function handler(req, res) {
  console.log("SENDING:", JSON.stringify(req.body),)

  const { studentName } = req.body
  const names = studentName.split(" ")

  const id = "#" + names[0][0].toUpperCase() + names[1][0].toUpperCase() + Math.floor(Math.random() * 1000000000).toString();
  req.body.id = id

  const response = await fetch(
    process.env.GOOGLE_CLOUD_FUNCTION_URL,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body),
    }
  )


  if (response.status == 250) {
    try {
      const blob = await response.blob()
      // const pdfBlob = new Blob([blob], { type: 'application/pdf' });
      const arrBuff = await blob.arrayBuffer()
      const buff = Buffer.from(arrBuff)

      const emailOptions = {
        subject: `Signed Agreement - ${req.body.studentName}`,
        html: `
        <h3> ${req.body.studentName} has signed the Application Support Agreement!</h3>
        <p>You can find the signed and watermarked pdf attached to this email.</p>
        <br/>
        <br/>
        <p>Ivy Ready</p>
        `,
        attachments: [
          {
            filename: `${id}.pdf`,
            contentType: `application/pdf;`,
            content: buff
          },
        ],
      };

      const result = await sendEmail(emailOptions);

      console.log('Result:', result);

      if (result.success) {
        return res.status(250).json(result)
      } else {
        return res.status(404).json(result)
      }
    } catch (err) {
      return res.status(404).json({ error: err.message })
    }

    // Used to return pdf for user to download
    // res.setHeader('Content-Type', 'application/pdf');
    // res.setHeader('Content-Disposition', 'attachment; filename=signed agreement.pdf');
    // return res.status(250).send(Buffer.from(buff));
  } else {
    console.log("ERR RES:", response)
    return res.status(404).json({ error: response.error.message })
  }
}

// Below used to work locally but not on netlify
// export default async function handler(req, res) {

//   const templatesDir = path.join(process.cwd(), 'templates');
//   var html = fs.readFileSync(templatesDir + '/toPdf.html', 'utf8');
//   var options = { format: 'A4', base: "http://" + req.headers.host, dpi: "300", };

//   let renderedHtml = ejs.render(html, { form: req.body })

//   return new Promise((resolve, reject) => {
//     pdf.create(renderedHtml, options).toBuffer(function (err, buff) {
//       if (err) {
//         res.status(404).json({ error: err, renderedHtml })
//       } else {
//         res.setHeader('Content-Type', 'application/pdf');
//         res.setHeader('Content-Disposition', 'attachment; filename=signed agreement.pdf');
//         res.status(250).send(Buffer.from(buff)); // { filename: '/app/businesscard.pdf' }
//       }
//       resolve();
//     });

//   })
// }