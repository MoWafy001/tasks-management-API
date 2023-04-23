import { Router } from "express";
import ICRUDController from "../controllers/interfaces/crud.controller";

export const setCRUDRoutes = (
  router: Router,
  controller: ICRUDController,
  prefix: string = "/"
) => {
  router.post(prefix, controller.create);
  router.get(prefix, controller.getAll);
  router.get(prefix + ":id", controller.getOne);
  router.patch(prefix + ":id", controller.update);
  router.delete(prefix + ":id", controller.delete);
};
