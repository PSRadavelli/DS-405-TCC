var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
  User: () => User
});
var import_typeorm = __toModule(require("typeorm"));
let User = class {
};
__decorateClass([
  (0, import_typeorm.PrimaryGeneratedColumn)({ type: "int" })
], User.prototype, "tag", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "varchar", length: 50, nullable: false })
], User.prototype, "name", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "varchar", length: 50, nullable: false })
], User.prototype, "lastName", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "int", nullable: false })
], User.prototype, "age", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "varchar", length: 11 })
], User.prototype, "telephone", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "varchar", length: 50 })
], User.prototype, "email", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "boolean", default: false, nullable: false })
], User.prototype, "admin", 2);
__decorateClass([
  (0, import_typeorm.Column)({ nullable: false })
], User.prototype, "appNotification", 2);
__decorateClass([
  (0, import_typeorm.Column)({ nullable: false })
], User.prototype, "emailNotification", 2);
__decorateClass([
  (0, import_typeorm.Column)({ nullable: false })
], User.prototype, "intercomNotification", 2);
User = __decorateClass([
  (0, import_typeorm.Entity)()
], User);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  User
});
//# sourceMappingURL=users.entity.js.map
