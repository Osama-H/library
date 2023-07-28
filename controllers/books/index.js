const router = require("express").Router();
const protect = require("../../middlewares/protect-book-routes");

const restrictTo = require("../users/utils/restrict-to");
const addBook = require("./add-book");
const deleteBook = require("./delete-book");
const updateBook = require("./update-book");
const getBookById = require("./get-book-by-id");
const getBooks = require("./get-books");

router.route("/").post(protect, restrictTo("admin"), addBook).get(getBooks);
router
  .route("/:bookId")
  .delete(protect, restrictTo("admin"), deleteBook)
  .patch(protect, restrictTo("admin"), updateBook)
  .get(getBookById);

module.exports = router;
