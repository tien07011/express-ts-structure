import { RequestMethod, RouteDefinition } from "../routes/register.route";

abstract class BaseController {}

export default BaseController;

export const Controller = (prefix: string): ClassDecorator => {
  return target => {
    Reflect.defineMetadata("prefix", prefix, target);
    if (!Reflect.hasMetadata("routes", target)) {
      Reflect.defineMetadata("routes", [], target);
    }
  };
};

export const RouterMapping = (requestMethod: RequestMethod, path: string): MethodDecorator => {
  return (target, propertyKey) => {
    if (!Reflect.hasMetadata("routes", target.constructor)) Reflect.defineMetadata("routes", [], target.constructor);
    const routes: RouteDefinition[] = Reflect.getMetadata("routes", target.constructor);
    routes.push({ requestMethod: requestMethod, path: path, methodName: propertyKey });
    Reflect.defineMetadata("routes", routes, target.constructor);
  };
};
