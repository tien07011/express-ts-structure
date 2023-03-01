import { Request, Response } from "express";
import BaseController, { Controller, RouterMapping } from "./base.controller";

@Controller("/")
class HomeController extends BaseController {
  @RouterMapping("get", "/")
  public index(req: Request, res: Response) {
    res.json({ hello: "world" });
  }
}

export default HomeController;
