const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');
const fs = require('fs').promises;
const path = require('path');

// Submit contact form
const submitContact = async (req, res) => {
  try {
    const { first_name, last_name, email, subject, message } = req.body;
    
    // Validation
    if (!first_name || !last_name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Save to database or file
    if (Contact.db && Contact.db.readyState === 1) {
      // Save to MongoDB
      const contact = await Contact.create({
        first_name,
        last_name,
        email,
        subject,
        message
      });
    } else {
      // Save to JSON file
      const dataPath = path.join(__dirname, '../data/contacts.json');
      let contacts = [];
      
      try {
        const data = await fs.readFile(dataPath, 'utf8');
        contacts = JSON.parse(data);
      } catch (err) {
        // File doesn't exist, start with empty array
      }
      
      contacts.push({
        first_name,
        last_name,
        email,
        subject,
        message,
        createdAt: new Date().toISOString()
      });
      
      await fs.writeFile(dataPath, JSON.stringify(contacts, null, 2));
    }
    
    // Send email notification
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        });
        
        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: process.env.EMAIL_TO || 'ieee@jsu.edu',
          subject: `New Contact Form Submission from ${first_name} ${last_name}`,
          text: `Email: ${email}\n\nSubject: ${subject}\n\nMessage:\n${message}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${first_name} ${last_name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `
        });
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        // Continue even if email fails
      }
    }
    
    res.status(201).json({ 
      message: 'Thank you for contacting us. We will get back to you soon!',
      success: true
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ message: 'Error submitting contact form', error: error.message });
  }
};

module.exports = {
  submitContact
};
