import { Request, Response, Express, NextFunction } from "express";
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
        this.app[route.requestMethod](prefix + route.path, (req: Request, res: Response, next: NextFunction) => {
          try {
            (instance as any)[route.methodName](req, res);
          } catch (error) {
            next(error);
          }
        });
      });
    });
  }
}

export default RegisterRoute;

export interface RouteDefinition {
  path: string;
  requestMethod: RequestMethod;
  methodName: string | symbol;
}

export type RequestMethod = "get" | "post" | "put" | "delete";
