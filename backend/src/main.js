require("dotenv").config();

const express = require("express");
const cors = require("cors");

const {
  UserController,
  UserRepository,
  UserService,
  UserServiceValidator,
} = require("./modules/users");
const {
  DeadlineController,
  DeadlineRepository,
  DeadlineService,
  DeadlineServiceValidator,
} = require("./modules/deadlines");
const {
  ScheduleController,
  ScheduleRepository,
  ScheduleService,
  ScheduleServiceValidator,
} = require("./modules/schedules");
const { JwtService } = require("./modules/auth");

const { Server, knex } = require("./shared");
const { AuthMiddleware, ErrorMiddleware } = require("./middleware");
const gridConfig = require("./config/grid-config");

const userRepository = new UserRepository(knex);
const deadlineRepository = new DeadlineRepository(knex);
const scheduleRepository = new ScheduleRepository(knex);

const jwtService = new JwtService();
const userService = new UserService(
  userRepository,
  jwtService,
  new UserServiceValidator()
);
const deadlineService = new DeadlineService(
  deadlineRepository,
  userRepository,
  new DeadlineServiceValidator()
);
const scheduleService = new ScheduleService(
  scheduleRepository,
  deadlineRepository,
  userRepository,
  new ScheduleServiceValidator(),
  gridConfig
);

const userController = new UserController(userService);
const deadlineController = new DeadlineController(deadlineService);
const scheduleController = new ScheduleController(scheduleService);

const authMiddleware = new AuthMiddleware(jwtService);
const errorMiddleware = new ErrorMiddleware();

const server = new Server(express(), 4005, authMiddleware);

server.loadGlobalMiddlewares([
  cors({
    origin: "*",
  }),
  express.json(),
]);
server.loadControllers([
  userController,
  deadlineController,
  scheduleController,
]);
server.loadErrorHandler(errorMiddleware.execute);

scheduleService.exportsProfessorSchedules();

server.run();
