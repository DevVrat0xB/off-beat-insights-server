import { Request, Response } from "express";
import MongoDB from "mongodb";

import logger from "../utils/logger";
import { db } from "./../express";
import { Article } from "../models/article.model";

const ARTICLES: string = "articles"; // name of the collection.

// for fetching all the articles from the database.
function getArticles(request: Request, response: Response) {
  db.collection(ARTICLES)
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

  db.collection(ARTICLES)
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

// for creating a new article.
function createNewArticle(request: Request, response: Response) {
  const article: Article = request.body;

  db.collection(ARTICLES)
    .insertOne(article)
    .then((result) => {
      response.status(200).json({ msg: "Operation successfull!" });
      logger.info(
        "[articles.controller.ts, createNewArticle()] INSERT query successfull."
      );
    })
    .catch((error) => {
      logger.error(
        "[articles.controller.ts, createNewArticle()] INSERT query failed!\n" +
          error
      );
      response.status(503).json({ msg: "Query failed", reason: error });
    });
}

// for updating an existing article.

// for removing an existing article.
function removeThisArticle(request: Request, response: Response) {
  // converting ID from string to MongoDB Object ID.
  const articleID: MongoDB.ObjectId = new MongoDB.ObjectId(request.params.id);

  db.collection(ARTICLES)
    .deleteOne({ _id: articleID })
    .then((record) => {
      response.status(200).send(record);
      logger.info(
        "[articles.controller.ts, removeThisArticle()] DELETE query successfull."
      );
    })
    .catch((error) => {
      logger.error(
        "[articles.controller.ts, removeThisArticles()] DELETE query failed!\n" +
          error
      );
      response.status(503).json({ msg: "Query failed", reason: error });
    });
}

export { getArticles };
export { getThisArticle };
export { createNewArticle };
export { removeThisArticle };
