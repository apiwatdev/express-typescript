import { Router } from "express";
import { validationMiddleware, authMiddleware } from "../middleware";

import { BookController } from "./book.controller";
import { CreateBookDto, UpdateBookDto } from "./dto";

const bookController = new BookController();
const router = Router();

router.use(authMiddleware);
router.get("/", bookController.getBooks.bind(bookController));
router.get("/:id", bookController.getBookById.bind(bookController));
router.post(
  "/",
  validationMiddleware(CreateBookDto),
  bookController.createBook.bind(bookController)
);
router.patch(
  "/:id",
  validationMiddleware(UpdateBookDto),
  bookController.updateBookById.bind(bookController)
);
router.delete("/:id", bookController.deleteBookById.bind(bookController));

export default router;
