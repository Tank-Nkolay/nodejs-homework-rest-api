const { Contact } = require("../models/postModel");

// GET ALL ============================================
const controllerGetAll = async (req, res) => {
  // const contacts = await Contact.find({});
  const { _id: owner } = req.user;
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find(
    { owner },
    {},
    {
      skip,
      limit,
    }
  ).populate("owner", "_id email");
  res.status(200).json({ contacts, status: "succsess" });
};

// GET by ID =======================================
const controllerGetById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    return res.status(404).json({ message: `Contact with id=${id} not found` });
  }
  res.status(200).json({ contact, status: "succsess" });
};

// POST ============================================
const controllerPost = async (req, res) => {
  const { _id } = req.user;
  const newContact = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json({ newContact, status: "succsess" });
};

// PUT ============================================
const controllerPut = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const updatedContact = await Contact.findByIdAndUpdate(id, body, {
    new: true,
  });
  res.json({ updatedContact, status: "succsess" });
};

// DELETE ========================================
const controllerDelete = async (req, res) => {
  const { id } = req.params;
  const deletedContact = await Contact.findByIdAndRemove(id);
  if (!deletedContact) {
    return res.status(404).json({ message: `Contact with id=${id} not found` });
  }
  res.status(200).json({
    message: `Contact with id=${id} was deleted`,
  });
};

// updateFavoriteStatus ===========================
const controllerUpdateStatusContact = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const updatedContact = await Contact.findByIdAndUpdate(id, body, {
    new: true,
  });
  if (!updatedContact) {
    return res.status(400).json({
      status: `Contact with id=${id} not found`,
    });
  }
  res.json({ message: "Contact was update", status: "succsess" });
};

module.exports = {
  controllerGetAll,
  controllerGetById,
  controllerPost,
  controllerPut,
  controllerDelete,
  controllerUpdateStatusContact,
};

// ================
