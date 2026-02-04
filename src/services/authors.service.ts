import { db } from "./storage"
import type { Author } from "../types/author"

const KEY = "authors"

export async function getAuthors(): Promise<Author[]> {
  return (await db.getItem<Author[]>(KEY)) || []
}

export async function createAuthor(author: Author) {
  const authors = await getAuthors()
  await db.setItem(KEY, [...authors, author])
}

export async function deleteAuthor(id: string) {
  const authors = await getAuthors()
  await db.setItem(
    KEY,
    authors.filter((author) => author.id !== id),
  )
}
