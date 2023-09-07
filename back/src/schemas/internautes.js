const sizeOf = require("image-size");

module.exports = {
  async getImageDimensionsFromBase64(base64String) {
    try {
      base64String = base64String.replace(/^data:image\/\w+;base64,/, "");
      base64String = base64String.trim();
      const buffer = Buffer.from(base64String, "base64");
      const dimensions = sizeOf(buffer);
      return dimensions;
    } catch (err) {
      console.error("Error getting image dimensions:", err);
      return null;
    }
  },

  async isValidInternautes(data) {
    const requiredFields = {
      nom: true,
      prenom: true,
      dob: true,
      email: true,
    };
    const allowedFields = {
      ...requiredFields,
      photo: true,
      tel: true,
      adress: true,
    };

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const dobRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    const telRegex = /^\d{10}$/;
    const photoRegex = /^data:image\/[a-zA-Z]*;base64,/;

    for (const field in data) {
      if (!(field in allowedFields)) {
        delete data[field];
      } else {
        const value = data[field];
        switch (field) {
          case "email":
            if (!value) {
              break;
            }
            if (!emailRegex.test(value)) {
              return false;
            }
            break;
          case "dob":
            if (!value) {
              break;
            }
            if (!dobRegex.test(value)) {
              return false;
            }
            break;
          case "tel":
            if (!value) {
              break;
            }
            if (!telRegex.test(value)) {
              return false;
            }
            break;
          case "photo":
            if (!value) {
              break;
            }
            if (!photoRegex.test(value)) {
              return false;
            }
            const dimensions = await this.getImageDimensionsFromBase64(value);
            if (!dimensions) {
              return false;
            }
            if (dimensions.width !== 200 || dimensions.height !== 200) {
              return false;
            }
            break;
          default:
            break;
        }
      }
    }

    for (const field in requiredFields) {
      if (!(field in data)) {
        return false;
      }
    }

    return true;
  },
};
