// function to generate 'projection' argument for MongoDB query.
export function generateProjectionArgFrom(fieldsName: Array<string>) {
  let fieldsToShow = new Map(); // empty now, results in projection of all fields.

  // mark the mention fields (when given at least 1) to be fetched.
  // if no fields are provided, all fields will be fetched.
  if (fieldsName.length !== 0) {
    fieldsName.forEach((field) => {
      fieldsToShow.set(field, 1);
    });
  }

  return fieldsToShow;
}
