var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
__export(exports, {
  UsersService: () => UsersService
});
var import_common = __toModule(require("@nestjs/common"));
let UsersService = class {
  constructor() {
    this.users = [];
  }
  findAll() {
    return this.users;
  }
  findOne(id) {
    const user = this.users.find((user2) => user2.userId === id);
    if (!user) {
      throw new import_common.NotFoundException("User not found.");
    }
    return user;
  }
  create(user) {
    const nameExists = this.users.some((userIterated) => userIterated.name === user.name);
    if (nameExists) {
      throw new import_common.UnprocessableEntityException("this user name already exists.");
    }
    const maxId = Math.max(...this.users.map((user2) => user2.userId));
    const id = maxId + 1;
    const userPost = __spreadProps(__spreadValues({}, user), {
      userId: id
    });
    this.users.push(userPost);
    return userPost;
  }
  delete(id) {
    const index = this.users.findIndex((user) => user.userId === id);
    if (index === -1) {
      throw new import_common.NotFoundException("User not found.");
    }
    this.users.splice(index, 1);
  }
  update(id, user) {
    const index = this.users.findIndex((user2) => user2.userId === id);
    if (index === -1) {
      throw new import_common.NotFoundException("User not found.");
    }
    const userExists = this.users.some((userIterated) => userIterated.name === user.name && userIterated.surname === user.surname);
    if (userExists) {
      throw new import_common.UnprocessableEntityException("this user already exists");
    }
    const userPost = __spreadValues({}, user);
    this.users[index] = userPost;
    return userPost;
  }
};
UsersService = __decorateClass([
  (0, import_common.Injectable)()
], UsersService);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UsersService
});
//# sourceMappingURL=users.service.js.map
