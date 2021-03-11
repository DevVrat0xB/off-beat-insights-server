import { Request, Response } from "express";
import MongoDB from "mongodb";

import { Article } from "../models/article.model";
import { TRANSACTION_TYPE } from "../models/transaction_type.model";

// functions required for the operations.
import { makeNewEntry } from "../utils/db_operations/create_op";
import { deleteAnEntry } from "../utils/db_operations/delete_op";
import { fetchAnEntry, fetchEntries } from "../utils/db_operations/read_op";
import logger from "../utils/logger";

const collection_name: string = "articles";

// =======================================
// FOR FETCHING ALL THE ARTICLES
// =======================================
function getArticles(request: Request, response: Response) {
  // search criteria. Must NOT contain ID as a filter criteria.
  const filter = request.body.filter;
  const projection: Array<string> = request.body.fields;

  // database transaction (read operation).
  fetchEntries(filter, collection_name, projection).then((transaction) => {
    switch (transaction.type) {
      case TRANSACTION_TYPE.SUCCESS:
        response.status(200).json({
          msg: "Articles fetched successfully!",
          data: transaction.data,
        });
        break;

      case TRANSACTION_TYPE.NORESULT:
        response
          .status(200)
          .json({ msg: "Articles do not exist!", data: transaction.data });
        break;

      case TRANSACTION_TYPE.FAILURE:
        response.status(503).json({
          msg: "Fetching of articles failed!",
          data: transaction.data,
        });
        break;

      default:
        logger.error("[articles.controller.ts, makeNewEntry] Default case.");
        break;
    }
  });
}

// =======================================
// FOR FETCHING AN ARTICLE
// =======================================
function getThisArticle(request: Request, response: Response) {
  const articleID = new MongoDB.ObjectId(request.params.id);
  const projection: Array<string> = request.body.fields;

  // database transaction (read operation).
  fetchAnEntry(articleID, collection_name, projection).then((transaction) => {
    switch (transaction.type) {
      case TRANSACTION_TYPE.SUCCESS:
        response.status(200).json({
          msg: "Article fetched successfully!",
          data: transaction.data,
        });
        break;

      case TRANSACTION_TYPE.NORESULT:
        response
          .status(200)
          .json({ msg: "Article does not exists!", data: transaction.data });
        break;

      case TRANSACTION_TYPE.FAILURE:
        response
          .status(503)
          .json({ msg: "Fetching article failed!", data: transaction.data });
        break;

      default:
        logger.error("[articles.controller.ts, makeNewEntry] Default case.");
        break;
    }
  });
}

// =======================================
// FOR CREATING A NEW ARTICLE.
// =======================================
function createNewArticle(request: Request, response: Response) {
  const articleData: Article = request.body;

  // database transaction (create operation).
  makeNewEntry(articleData, collection_name).then((transaction) => {
    switch (transaction.type) {
      case TRANSACTION_TYPE.SUCCESS:
        response.status(200).json({
          msg: "Article creation successfull!",
          data: transaction.data,
        });
        break;

      case TRANSACTION_TYPE.FAILURE:
        response
          .status(503)
          .json({ msg: "Article creation failed!", data: transaction.data });
        break;

      default:
        logger.error("[articles.controller.ts, makeNewEntry] Default case.");
        break;
    }
  });
}

// =======================================
// FOR REMOVING AN EXISTING ARTICLE.
// =======================================
function removeThisArticle(request: Request, response: Response) {
  const articleID = new MongoDB.ObjectId(request.params.id);

  // database transaction (delete operation).
  deleteAnEntry(articleID, collection_name).then((transaction) => {
    switch (transaction.type) {
      case TRANSACTION_TYPE.SUCCESS:
        response.status(200).json({
          msg: "Article removal successfull!",
          data: transaction.data,
        });
        break;

      case TRANSACTION_TYPE.NORESULT:
        response
          .status(200)
          .json({ msg: "Article does not exists!", data: transaction.data });
        break;

      case TRANSACTION_TYPE.FAILURE:
        response
          .status(503)
          .json({ msg: "Article creation failed!", data: transaction.data });
        break;

      default:
        logger.error(
          "[articles.controller.ts, removeThisArticle] Switch default case."
        );
        break;
    }
  });
}

export { getArticles };
export { getThisArticle };
export { createNewArticle };
export { removeThisArticle };
