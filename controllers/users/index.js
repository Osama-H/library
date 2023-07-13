const router = require("express").Router();
const signup = require("./signup");
const login = require("./login");
const protect = require("./utils/protect-routes");
const myProfile = require("./my-profile");
const deleteMyAccount = require("./delete-account");
const updateMe = require("./update-account");
const restoreAccount = require("./restore-account");
const restrictTo = require("./utils/restrict-to");
const getUser = require("./get-user");

// const{getUser} = require("./../users")

router.patch("/updateMe", protect, updateMe);
router.get("/getMe", protect, myProfile);
router.delete("/deleteMe", protect, deleteMyAccount);
router.post("/signup", signup);
router.post("/login", login);
router.get("/:userId", getUser);
router.patch("/restore/:userId", protect, restrictTo("admin"), restoreAccount);

module.exports = router;
