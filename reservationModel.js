import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		arrivalDate: {
			type: String,
			required: true,
		},
		departureDate: {
			type: String,
			required: true,
		},
		guest: {
			type: String,
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
