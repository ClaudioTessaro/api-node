import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";
import FileController from "./app/controllers/FileController";
import ProviderController from "./app/controllers/ProviderController";
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import AppointmentController from "./app/controllers/AppointmentController";
import authMiddleware from "./app/middlewares/auth";
import ScheduleController from "./app/controllers/ScheduleController";
import NotificationController from "./app/controllers/NotificationController";
import AvailableController from "./app/controllers/AvailableController";

const routes = new Router();
const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);

// As rotas que vierem após esse middleware precisarão ser autenticada
routes.use(authMiddleware);
routes.put("/users", UserController.update);

routes.post("/files", upload.single("file"), FileController.store);
routes.get("/providers", ProviderController.index);
routes.get("/providers/:providerId/available", AvailableController.index);
routes.post("/appointments", AppointmentController.store);
routes.get("/appointments", AppointmentController.index);
routes.delete("/appointments/:id", AppointmentController.delete);
routes.get("/schedules", ScheduleController.index);
routes.get("/notifications", NotificationController.index);
routes.put("/notifications/:id", NotificationController.update);

export default routes;
