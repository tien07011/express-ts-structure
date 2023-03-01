import { Request, Response, Express } from "express";
import { RouteDefinition } from "../specs/utils/router.utils";
import HomeController from "../controllers/home.controller";

class RegisterRoute {
  protected app: Express;
  protected controllers: any[];

  constructor(app: Express) {
    this.app = app;
    this.registerControllers();
    this.registerRoutes();
  }

  private registerControllers() {
    this.controllers = [HomeController];
  }

  private registerRoutes() {
    this.controllers.forEach(controller => {
      const instance = new controller();
      const prefix = Reflect.getMetadata("prefix", controller);
      const routes: RouteDefinition[] = Reflect.getMetadata("routes", controller);
      routes.forEach(route => {
        this.app[route.requestMethod](prefix + route.path, (req: Request, res: Response) => {
          (instance as any)[route.methodName](req, res);
        });
      });
    });
  }
}

export default RegisterRoute;
