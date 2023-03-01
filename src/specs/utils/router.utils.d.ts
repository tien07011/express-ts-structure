export interface RouteDefinition {
  path: string;
  requestMethod: Method;
  methodName: string | symbol;
}

export type Method = "get" | "post" | "put" | "delete";
