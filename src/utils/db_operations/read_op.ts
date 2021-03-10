import { db } from "../../express";
import MongoDB from "mongodb";

import logger from "../../utils/logger";
import { generateProjectionArgFrom } from "./helper";

import { User } from "../../models/user.model";
import { Article } from "../../models/article.model";
import {
  TRANSACTION,
  TRANSACTION_TYPE,
} from "../../models/transaction_type.model";

// for fetching a single entry from any given collection.
export const fetchAnEntry = async (
  id: string,
  collection: string,
  fields: Array<string>
): Promise<any> => {
  // converting ID from string to MongoDB Object ID.
  const record_id: MongoDB.ObjectId = new MongoDB.ObjectId(id);

  // preparing projection argument.
  const fieldsToShow = generateProjectionArgFrom(fields);
  let result: TRANSACTION;

  try {
    const record = await db
      .collection(collection)
      .findOne({ _id: record_id }, { projection: fieldsToShow });
    logger.info("[read_op.ts, fetchAnEntry()] READ query successfull.");
    if (record !== null) {
      result = { type: TRANSACTION_TYPE.SUCCESS, data: record };
    } else {
      result = { type: TRANSACTION_TYPE.NORESULT, data: null };
    }
  } catch (error) {
    logger.error("[read_op.ts, fetchAnEntry()] READ query failed.\n" + error);
    result = { type: TRANSACTION_TYPE.NORESULT, data: null };
  }
  return result;
};

// for fetching multiples entries from any given collection.
// the filter will be based on some fields of either of the model only.
// This wrapper function is NOT meant for searching a record by its ID.
export const fetchEntries = async (
  filter: Partial<User | Article>,
  collection: string,
  fields: Array<string>
): Promise<TRANSACTION> => {
  // preparing projection argument.
  const fieldsToShow = generateProjectionArgFrom(fields);
  let result: TRANSACTION;

  try {
    const records = await db
      .collection<User | Article>(collection)
      .find(filter)
      .project(fieldsToShow)
      .toArray();

    logger.info("[read_op.ts, fetchEntries()] READ query successfull.");
    logger.debug("RECORDS: " + records);

    // returning a list of records (if exist).
    if (records.length !== 0) {
      result = { type: TRANSACTION_TYPE.SUCCESS, data: records };
    } else {
      // returning a blank list (if no record is present)
      result = { type: TRANSACTION_TYPE.NORESULT, data: null };
    }
  } catch (error) {
    logger.error("[read_op.ts, fetchEntries()] READ query failed.\n" + error);
    result = { type: TRANSACTION_TYPE.FAILURE, data: null };
  }
  return result;
};
