const contact = require("../models/contact-model");
const { contactSchemaValidation } = require("../validators/contact-validator");

const contactForm = async (req, res, next) => {
  try {
    const validatedData = contactSchemaValidation.parse(req.body);

    await contact.create(validatedData);

    return res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    next(error);
  }
};

module.exports = contactForm;
