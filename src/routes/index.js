const express = require("express");
const router = express.Router();

const { getUsers, getUsersId, editUser } = require("../controllers/user");
const { login, register } = require("../controllers/auth");
const {
  getdocuments,
  addDocument,
  getdocumentbyToken,
  verifieddocuments,
  getdocumentbyId,
} = require("../controllers/document");
const { addCollection, getCollections } = require("../controllers/collection");

const { auth, admin } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFile");

router.get("/users", getUsers);
router.get("/user", auth, getUsersId);
router.patch("/user", auth, uploadFile("picture"), editUser);

router.post("/login", login);
router.post("/register", register);

router.get("/documents", getdocuments);
router.get("/document", auth, getdocumentbyToken);
router.post("/document", auth, uploadFile("doc"), addDocument);
router.patch("/document/:id", auth, admin, verifieddocuments);
router.get("/document/:id", auth, getdocumentbyId);

router.post("/collection", auth, addCollection);
router.get("/collection", auth, getCollections);

module.exports = router;
