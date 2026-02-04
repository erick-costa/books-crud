import { create } from "zustand"
import type { Author } from "../types/author"
import * as service from "../services/authors.service"

type AuthorsStore = {
  authors: Author[]
  loadAuthors: () => Promise<void>
  addAuthor: (author: Author) => Promise<void>
  removeAuthor: (id: string) => Promise<void>
}

export const useAuthorsStore = create<AuthorsStore>((set) => ({
  authors: [],

  loadAuthors: async () => {
    const data = await service.getAuthors()

    set({ authors: data })
  },

  addAuthor: async (author) => {
    await service.createAuthor(author)
    const data = await service.getAuthors()

    set({ authors: data })
  },

  removeAuthor: async (id) => {
    await service.deleteAuthor(id)
    const data = await service.getAuthors()

    set({ authors: data })
  },
}))
