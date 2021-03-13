import { db } from "../../express";

import logger from "../logger";

import { User } from "../../models/user.model";
import { Article } from "../../models/article.model";
import {
  TRANSACTION,
  TRANSACTION_TYPE,
} from "../../models/transaction_type.model";

// for creating a new entry in any given collection.
export const makeNewEntry = async (
  data: User | Article,
  collection: string
): Promise<TRANSACTION> => {
  let result: TRANSACTION; // result of the query.

  try {
    const query = await db
      .collection<User | Article>(collection)
      .insertOne(data);
    logger.info("[create_op.ts, makeNewEntry()] INSERT query successfull.");

    // returning ID of the created record (if created).
    if (query.insertedCount === 1)
      result = { type: TRANSACTION_TYPE.SUCCESS, data: query.insertedId };
    // in case if query ran but couldn't create the record.
    else result = { type: TRANSACTION_TYPE.NORESULT, data: null };
  } catch (error) {
    logger.error(
      "[create_op.ts, makeNewEntry()] INSERT query failed!." + error
    );
    result = {
      type: TRANSACTION_TYPE.FAILURE,
      data: { error_code: error.code, field: error.keyValue },
    };
  }
  return result;
};
