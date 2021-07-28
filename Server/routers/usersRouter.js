const express = require("express");
const userBL = require("../models/userBL");

const router = express.Router();

router.route("/").get(function (req, resp) {
  userBL.getAllUsers().then((data) => {
    return resp.json(data);
  });
});

router.route("/:id").get(function (req, resp) {
  let id = req.params.id;

  userBL.getUser(id).then((data) => {
    return resp.json(data);
  });
});

router.route("/").post(function (req, resp) {
  let obj = req.body;

  userBL.addUser(obj).then((status) => {
    return resp.json(status);
  });
});

router.route("/:id").put(function (req, resp) {
  let obj = req.body;
  let id = req.params.id;

  userBL.updateUser(id, obj).then((status) => {
    return resp.json(status);
  });
});

router.route("/:id").delete(function (req, resp) {
  let id = req.params.id;

  userBL.deleteUser(id).then((status) => {
    return resp.json(status);
  });
});

module.exports = router;
