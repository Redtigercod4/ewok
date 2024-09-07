import express, { Router } from "express";

const router: Router = express.Router();

router.route("/").get().post().patch().delete();

export default router;
