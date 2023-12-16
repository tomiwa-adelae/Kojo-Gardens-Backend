import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Mailjet from "node-mailjet";

const mailjet = Mailjet.apiConnect(
	process.env.MAILJET_API_PUBLIC_KEY,
	process.env.MAILJET_API_PRIVATE_KEY
);

// initialize express app
const app = express();

// Cross origin requests
app.use(cors());

// Express body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Connect Mongo DB to the application
mongoose
	.connect(process.env.MONGO_URI)
	.then((conn) =>
		console.log(`Mongo DB connected with ${conn.connection.host}`)
	)
	.catch((err) => console.log(`An error occured${err}`));

app.post("/contact", async (req, res) => {
	try {
		const { name, email } = req.body;

		// Send email to the customer
		const request = mailjet.post("send", { version: "v3.1" }).request({
			Messages: [
				{
					From: {
						Email: "thetommedia@gmail.com",
						Name: "Kojo Gardens",
					},
					To: [
						{
							Email: `${email}`,
							Name: `${name}`,
						},
					],
					Subject: "Thank You for Reaching Out - Kojo Gardens",
					TextPart: `Thank You for Reaching Out - Kojo Gardens`,
					HTMLPart: `
                                <div 
                                    style="
                                        font-family: __Oldenburg_709b3f, __Oldenburg_Fallback_709b3f;
                                        font-size: 15px;
                                        color: #3e363f;
                                    "
                                >
                                <p style="color: #5cb074;">
                                    Dear ${name},</p>
                                <p>
                                    Thank you for getting in touch with us at Kojo Gardens. Your message has successfully reached our team, and we're thrilled to assist you.
                                </p>
                                <p>
                                    We appreciate you taking the time to fill out our contact form. Rest assured, your inquiry is important to us, and we're dedicated to providing you with a prompt and personalized response.
                                </p>
                                <p>
                                    Our team is already reviewing your message and will be in touch shortly to address your queries or requests. Should you have any additional information to add or need immediate assistance, feel free to contact us directly at 07038803037.
                                </p>
                                <p>
                                    Once again, thank you for considering Kojo Gardens. We're committed to ensuring your experience with us is exceptional from the first interaction to the moment you depart.
                                </p>
                                <p>Warm regards,</p>
                                <p>Henry Kojo</p>
                                <p>CEO & Founder of Kojo Gardens</p>
                                <p>Kojo Gardens</p>
                                <p>07038803037, 08027836001</p>
                            </div>
                            `,
				},
			],
		});

		request
			.then(() => {
				res.status(201).json({ msg: "Email sent successfully!" });
			})
			.catch((err) => {
				return err;
			});
	} catch (err) {
		res.status(409).json({ msg: "An error occured!" });
	}
});

app.post("/reservations", async (req, res) => {
	try {
		const { name, email, arrival, departure, guest, message } = req.body;
		const request = mailjet.post("send", { version: "v3.1" }).request({
			Messages: [
				{
					From: {
						Email: "thetommedia@gmail.com",
						Name: "Kojo Gardens",
					},
					To: [
						{
							Email: `${email}`,
							Name: `${name}`,
						},
					],
					Subject: "Your Reservation Confirmation - Kojo Gardens",
					TextPart: `Your Reservation Confirmation - Kojo Gardens`,
					HTMLPart: `<div 
                                    style="
                                        font-family: __Oldenburg_709b3f, __Oldenburg_Fallback_709b3f;
                                        font-size: 15px;
                                        color: #3e363f;
                                    "
                                >
                                    <p style="color: #5cb074;">Dear ${name},</p>
                                    <p>
                                        Congratulations! Your reservation request has been successfully received and confirmed at Kojo Gardens. We are delighted to have you as our esteemed guest during your upcoming stay.
                                    </p>
                                    <p>
                                        Details of your reservation:
                                    </p>
                                    <ul>
                                        <li>
                                            Arrival Date: ${arrival}
                                        </li>
                                        <li>
                                            Departure Date: ${departure}
                                        </li>
                                        <li>
                                            Number of Guests: ${guest}
                                        </li>
                                        <li>
                                            Special Requests: ${message}
                                        </li>
                                    </ul>
                                    <p>
                                        Rest assured, our team is dedicated to ensuring a memorable and comfortable experience throughout your stay. Should you have any additional queries or require further assistance, please feel free to reach out to us at 07038803037.
                                    </p>
                                    <p>
                                        We eagerly anticipate your arrival and strive to make your time with us truly exceptional.
                                    </p>
                                    <p>
                                        Thank you for choosing Kojo Gardens. We look forward to welcoming you!
                                    </p>
                                    <p>
                                        Warm regards,
                                    </p>
                                    <p>Henry Kojo</p>
                                    <p>CEO & Founder of Kojo Gardens</p>
                                    <p>Kojo Gardens</p>
                                    <p>07038803037, 08027836001</p>
                                </div>
                        `,
				},
			],
		});

		request
			.then(() => {
				res.status(201).json({ msg: "Email sent successfully!" });
			})
			.catch((err) => {
				return err;
			});
	} catch (err) {
		res.status(409).json({ msg: "An error occured!" });
	}
});

// Run the application
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started running on port ${PORT}`));
