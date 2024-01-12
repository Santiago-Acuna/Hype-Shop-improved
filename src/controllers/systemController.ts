import { type Request, type Response } from "express";
import { config } from "dotenv";
config();

export class SystemController {
  private readonly port: number = parseInt(
    process.env.PORTSERVER ?? "3000",
    10
  );

  getStatus(req: Request, res: Response): void {
    res.status(200).json({ status: "working" });
  }
}
