import React, { useContext } from 'react';
import { assets, plans } from "../assets/assets";
import { AppContext } from "../Context/AppContext";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios";

const BuyCredit = () => {
  const { user, loadCreditsData, backendUrl, token, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  // Initialize Razorpay payment
  const initPay = async (order) => {
    const options = {
      key: import.meta.env.REACT_APP_KEY_ID, // Razorpay key
      amount: order.amount,
      currency: order.currency,
      name: 'Credits Payment',
      description: 'Credits Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/payment-verification", 
            { paymentDetails: response },
            { headers: { token } }
          );
          if (data.success) {
            toast.success("Payment Successful!");
            loadCreditsData(); // Update user's credits
          } else {
            toast.error("Payment verification failed!");
          }
        } catch (error) {
          toast.error(error.message);
        }
      },
      prefill: {
        name: user ? user.name : '',
        email: user ? user.email : '',
        contact: user ? user.phone : ''
      },
      theme: {
        color: "#61dafb"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Trigger Razorpay payment process
  const paymentRazorpay = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true);  // Show login modal if the user is not logged in
        return;
      }

      const { data } = await axios.post(backendUrl + "/api/user/pay-razor", { planId }, { headers: { token } });

      if (data.success) {
        initPay(data.order);  // Initialize Razorpay with the received order data
      } else {
        toast.error("Failed to create payment order!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='min-h-[80vh] text-center pt-14 mb-10'
    >
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>Our Plans</button>
      <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>Choose The Plans</h1>

      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((item, index) => (
          <div className='bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500' key={index}>
            <img src={assets.logo_icon} alt="img" width={40} />
            <p className='mt-3 mb-1 font-semibold'>{item.id}</p>
            <p className='text-sm'>{item.desc}</p>
            <p className='mt-6 '>
              <span className='text-3xl font-medium'>₹{item.price} </span>/ {item.credits} Credits
            </p>

            <button 
              onClick={() => paymentRazorpay(item.id)} 
              className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52'>
              {user ? 'Purchase' : 'Get Started'}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BuyCredit;
