const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class HelloService {
  async sayHello() {
    const hello = await prisma.hello
      .findMany()
      .then((res) => {
        prisma.$disconnect();
        return res;
      })
      .catch((err) => {
        throw err;
      });
    return hello;
  }

  async createHello(name) {
    const create = await prisma.hello
      .create({
        data: {
          name,
        },
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
}

module.exports = new HelloService();
