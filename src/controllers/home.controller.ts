import { Request, Response } from "express";
import BaseController, { Controller, Get } from "./base.controller";

@Controller("/")
class HomeController extends BaseController {
  @Get("/")
  public index(req: Request, res: Response) {
    console.log(req);
    res.json({ hello: "world" });
  }
}

export default HomeController;
