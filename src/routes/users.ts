import { Router } from "express";

// controller imports.
import {
  getUsers,
  getThisUser,
  createNewUser,
  removeThisUser,
} from "../controllers/user.controller";

const router = Router(); // instantiating a router.

// HANDLING DIFFERENT REQUESTS.
// fetches all the users.
router.get("/", getUsers); // (https://xxxxxxx.xxx/users/all)

// fetches an user having a particular ID.
router.get("/:id", getThisUser); // (https://xxxxxxx.xxx/users/*)

// creates a new user record.
router.post("/", createNewUser); // (https://xxxxxxx.xxx/users/new)

// updates an user having a particular ID.

// removes an user having a particular ID.
router.delete("/:id", removeThisUser); // (https://xxxxxxx.xxx/users/*)

export default router;
