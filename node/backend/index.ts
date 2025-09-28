import dotenv from "dotenv";
import path from "path";
import * as Service from "@service/index";

const envPath = path.resolve(__dirname, "../../.env");
dotenv.config({ path: envPath });

Service.start();
