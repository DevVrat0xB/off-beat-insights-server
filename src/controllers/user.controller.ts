import { Request, Response } from "express";
import MongoDB from "mongodb";
import BCryptJS from "bcryptjs";

import logger from "../utils/logger";
import { User } from "../models/user.model";

// functions required for the operations.
import { makeNewEntry } from "../utils/db_operations/create_op";
import { deleteAnEntry } from "../utils/db_operations/delete_op";

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
      const collection_name = userData.role.toLowerCase();
      makeNewEntry(userData, collection_name).then((success) => {
        success
          ? response.status(200).json({ msg: "User creation successfull!" })
          : response.status(503).json({ msg: "User creation failed!" });
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
// FOR REMOVING AN EXISTING USER.
// =======================================
function removeThisUser(request: Request, response: Response) {
  const userID: string = request.params.id;
  const role: string = request.body.role;

  // database transaction (delete operation).
  // collection name = user role (in lowercase).
  deleteAnEntry(userID, role.toLowerCase()).then((success) => {
    success
      ? response.status(200).json({ msg: "User removal successfull!" })
      : response.status(503).json({ msg: "User removal failed!" });
  });
}
