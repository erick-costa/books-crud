import { create } from "zustand"
import type { Book } from "../types/book"
import * as service from "../services/books.service"

type BooksStore = {
  books: Book[]
  loadBooks: () => Promise<void>
  addBook: (book: Book) => Promise<void>
  removeBook: (id: string) => Promise<void>
}

export const useBooksStore = create<BooksStore>((set) => ({
  books: [],

  loadBooks: async () => {
    const data = await service.getBooks()

    set({ books: data })
  },

  addBook: async (book) => {
    await service.createBook(book)
    const data = await service.getBooks()

    set({ books: data })
  },

  removeBook: async (id) => {
    await service.deleteBook(id)
    const data = await service.getBooks()

    set({ books: data })
  },
}))
