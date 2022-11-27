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
  PackagesService: () => PackagesService
});
var import_common = __toModule(require("@nestjs/common"));
let PackagesService = class {
  constructor() {
    this.packages = [];
  }
  findAll() {
    return this.packages;
  }
  findOne(id) {
    const pack = this.packages.find((pack2) => pack2.id === id);
    if (!pack) {
      throw new import_common.NotFoundException("Package not found.");
    }
    return pack;
  }
  create(pack) {
    const packgExists = this.packages.some((packgIterated) => packgIterated.id === pack.id);
    if (packgExists) {
      throw new import_common.UnprocessableEntityException("Package already exists");
    }
    const maxId = Math.max(...this.packages.map((packg) => packg.id));
    const id = maxId + 1;
    const packgPost = __spreadProps(__spreadValues({}, pack), {
      id
    });
    this.packages.push(packgPost);
    return packgPost;
  }
  delete(id) {
    const index = this.packages.findIndex((packg) => packg.id === id);
    if (index === -1) {
      throw new import_common.NotFoundException("Package not found");
    }
    this.packages.splice(index, 1);
  }
  update(id, packg) {
    const index = this.packages.findIndex((packg2) => packg2.id === id);
    if (index === -1) {
      throw new import_common.NotFoundException("Package not found");
    }
    const packageExists = this.packages.some((packgIterated) => packgIterated.id === packg.id && packgIterated.userId === packg.userId && packgIterated.receivementDate === packg.receivementDate && packgIterated.retrievalDate === packg.retrievalDate);
    if (packageExists) {
      throw new import_common.UnprocessableEntityException("this package already exists");
    }
    const packgPost = __spreadValues({}, packg);
    this.packages[index] = packgPost;
    return packgPost;
  }
};
PackagesService = __decorateClass([
  (0, import_common.Injectable)()
], PackagesService);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PackagesService
});
//# sourceMappingURL=packages.service.js.map
