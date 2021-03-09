import { Request, Response } from "express";
import MongoDB from "mongodb";

import logger from "../utils/logger";
import { db } from "./../express";
import { Article } from "../models/article.model";

// functions required for the operations.
import { makeNewEntry } from "../utils/db_operations/create_op";
import { deleteAnEntry } from "../utils/db_operations/delete_op";

const collection_name: string = "articles";

// for fetching all the articles from the database.
function getArticles(request: Request, response: Response) {
  db.collection(collection_name)
    .find()
    .toArray()
    .then((records: Array<Article>) => {
      response.status(200).send(records);
      logger.info(
        "[articles.controller.ts, getArticles()] FIND query successfull."
      );
    })
    .catch((error) => {
      logger.error(
        "[articles.controller.ts, getArticles()] FIND query failed!\n" + error
      );
      response.status(503).json({ msg: "Query failed", reason: error });
    });
}

// for fetching an article from the database.
function getThisArticle(request: Request, response: Response) {
  // converting ID from string to MongoDB Object ID.
  const articleID: MongoDB.ObjectId = new MongoDB.ObjectId(request.params.id);

  db.collection(collection_name)
    .findOne({ _id: articleID })
    .then((record) => {
      response.status(200).send(record);
      logger.info(
        "[articles.controller.ts, getThisArticle()] FIND query successfull."
      );
    })
    .catch((error) => {
      logger.error(
        "[articles.controller.ts, getThisArticles()] FIND query failed!\n" +
          error
      );
      response.status(503).json({ msg: "Query failed", reason: error });
    });
}

// =======================================
// FOR CREATING A NEW ARTICLE.
// =======================================
function createNewArticle(request: Request, response: Response) {
  const articleData: Article = request.body;

  // database transaction (create operation).
  makeNewEntry(articleData, collection_name).then((success) => {
    success
      ? response.status(200).json({ msg: "Article creation successfull!" })
      : response.status(503).json({ msg: "Article creation failed!" });
  });
}

// for updating an existing article.

// =======================================
// FOR REMOVING AN EXISTING ARTICLE.
// =======================================
function removeThisArticle(request: Request, response: Response) {
  const articleID: string = request.params.id;

  // database transaction (delete operation).
  deleteAnEntry(articleID, collection_name).then((success) => {
    success
      ? response.status(200).json({ msg: "Article removal successfull!" })
      : response.status(503).json({ msg: "Article removal failed!" });
  });
}

export { getArticles };
export { getThisArticle };
export { createNewArticle };
export { removeThisArticle };
