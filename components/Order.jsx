import { Backdrop, Box, Button, Fade, Grid, Modal, styled, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { reset } from "../redux/cartSlice";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AddBox, Cancel, Close } from "@mui/icons-material";
import { yellow } from "@mui/material/colors";

const Order = ({ open, handleClose }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { sm: 400, xs: 300 },
    bgcolor: "background.paper",
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
  };

  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const total = cart.total;

  const createOrder = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/orders", data);
      if (res.status === 201) {
        dispatch(reset());
        router.push(`/orders/${res.data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = () => {
    createOrder({ customer, address, total, method: 0, mobile });
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };
  const makePayment = async () => {
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }
    const data = await axios.post("api/razorpay", {
      amount: cart.total + "00",
    });
    const { amount, id, currency } = data.data;

    const options = {
      key: process.env.RAZORPAY_KEY || "rzp_test_3H8BUoWiGQP6lq", // Enter the Key ID generated from the Dashboard
      name: "Pizza Paradise",
      currency: currency,
      amount: amount.toString(),
      order_id: id,
      description: `Payment for your order is ₹${cart.total}`,
      image: "/img/pizza.png",
      handler: async (response) => {
        // Validate payment at server - using webhooks is a better idea.\
        const { data } = await axios.post("api/verify", response);
        if (data.message == "Payment verified successfully") {
          createOrder({
            customer: customer,
            address: address,
            mobile: mobile,
            total: total,
            method: 1,
          });
        } else {
          console.log(data.message);
        }
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} component="form">
            <Cancel onClick={handleClose} sx={{ cursor: "pointer", position: "absolute", top: "1px", right: "1px" }} />
            <Typography id="transition-modal-title" variant="h5" fontSize="30px" fontWeight="600" color="black" mb={2}>
              You will pay ₹{cart.total}
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Name"
                  onChange={(e) => setCustomer(e.target.value)}
                  placeholder="Enter your name"
                  autoFocus
                  type="text"
                  fullWidth
                  required
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="mobile"
                  label="Mobile Number"
                  placeholder="Enter mobile number"
                  onChange={(e) => setMobile(e.target.value)}
                  type="text"
                  fullWidth
                  required
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-static"
                  name="address"
                  label="Address"
                  placeholder="Enter your address"
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  fullWidth
                  multiline
                  rows={3}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid container spacing={2} direction="column" marginTop={1} alignItems="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={handleClick}
                    sx={{ background: "gold", color: "black" }}
                  >
                    Cash on Delivery
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="success" onClick={makePayment}>
                    Online Payment
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Order;
