const service = require("../models/service-model");

const getAllservice = async (req, res) => {
  console.log("getAllservice called , ");

  try {
    const response = await service.find();

    if (!response) {
      res.status(404).json({ msg: "No service found " });
      return;
    }
    res.status(200).json({ response });

    console.log(response);
  } catch (error) {
    console.log("error from services contrillers : ", error);
  }
};

module.exports = getAllservice;
