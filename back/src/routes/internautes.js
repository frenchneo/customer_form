const express = require("express");

const router = express.Router();
const InternautesController = require("../controllers/internautes");

const responses = require("../responses/response");

router.get("/", (req, res) => {
  InternautesController.getInternautes((code, rows) => {
    responses.send(res, code, rows);
  });
});

router.post("/", (req, res) => {
  InternautesController.createInternautes(req.body, (code, rows) => {
    responses.send(res, code, rows);
  });
});

module.exports = router;
