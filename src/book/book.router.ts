import { Router } from "express";
import { errorMiddleware } from "../middleware";
import { validationMiddleware } from "../middleware/validation.middleware";
import { BookController } from "./book.controller";
import { CreateBookDto, UpdateBookDto } from "./dto";

const bookController = new BookController();
const router = Router();

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
router.use(errorMiddleware);

export default router;
