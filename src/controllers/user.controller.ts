import { Request, Response } from "express";
import BCryptJS from "bcryptjs";

import logger from "../utils/logger";
import { User } from "../models/user.model";
import { TRANSACTION_TYPE } from "../models/transaction_type.model";

// functions required for the operations.
import { makeNewEntry } from "../utils/db_operations/create_op";
import { deleteAnEntry } from "../utils/db_operations/delete_op";
import { fetchAnEntry, fetchEntries } from "../utils/db_operations/read_op";

// =======================================
// FOR CREATING A NEW USER.
// =======================================
function createNewUser(request: Request, response: Response) {
  let userData: User = request.body; // password would be hashed later.

  // changing user password from plain text to hash value.
  // returns the original text upon failure.
  BCryptJS.hash(userData.password, 12)
    .then((hash) => {
      // updating password value.
      userData.password = hash;
      logger.error("[user.controller, generateHashFrom()] Encryption Failed.");

      // database transaction (create operation).
      const collectionName = userData.role.toLowerCase();
      makeNewEntry(userData, collectionName).then((transaction) => {
        switch (transaction.type) {
          case TRANSACTION_TYPE.SUCCESS:
            response.status(200).json({
              msg: "User creation successfull!",
              data: transaction.data,
            });
            break;

          case TRANSACTION_TYPE.FAILURE:
            response
              .status(503)
              .json({ msg: "User creation failed!", data: transaction.data });
            break;

          default:
            logger.error("[user.controller.ts, makeNewEntry] Default case.");
            break;
        }
      });
    })
    .catch((error) => {
      logger.error(
        "[user.controller.ts, generateHashFrom()] Password encryption Failed.\n" +
          error
      );
    });
}

// =======================================
// FOR FETCHING ALL THE USERS INFO (OF SAME ROLE)
// =======================================
function getUsers(request: Request, response: Response) {
  // search criteria. Must NOT contain ID as a filter criteria.
  const filter = request.body.filter;
  const collectionName = request.body.collection;
  const projection: Array<string> = request.body.fields;

  // database transaction (read operation).
  fetchEntries(filter, collectionName, projection).then((transaction) => {
    switch (transaction.type) {
      case TRANSACTION_TYPE.SUCCESS:
        response.status(200).json({
          msg: "Users fetched successfully!",
          data: transaction.data,
        });
        break;

      case TRANSACTION_TYPE.NORESULT:
        response
          .status(200)
          .json({ msg: "Users do not exist!", data: transaction.data });
        break;

      case TRANSACTION_TYPE.FAILURE:
        response.status(503).json({
          msg: "Fetching of users failed!",
          data: transaction.data,
        });
        break;

      default:
        logger.error("[users.controller.ts, makeNewEntry] Default case.");
        break;
    }
  });
}

// =======================================
// FOR FETCHING A USER INFO
// =======================================
function getThisUser(request: Request, response: Response) {
  const userID = request.params.id;
  const collectionName = request.body.collection;
  const projection: Array<string> = request.body.fields;

  // database transaction (read operation).
  fetchAnEntry(userID, collectionName, projection).then((transaction) => {
    switch (transaction.type) {
      case TRANSACTION_TYPE.SUCCESS:
        response.status(200).json({
          msg: "User fetched successfully!",
          data: transaction.data,
        });
        break;

      case TRANSACTION_TYPE.NORESULT:
        response
          .status(200)
          .json({ msg: "User does not exists!", data: transaction.data });
        break;

      case TRANSACTION_TYPE.FAILURE:
        response
          .status(503)
          .json({ msg: "Fetching user failed!", data: transaction.data });
        break;

      default:
        logger.error("[users.controller.ts, makeNewEntry] Default case.");
        break;
    }
  });
}

// =======================================
// FOR REMOVING AN EXISTING USER.
// =======================================
function removeThisUser(request: Request, response: Response) {
  const userID: string = request.params.id;
  const collectionName: string = request.body.collection;

  // database transaction (delete operation).
  deleteAnEntry(userID, collectionName).then((transaction) => {
    switch (transaction.type) {
      case TRANSACTION_TYPE.SUCCESS:
        response.status(200).json({
          msg: "User removal successfull!",
          data: transaction.data,
        });
        break;

      case TRANSACTION_TYPE.NORESULT:
        response
          .status(200)
          .json({ msg: "User does not exists!", data: transaction.data });
        break;

      case TRANSACTION_TYPE.FAILURE:
        response
          .status(503)
          .json({ msg: "User creation failed!", data: transaction.data });
        break;

      default:
        logger.error(
          "[user.controller.ts, removeThisUser] Switch default case."
        );
        break;
    }
  });
}

export { createNewUser };
export { getUsers };
export { getThisUser };
export { removeThisUser };
