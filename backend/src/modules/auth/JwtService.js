const jsonwebtoken = require("jsonwebtoken");
const {
  UnauthorizedActionError,
} = require("../../errors/UnauthorizedActionError");

class JwtService {
  constructor() {
    this.secret = process.env.SECRET_KEY;
    this.expirationTime = 60 * 60 * 24 * 7; // 7 dias,
  }

  async createJwt(payload) {
    return jsonwebtoken.sign(payload, process.env.SECRET_KEY, {
      expiresIn: this.expirationTime,
    });
  }

  async verifyJwt(token) {
    try {
      return jsonwebtoken.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      throw new UnauthorizedActionError(error.message);
    }
  }
}

module.exports = { JwtService };
