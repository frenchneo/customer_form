const InternautesDao = require("../dao/internautes");
class InternautesService {
  async getInternautes() {
    const internautes = await InternautesDao.getInternautes();
    return internautes;
  }

  async createInternautes(data) {
    const internautes = await InternautesDao.createInternautes(data);
    return internautes;
  }
}

module.exports = new InternautesService();
