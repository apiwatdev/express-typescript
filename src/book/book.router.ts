import { Router } from "express";
import { errorMiddleware } from "../middleware";
import { BookController } from "./book.controller";

const bookController = new BookController();
const router = Router();

router.get("/", bookController.getBooks.bind(bookController));
router.get("/:id", bookController.getBookById.bind(bookController));
router.post("/", bookController.createBook.bind(bookController));
router.patch("/:id", bookController.updateBookById.bind(bookController));
router.delete("/:id", bookController.deleteBookById.bind(bookController));
router.use(errorMiddleware);

export default router;
