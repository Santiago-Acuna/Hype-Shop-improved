import express from "express";
import morgan from "morgan";
import { config } from "dotenv";
import cors from "cors";
import { SystemRouter } from "./routes/systemRouter";
config();

class Server {
  public app: express.Application = express();
  private readonly port: number = parseInt(
    process.env.PORTSERVER ?? "3000",
    10
  );

  constructor() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
      res.header("Access-Control-Allow-Credentials", "true");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, DELETE"
      );
      next();
    });
    this.app.use("/", this.routers());
  }

  routers(): express.Router[] {
    return [new SystemRouter().router];
  }

  public listen(): void {
    // this.app.listen(this.port, () => {
    //   console.log(`server listening on port => ${this.port}`);
    // });
    // this.app
    //   .listen(this.port, () => {
    //     console.log(`Server listening on port => ${this.port}`);
    //   })
    //   .on("error", (error: unknown) => {
    //     if (error instanceof Error) {
    //       console.error("Error starting the server:", error.message);
    //     } else {
    //       console.error("Error starting the server:", error);
    //     }
    //   });
    const server = this.app.listen(this.port);

    server.on("listening", () => {
      console.log(`Server listening on port => ${this.port}`);
    });

    server.on("error", (error: NodeJS.ErrnoException) => {
      if (error.code === "EADDRINUSE") {
        console.error(
          `Port ${this.port} is already in use. Choose a different port.`
        );
      } else {
        console.error("Error starting the server:", error);
      }
      process.exit(1); // Exit the process on error
    });
  }
}

// Creating an instance of Server
export const serverInstance = new Server();

// Starting the server
serverInstance.listen();
