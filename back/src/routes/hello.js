const express = require("express");

const router = express.Router();
const HelloController = require("../controllers/hello");

const responses = require("../responses/response");

router.get("/", (req, res) => {
  HelloController.getHello((code, rows) => {
    responses.send(res, code, rows);
  });
});

router.post("/", (req, res) => {
  HelloController.createHello(req.body.name, (code, rows) => {
    responses.send(res, code, rows);
  });
});

module.exports = router;
