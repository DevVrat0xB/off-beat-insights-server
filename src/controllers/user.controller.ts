import { Request, Response } from "express";
import BCryptJS from "bcryptjs";

import logger from "../utils/logger";
import { db } from "./../express";
import { User } from "../models/user.model";

// for creating a new user.
function createNewUser(request: Request, response: Response) {
  let user: User = request.body; // password would be hashed later.

  // changing user password from plain text to hash value.
  // returns the original text upon failure.
  BCryptJS.hash(user.password, 12)
    .then((hash) => {
      // updating password value.
      user.password = hash;
      logger.error(
        "[user.controller.ts, generateHashFrom()] Encryption Failed."
      );

      // All collections have same name as of the role (but all in lowercase).
      // E.g Admin (a role) => admin (a collection).
      db.collection(user.role.toLowerCase())
        .insertOne(user)
        .then((result) => {
          response.status(200).json({ msg: "Operation successfull!" });
          logger.info(
            "[users.controller.ts, createNewUser()] INSERT query successfull."
          );
        })
        .catch((error) => {
          logger.error(
            "[users.controller.ts, createNewUser()] INSERT query failed!\n" +
              error
          );
          response.status(503).json({ msg: "Query failed", reason: error });
        });
    })
    .catch((error) => {
      logger.error(
        "[user.controller.ts, generateHashFrom()] Encryption Failed.\n" + error
      );
    });
}
