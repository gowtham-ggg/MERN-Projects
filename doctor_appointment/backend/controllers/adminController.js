import validator from "validator"
import bcrypt from 'bcryptjs';
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from "../models/doctorModel.js"
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointmentModel.js"
import userModel from "../models/userModel.js"



//api for adding doctor
const addDoctor = async (req, res) => {
    try {
      const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
      const imageFile = req.file;
  
      // Check for missing details
      if (!name || !email || !password || !speciality || !degree || !about || !experience || !address) {
        return res.json({ success: false, message: "Missing Details" });
      }
  
  
      // Validate email
      if (!validator.isEmail(email)) {
        return res.json({ success: false, message: "Please enter a valid email" });
      }
  
      // Validate password strength
      if (password.length < 8) {
        return res.json({ success: false, message: "Please enter a strong password" });
      }
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Upload image to Cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
      const imageUrl = imageUpload.secure_url;
  
      // Prepare doctor data
      const doctorData = {
        name,
        email,
        image: imageUrl,
        password: hashedPassword,
        speciality,
        degree,
        experience,
        about,
        fees,
        address: JSON.parse(address),
        date: Date.now(),
      };
  
      const newDoctor = new doctorModel(doctorData);
      await newDoctor.save();
  
      res.json({ success: true, message: "Doctor Added" });
    } catch (error) {
      console.log("error", error);
      res.json({ success: false, message: error.message });
    }
  };
  
//API for admin Login

const loginAdmin = async (req, res)=>{
    try {
        
        const {email, password} = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD ){

            const token = jwt.sign(email+password, process.env.JWT_SECRET )
            res.json({success : true, token})

        }
        else{
            res.json({success: false, message : "Invalid Credntials"})
        }

    } catch (error) {
        console.log("error", error)
        res.json({success: false, message : error.message})
    }
}

//Api to get All doctors list for admin panel
const allDoctors = async (req, res) =>{
  try {
    const doctors = await doctorModel.find({}).select('-password')
    res.json({success : true, doctors})
  } catch (error) {
    console.log(error)
    res.json({success: false, message : error.message})
  }
}

//Api to get all appointments list

const appointmentAdmin = async (req, res) =>{
  try {
    
    const appointments = await appointmentModel.find({})
    res.json({success : true, appointments})

  } catch (error) {
    console.log(error)
    res.json({success: false, message : error.message})
  }
}

//Api to cancell appointment from admin

const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    // Fetch appointment data
    const appointmentData = await appointmentModel.findById(appointmentId);

   

    // Mark the appointment as cancelled
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // Release the doctor's slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);

    if (!doctorData) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    let slots_booked = doctorData.slots_booked;

    // Remove the cancelled slot from the booked slots
    if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter(
        (e) => e !== slotTime
      );
    }

    // Save the updated slots_booked in the doctor's data
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// APi to get data for admin pannel

const adminDashboard = async (req, res) =>{

  try {

    const doctors = await doctorModel.find({})
    const users = await userModel.find({})
    const appointments = await appointmentModel.find({})


    const dashData = {
      doctors : doctors.length,
      appointments: appointments.length,
      patients : users.length,
      latestAppointment : appointments.reverse().slice(0,5)
    }

    res.json({success : true, dashData })


  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

export {addDoctor, loginAdmin,allDoctors,appointmentAdmin,appointmentCancel,adminDashboard}