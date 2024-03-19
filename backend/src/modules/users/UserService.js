const {
  EntityNotFoundError,
  ImpossibleActionError,
  UnauthorizedActionError,
} = require("../../errors");
const bcrypt = require("bcrypt");

class UserService {
  constructor(userRepository, jwtService, validator) {
    this.userRepository = userRepository;
    this.validator = validator;
    this.jwtService = jwtService;
  }

  async createUser(data) {
    const { name, email, role, auth } = this.validator.validateCreateUser(data);

    if (auth.role !== "ADMIN") {
      throw new UnauthorizedActionError("Only admins can create users");
    }

    const emailOrNameExists = await this.userRepository.emailOrNameExists({
      name,
      email,
    });
    if (emailOrNameExists) {
      throw new ImpossibleActionError("Email or name already in use");
    }

    const userId = await this.userRepository.createOne({
      name,
      email,
      role,
      passwordHash: await this.hashPassword(name),
    });

    return this.userRepository.findOneById(userId);
  }

  async updateUser(data) {
    const { auth, id, role, name, email } =
      this.validator.validateUpdateUser(data);

    const isUpdatingNameOrRole = name !== undefined || role !== undefined;
    const isAdmin = auth.role === "ADMIN";
    const isUpdatingSelf = auth.id === id;
    if ((isUpdatingNameOrRole && !isAdmin) || (!isAdmin && !isUpdatingSelf)) {
      throw new UnauthorizedActionError(
        "Does not has the permissions required"
      );
    }
    const emailOrNameExists = await this.userRepository.emailOrNameExists({
      name,
      email,
      exceptById: id,
    });

    if (emailOrNameExists) {
      throw new ImpossibleActionError("Email or name already in use");
    }

    const user = await this.userRepository.findOneById(id);
    if (user === null) throw new EntityNotFoundError("User");

    await this.userRepository.updateOneById(id, {
      role,
      name,
      email,
    });
  }

  async deleteUser(data) {
    const { auth, id } = this.validator.validateDeleteUser(data);

    if (auth.role !== "ADMIN") {
      throw new UnauthorizedActionError("Only admins can create users");
    }

    const user = await this.userRepository.findOneById(id);
    if (user === null) throw new EntityNotFoundError("User");

    if (user.id === auth.id)
      throw new UnauthorizedActionError("Admins can not delete themself");

    await this.userRepository.deleteOneById(id);
  }

  async getOneUser(data) {
    const { id } = this.validator.validateGetOneUser(data);

    const user = await this.userRepository.findOneById(id);
    if (user === null) throw new EntityNotFoundError("User");

    return user;
  }

  async getManyUsers(data) {
    const { page, limit, role } = this.validator.validateGetManyUsers(data);

    return this.userRepository.findMany({
      offset: page * limit,
      limit,
      role,
    });
  }

  async loginUser(data) {
    const { login, password } = this.validator.validateLoginUser(data);

    const user = await this.userRepository.findFirstByNameOrEmail(login);
    if (!user) throw new EntityNotFoundError("User");

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      throw new UnauthorizedActionError("Password does not match");
    }

    delete user.passwordHash;
    const jwt = await this.jwtService.createJwt({
      id: user.id,
      role: user.role,
    });
    return { jwt, ...user };
  }

  async searchUser(data) {
    const { term } = data;

    const users = await this.userRepository.searchProfessors({
      term,
      limit: 10,
    });

    return users;
  }

  async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }
}

module.exports = { UserService };
