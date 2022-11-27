var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
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
var import_testing = __toModule(require("@nestjs/testing"));
var request = __toModule(require("supertest"));
var import_app = __toModule(require("./../src/app.module"));
describe("AppController (e2e)", () => {
  let app;
  beforeEach(async () => {
    const moduleFixture = await import_testing.Test.createTestingModule({
      imports: [import_app.AppModule]
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it("/ (GET)", () => {
    return request(app.getHttpServer()).get("/").expect(200).expect("Hello World!");
  });
});
//# sourceMappingURL=app.e2e-spec.js.map
