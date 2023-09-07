const responses = require("../responses/response");
const InternautesService = require("../services/internautes");
const f = require("../schemas/internautes");
class InternautesController {
  async getInternautes(callback) {
    try {
      const internautes = await InternautesService.getInternautes();
      return responses.success(callback, responses.CODE.SUCCESS, internautes);
    } catch (error) {
      return responses.error(callback, responses.CODE.INTERNAL_ERROR);
    }
  }

  async createInternautes(data, callback) {
    try {
      const isValid = await f.isValidInternautes(data);
      if (!isValid) {
        return responses.error(callback, responses.CODE.BAD_REQUEST);
      }
      const internautes = await InternautesService.createInternautes(data);
      return responses.success(callback, responses.CODE.SUCCESS, internautes);
    } catch (error) {
      return responses.error(callback, responses.CODE.INTERNAL_ERROR);
    }
  }
}

module.exports = new InternautesController();
