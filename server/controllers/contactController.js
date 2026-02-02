const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
exports.submitContact = async (req, res) => {
  try {
    const { first_name, last_name, email, subject, message } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !email || !subject || !message) {
      return res.status(400).json({ 
        message: 'Please fill in all required fields' 
      });
    }

    // Save contact to database
    const contact = await Contact.create({
      first_name,
      last_name,
      email,
      subject,
      message
    });

    // Send email notification
    try {
      const transporter = createTransporter();
      
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.CONTACT_EMAIL || 'smptpchecking@gmail.com',
        subject: `New message from ${first_name} ${last_name}`,
        text: `
Email: ${email}

Subject: ${subject}

Message: ${message}
        `,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>From:</strong> ${first_name} ${last_name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue even if email fails - contact is saved in DB
    }

    res.status(201).json({ 
      message: 'Thank you for contacting us. We will get back to you soon!',
      contact 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all contacts
// @route   GET /api/admin/contacts
// @access  Private (Admin)
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
