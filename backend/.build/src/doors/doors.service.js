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
  DoorsService: () => DoorsService
});
var import_common = __toModule(require("@nestjs/common"));
let DoorsService = class {
  constructor() {
    this.doors = [];
  }
  findAll() {
    return this.doors;
  }
  findOne(id) {
    const door = this.doors.find((door2) => door2.id === id);
    if (!door) {
      throw new import_common.NotFoundException("Door not found.");
    }
    return door;
  }
  create(door) {
    const doorExists = this.doors.some((item) => item.id === door.id);
    if (doorExists) {
      throw new import_common.UnprocessableEntityException("Door already exists");
    }
    const maxId = Math.max(...this.doors.map((door2) => door2.id), 0);
    const id = maxId + 1;
    const doorPost = __spreadProps(__spreadValues({}, door), {
      id
    });
    this.doors.push(doorPost);
    return doorPost;
  }
  delete(id) {
    const index = this.doors.findIndex((door) => door.id === id);
    if (index === -1) {
      throw new import_common.NotFoundException("Door not found");
    }
  }
  update(id, door) {
    const index = this.doors.findIndex((door2) => door2.id === id);
    if (index === -1) {
      throw new import_common.NotFoundException("Door not found");
    }
    const doorExists = this.doors.some((doorIterated) => doorIterated.id === door.id);
    if (doorExists) {
      throw new import_common.UnprocessableEntityException("Door already exists");
    }
    const doorPost = __spreadProps(__spreadValues({}, door), {
      id
    });
    this.doors[index] = doorPost;
    return doorPost;
  }
};
DoorsService = __decorateClass([
  (0, import_common.Injectable)()
], DoorsService);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DoorsService
});
//# sourceMappingURL=doors.service.js.map
