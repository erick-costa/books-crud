import { useEffect, useState } from "react"
import { Button, Table, Typography, Space } from "antd"

import { useBooksStore } from "../store/books.store"
import { useAuthorsStore } from "../store/authors.store"

import { ConfirmDelete } from "../components/shared/ConfirmDelete"
import { BookFormModal } from "../components/books/BookFormModal"
import { BookViewModal } from "../components/books/BookViewModal"

import type { Book } from "../types/book"

const { Title } = Typography

export function BooksPage() {
  const { books, loadBooks, removeBook } = useBooksStore()
  const { authors, loadAuthors } = useAuthorsStore()

  const [createOpen, setCreateOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  useEffect(() => {
    loadBooks()
    loadAuthors()
  }, [loadBooks, loadAuthors])

  return (
    <div>
      <Title level={3}>Livros</Title>

      <Button
        type="primary"
        onClick={() => setCreateOpen(true)}
        disabled={authors.length === 0}
      >
        Novo Livro
      </Button>

      {authors.length === 0 && (
        <p style={{ marginTop: 10 }}>
          Cadastre um autor antes de criar livros.
        </p>
      )}

      <Table
        style={{ marginTop: 20 }}
        dataSource={books}
        rowKey="id"
        columns={[
          { title: "Nome", dataIndex: "name" },
          {
            title: "Autor",
            render: (_, record) =>
              authors.find((a) => a.id === record.author_id)?.name,
          },
          { title: "Páginas", dataIndex: "pages" },
          {
            title: "Ações",
            render: (_, record) => (
              <Space>
                <Button onClick={() => setSelectedBook(record)}>
                  Visualizar
                </Button>
                <ConfirmDelete onConfirm={() => removeBook(record.id)} />
              </Space>
            ),
          },
        ]}
      />

      {/* MODAIS */}
      <BookFormModal open={createOpen} onClose={() => setCreateOpen(false)} />

      <BookViewModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    </div>
  )
}
