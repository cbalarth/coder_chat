import {Router} from "express";

const viewsRouter = Router();

viewsRouter.get("/", (req, res) => {
    res.render("home", { style: "index"}); //Para renderizar contenido.
});

export default viewsRouter;