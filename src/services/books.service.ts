import { db } from "./storage"
import type { Book } from "../types/book"

const KEY = "books"

export async function getBooks(): Promise<Book[]> {
  return (await db.getItem<Book[]>(KEY)) || []
}

export async function createBook(book: Book) {
  const books = await getBooks()
  await db.setItem(KEY, [...books, book])
}

export async function deleteBook(id: string) {
  const books = await getBooks()
  await db.setItem(
    KEY,
    books.filter((book) => book.id !== id),
  )
}
