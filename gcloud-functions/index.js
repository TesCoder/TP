const functions = require('@google-cloud/functions-framework');
const escapeHtml = require('escape-html');
const fs = require('fs');
const ejs = require('ejs');
const path = require('path')
const pdf = require('html-pdf')
/**
 * Responds to an HTTP request using data from the request body parsed according
 * to the "content-type" header.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
functions.http('generatePdf', async (req, res) => {
  console.log("RECEIVED FORM:", req.body)
  const templatesDir = path.join(process.cwd(), 'templates');
  var html = fs.readFileSync(templatesDir + '/toPdf.html', 'utf8');
  var options = {
    format: 'A4',
    // base: "http://" + req.headers.host,
    base: "https://tsionconsulting.netlify.app",
    dpi: "300",
    childProcessOptions: {
      env: {
        OPENSSL_CONF: '/dev/null',
      },
    }
  };

  let renderedHtml = ejs.render(html, { form: req.body })

  return new Promise((resolve, reject) => {
    pdf.create(renderedHtml, options).toBuffer(function (err, buff) {
      if (err) {
        res.status(404).json({ error: err, msg: err.message, renderedHtml })
      } else {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=signed agreement.pdf');
        res.status(250).send(Buffer.from(buff));
      }
      resolve();
    });

  })

  // const response = await fetch(
  //   `https://selectpdf.com/api2/convert/`,
  //   {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       key: '6a8128bf-eb03-474f-8a6a-7b420109b566',
  //       // url: 'https://google.com'
  //       html: renderedHtml,
  //       "base_url": "https://tsionconsulting.netlify.app"
  //     })
  //   }
  // )

  // if (response.status == 200) {
  //   const blob = await response.blob()
  //   // const pdfBlob = new Blob([blob], { type: 'application/pdf' });
  //   const arrBuff = await blob.arrayBuffer()
  //   const buff = Buffer.from(arrBuff)

  //   res.setHeader('Content-Type', 'application/pdf');
  //   res.setHeader('Content-Disposition', 'attachment; filename=signed agreement.pdf');
  //   return res.status(250).send(Buffer.from(buff));
  // }
  // res.send(`Hello ${escapeHtml(req.query.name || req.body.name || 'World')}!`);
});