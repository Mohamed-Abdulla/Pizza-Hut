// import dbConnect from "../../../util/mongo";
const crypto = require("crypto");

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.body;
      const sign = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSign = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(sign.toString())
        .digest("hex");

      if (razorpay_signature === expectedSign) {
        return res.status(200).json({ message: "Payment verified successfully" });
      } else {
        return res.status(400).json({ message: "Invalid signature sent!" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error!" });
      console.log(error);
    }
  }
}
