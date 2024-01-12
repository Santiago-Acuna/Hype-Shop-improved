import { BaseRouter } from "./router";
import { SystemController } from "../controllers/systemController";

export class SystemRouter extends BaseRouter<SystemController> {
  constructor() {
    super(SystemController);
  }

  routes(): void {
    this.router.get("/status", (req, res) => {
      this.controller.getStatus(req, res);
    });
  }
}
