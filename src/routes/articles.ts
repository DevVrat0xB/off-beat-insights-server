import { Router } from "express";

// controller imports.
import {
  getArticles,
  getThisArticle,
  updateThisArticle,
  createNewArticle,
  removeThisArticle,
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
router.patch("/:id", updateThisArticle); // (https://xxxxxxx.xxx/articles/*)

// removes an article having a particular ID.
router.delete("/:id", removeThisArticle); // (https://xxxxxxx.xxx/articles/*)

export default router;
