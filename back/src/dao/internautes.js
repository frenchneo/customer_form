const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class InternautesDao {
  async getInternautes() {
    const internautes = await prisma.internautes
      .findMany()
      .then((res) => {
        prisma.$disconnect();
        return res;
      })
      .catch((err) => {
        throw err;
      });
    return internautes;
  }

  async createInternautes(data) {
    const create = await prisma.internautes
      .create({
        data,
      })
      .then((res) => {
        prisma.$disconnect();
        return res;
      })
      .catch((err) => {
        throw err;
      });
    return create;
  }

  async deleteById(id) {
    const deleted = await prisma.internautes
      .delete({
        where: {
          id: +id,
        },
      })
      .then((res) => {
        prisma.$disconnect();
        return res;
      })
      .catch((err) => {
        throw err;
      });
    return deleted;
  }
}
module.exports = new InternautesDao();
