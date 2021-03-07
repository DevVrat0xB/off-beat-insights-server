import { Router } from "express";

// controller imports.
import {
  getArticles,
  getThisArticle,
  createNewArticle,
} from "../controllers/articles.controller";

const router = Router(); // instantiating a router.

// HANDLING DIFFERENT REQUESTS.
// fetches all the articles.
router.get("/", getArticles); // (https://xxxxxxx.xxx/articles/all)

// fetches an article having a particular ID.
router.get("/:id", getThisArticle); // (https://xxxxxxx.xxx/articles/*)

// creates a new article record.
router.post("/", createNewArticle); // (https://xxxxxxx.xxx/articles/new)

// updates an article having a particular ID.

// removes an article having a particular ID.

export default router;
