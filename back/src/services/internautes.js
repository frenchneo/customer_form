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

  async deleteById(id) {
    const internautes = await InternautesDao.deleteById(id);
    return internautes;
  }
}

module.exports = new InternautesService();
