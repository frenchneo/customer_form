const responses = require("../responses/response");
const helloService = require("../services/hello");

class HelloController {
  async getHello(callback) {
    try {
      const hello = await helloService.sayHello();
      return responses.success(callback, responses.CODE.SUCCESS, hello);
    } catch (error) {
      return responses.error(callback, responses.CODE.INTERNAL_ERROR);
    }
  }

  async createHello(name, callback) {
    try {
      const hello = await helloService.createHello(name);
      return responses.success(callback, responses.CODE.SUCCESS, hello);
    } catch (error) {
      return responses.error(callback, responses.CODE.INTERNAL_ERROR);
    }
  }
}

module.exports = new HelloController();
