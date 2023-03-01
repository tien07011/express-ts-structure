import { RouteDefinition } from "../routes/register.route";

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

export const Get = (path: string): MethodDecorator => {
  return (target, propertyKey) => {
    if (!Reflect.hasMetadata("routes", target.constructor)) Reflect.defineMetadata("routes", [], target.constructor);
    const routes: RouteDefinition[] = Reflect.getMetadata("routes", target.constructor);
    routes.push({ requestMethod: "get", path: path, methodName: propertyKey });
    Reflect.defineMetadata("routes", routes, target.constructor);
  };
};

export const Post = (path: string): MethodDecorator => {
  return (target, propertyKey) => {
    if (!Reflect.hasMetadata("routes", target.constructor)) Reflect.defineMetadata("routes", [], target.constructor);
    const routes: RouteDefinition[] = Reflect.getMetadata("routes", target.constructor);
    routes.push({ requestMethod: "post", path: path, methodName: propertyKey });
    Reflect.defineMetadata("routes", routes, target.constructor);
  };
};

export const Put = (path: string): MethodDecorator => {
  return (target, propertyKey) => {
    if (!Reflect.hasMetadata("routes", target.constructor)) Reflect.defineMetadata("routes", [], target.constructor);
    const routes: RouteDefinition[] = Reflect.getMetadata("routes", target.constructor);
    routes.push({ requestMethod: "put", path: path, methodName: propertyKey });
    Reflect.defineMetadata("routes", routes, target.constructor);
  };
};

export const Delete = (path: string): MethodDecorator => {
  return (target, propertyKey) => {
    if (!Reflect.hasMetadata("routes", target.constructor)) Reflect.defineMetadata("routes", [], target.constructor);
    const routes: RouteDefinition[] = Reflect.getMetadata("routes", target.constructor);
    routes.push({ requestMethod: "delete", path: path, methodName: propertyKey });
    Reflect.defineMetadata("routes", routes, target.constructor);
  };
};
