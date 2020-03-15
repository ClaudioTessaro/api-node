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

const routes = new Router();
const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);

// As rotas que vierem após esse middleware precisarão ser autenticada
routes.use(authMiddleware);
routes.put("/users", UserController.update);

routes.post("/file", upload.single("file"), (req, res) => {
    return res.json(req.file);
});
routes.post("/files", upload.single("file"), FileController.store);
routes.get("/providers", ProviderController.index);
routes.post("/appointments", AppointmentController.store);
routes.get("/appointments", AppointmentController.index);
routes.get("/schedules", ScheduleController.index);
export default routes;
