const express = require('express');
const bodyParser = require('body-parser');
const postmark = require('postmark');

const app = express();
const port = process.env.PORT || 3000;

const POSTMARK_SERVER_TOKEN = '20a47068-27dd-446d-9283-82965d96b8d2';
const FROM_EMAIL = 'holla@askesosa.com';


const client = new postmark.ServerClient(POSTMARK_SERVER_TOKEN);

app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
 const { templateName, toEmail, templateData } = req.body;

 try {
  const response = await client.sendEmailWithTemplate({
   From: FROM_EMAIL,
   To: toEmail,
   TemplateAlias: templateName,
   TemplateModel: templateData
  });

  res.status(200).json(response);
 }
  catch (error) {
  console.error('Error sending email:', error);
  res.status(500).json({ error: 'Failed to send email' });
 }
});

app.listen(port, () => {
 console.log(`Email service running on port ${port}`);
});