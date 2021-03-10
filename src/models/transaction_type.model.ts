export enum TRANSACTION_TYPE {
  SUCCESS, // successfull query, produced some result.
  FAILURE, // failed query, result can't be produced.
  NORESULT, // successfull query but produced empty or no result.
}

export interface TRANSACTION {
  type: TRANSACTION_TYPE;
  data: any; // null in case of FAILURE and NORESULT.
}
