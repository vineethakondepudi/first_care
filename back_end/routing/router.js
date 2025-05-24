const express = require('express');
const multer = require('multer');
const router = express.Router();
const Registration = require('../model/Registration');
const DropdownOptions = require('../model/DropdownOptionsSchema');
const DoctorPatientSchema = require('../model/DoctorPatientSchema');
const PatientRecord = require('../model/PatientRecordSchema');






// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });
// added role
// POST /api/register
router.post('/register', upload.single('image'), async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      dob,
      gender,
      phone,
      email,
      address,
      aadharNumber,
      spouseName,
      EmergencyContactNumber,
      height,
      weight,
      BloodGroup,
      role,
      educationQualification,
      yearOfPassing,
      university,
      specialization,
      medicalCouncilNumber,
      yearsOfExperience,
      placesWorked
    } = req.body;

    const image = req.file ? req.file.path : null;

    const registrationData = {
      firstName,
      lastName,
      dob,
      gender,
      phone,
      email,
      address,
      aadharNumber,
      spouseName,
      EmergencyContactNumber,
      height,
      weight,
      BloodGroup,
      image,
      role,
    };

    if (role === 'doctor') {
      registrationData.educationQualification = educationQualification;
      registrationData.yearOfPassing = yearOfPassing;
      registrationData.university = university;
      registrationData.specialization = specialization;
      registrationData.medicalCouncilNumber = medicalCouncilNumber;
      registrationData.yearsOfExperience = yearsOfExperience;
      registrationData.placesWorked = placesWorked;
    }

    // else {
    //   registrationData.height = height;
    //   registrationData.weight = weight;
    //   registrationData.BloodGroup = BloodGroup;
    // }

    const newEntry = new Registration(registrationData);
    await newEntry.save();

    res.status(201).json({ message: 'Registration successful', data: newEntry });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});





router.get('/register', async (req, res) => {
  try {
    const allEntries = await Registration.find();
    res.status(200).json(allEntries);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


// PATCH: Edit User API
router.patch('/register/edit', async (req, res) => {
  const {
    aadharNumber,
    role,
    phone,
    address,
    email,
    spouseName,
    EmergencyContactNumber,
    educationQualification,
    yearOfPassing,
    university,
    specialization,
    medicalCouncilNumber,
    yearsOfExperience,
    placesWorked
  } = req.body;

  try {
    if (!aadharNumber || !role) {
      return res.status(400).json({ message: 'Aadhar number and role are required.' });
    }

    let updateFields = {};

    if (role === 'patient') {
      updateFields = {
        phone,
        address,
        email,
        spouseName,
        EmergencyContactNumber
      };
    } else if (role === 'doctor') {
      updateFields = {
        educationQualification,
        yearOfPassing,
        university,
        specialization,
        medicalCouncilNumber,
        yearsOfExperience,
        placesWorked
      };
    } else {
      return res.status(400).json({ message: 'Invalid role specified.' });
    }

    const updatedUser = await Registration.findOneAndUpdate(
      { aadharNumber },
      { $set: updateFields },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found. Please check the Aadhar number.' });
    }

    res.status(200).json({ message: 'User details updated successfully', data: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


router.delete('/register/delete/:firstName', async (req, res) => {
  const { firstName } = req.params;

  try {
    const deletedUser = await Registration.findOneAndDelete({ firstName });

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found with the given first name.' });
    }

    res.status(200).json({ message: 'User deleted successfully', data: deletedUser });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST: Login API
router.post('/login', async (req, res) => {
  const { phone, aadharNumber } = req.body; // Only phone is required now

  try {
    // Find user with matching phone number
    const user = await Registration.findOne({ phone: phone, aadharNumber: aadharNumber });

    if (!user) {
      return res.status(404).json({ message: 'User not found. Please register first.' });
    }

    // If user exists, return success
    res.status(200).json({
      message: 'Login successful', 
      user: user 
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});



// POST: Add new dropdown options
// POST: Add new dropdown options by pushing into arrays
router.post('/dropdown-options', async (req, res) => {
  try {
    const { specialization, location, language, feeRange, availability } = req.body;

    let options = await DropdownOptions.findOne().sort({ createdAt: -1 });

    if (!options) {
      // If no document exists, create a new one with arrays
      options = new DropdownOptions({
        specialization: [specialization],
        location: [location],
        language: [language],
        feeRange: [feeRange],
        availability: [availability],
      });
    } else {
      // Push new values if they are not already included
      if (!options.specialization.includes(specialization)) options.specialization.push(specialization);
      if (!options.location.includes(location)) options.location.push(location);
      if (!options.language.includes(language)) options.language.push(language);
      if (!options.feeRange.includes(feeRange)) options.feeRange.push(feeRange);
      if (!options.availability.includes(availability)) options.availability.push(availability);
    }

    await options.save();
    res.status(200).json({ message: 'Dropdown options updated successfully', data: options });
  } catch (err) {
    res.status(500).json({ message: 'Error updating dropdown options', error: err.message });
  }
});


// GET: Fetch dropdown options (latest one)
router.get('/dropdown-options', async (req, res) => {
  try {
    const options = await DropdownOptions.findOne().sort({ createdAt: -1 });
    if (!options) {
      return res.status(404).json({ message: 'No dropdown options found' });
    }
    res.status(200).json(options);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching dropdown options', error: err.message });
  }
});

// POST: Create a new doctor entry
router.post('/patientNewAppointment', async (req, res) => {
  const { doctorName, fee, availability, time, requestAppointment } = req.body;

  const newDoctor = new DoctorPatientSchema({
    doctorName,
    fee,
    availability,
    time,
    requestAppointment,
  });

  try {
    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// GET: Fetch all doctor entries
router.get('/patientNewAppointment', async (req, res) => {
  try {
    const doctors = await DoctorPatientSchema.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Added
router.put('/doctor/:id/favorite', async (req, res) => {
  const { isFavorite } = req.body;
  try {
    const updatedDoctor = await DoctorPatientSchema.findByIdAndUpdate(
      req.params.id,
      { isFavorite },
      { new: true }
    );
    res.json(updatedDoctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST API – Add a new patient record
router.post('/patient-records', async (req, res) => {
  try {
    const { date, amount, patientName, approval, records } = req.body;

    const newRecord = new PatientRecord({
      date,
      amount,
      patientName,
      approval,
      records
    });

    await newRecord.save();
    res.status(201).json({ message: 'Patient record saved successfully', data: newRecord });
  } catch (err) {
    res.status(500).json({ message: 'Error saving patient record', error: err.message });
  }
});

// GET API – Fetch all patient records
router.get('/patient-records', async (req, res) => {
  try {
    const records = await PatientRecord.find().sort({ createdAt: -1 });
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching patient records', error: err.message });
  }
});


module.exports = router;

