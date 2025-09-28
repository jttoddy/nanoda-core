import dotenv from "dotenv";
import path from "path";
import { start } from "@service/index";

const envPath = path.resolve(__dirname, "../../.env");
dotenv.config({ path: envPath });

start();
