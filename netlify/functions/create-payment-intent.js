require("dotenv").config();
const stripe = require("stripe")(process.STRIPE_SECRET_KEY)

exports.handler = async (event) => {
	try {
		const { amount } = JSON.parce(event.body);

		const paymentIntent = await stripe.paymentIntent.create({
			amount,
			currency: "usd",
			payment_method_types: ["card"]
		});

		return {
			statusCode: 200,
			body: JSON.stringify({ paymentIntent })
		}
	} catch (error) {
		console.log({ error });

		return {
			status: 400,
			body: JSON.stringify({ error })
		}
	}
}