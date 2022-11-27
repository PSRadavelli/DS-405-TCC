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
  AppModule: () => AppModule
});
var import_common = __toModule(require("@nestjs/common"));
var import_app = __toModule(require("./app.controller"));
var import_app2 = __toModule(require("./app.service"));
var import_typeorm = __toModule(require("@nestjs/typeorm"));
var import_path = __toModule(require("path"));
var import_doors = __toModule(require("./doors/doors.module"));
var import_users = __toModule(require("./users/users.module"));
var import_packages = __toModule(require("./packages/packages.module"));
let AppModule = class {
};
AppModule = __decorateClass([
  (0, import_common.Module)({
    imports: [
      import_typeorm.TypeOrmModule.forRoot({
        type: "mysql",
        host: "bupi2skdqak3hefpxtow-mysql.services.clever-cloud.com",
        port: 3306,
        username: "uhid1kcv2z4ajrvx",
        password: "Tw8D3gUuZu8fTZZflUfU",
        database: "bupi2skdqak3hefpxtow",
        entities: [(0, import_path.join)(__dirname, "**", "*.entity.{ts,js}")],
        synchronize: true
      }),
      import_doors.DoorModule,
      import_users.UsersModule,
      import_packages.PackagesModule
    ],
    controllers: [import_app.AppController],
    providers: [import_app2.AppService]
  })
], AppModule);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AppModule
});
//# sourceMappingURL=app.module.js.map
