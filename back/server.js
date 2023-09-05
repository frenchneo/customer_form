const application = require("./app");
const port = 3000;

application.listen(port, function () {
  console.log("listening on port " + port);
});
