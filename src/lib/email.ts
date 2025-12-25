import nodemailer from "nodemailer";

export async function sendEmailInvoice(
  to: string,
  service: string,
  duration: string,
  location: string,
  totalCost: string
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: `Your Booking Confirmation for ${service}`,
    html: `
      <div>
        <h1>Booking Confirmation</h1>
        <p>Thank you for booking our ${service} service.</p>
        <p>Duration: ${duration}</p>
        <p>Location: ${location}</p>
        <p>Total Cost: ${totalCost}</p>
        <p>We will contact you soon to confirm your booking.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}