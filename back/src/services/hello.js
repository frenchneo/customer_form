const HelloDao = require("../dao/hello");
class HelloService {
  async sayHello() {
    const hello = await HelloDao.sayHello();
    return hello;
  }

  async createHello(name) {
    const hello = await HelloDao.createHello(name);
    return hello;
  }
}

module.exports = new HelloService();
