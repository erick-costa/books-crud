import { useEffect, useState } from "react"
import { Button, Table, Typography, Space, Row, Col, message } from "antd"

import { useBooksStore } from "../store/books.store"
import { useAuthorsStore } from "../store/authors.store"

import { ConfirmDelete } from "../components/shared/ConfirmDelete"
import { BookFormModal } from "../components/books/BookFormModal"
import { BookViewModal } from "../components/books/BookViewModal"

import type { Book } from "../types/book"

import { EyeOutlined } from "@ant-design/icons"

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
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={4}>Livros</Title>
        </Col>
        <Col>
          <Button type="primary" onClick={() => setCreateOpen(true)}>
            Novo Livro
          </Button>
        </Col>
      </Row>

      {authors.length === 0 && (
        <p style={{ marginTop: 10 }}>
          Cadastre um autor antes de criar livros.
        </p>
      )}

      <Table
        style={{ marginTop: 20 }}
        size="middle"
        bordered
        pagination={{ pageSize: 5 }}
        dataSource={books}
        rowKey="id"
        locale={{
          emptyText: (
            <div style={{ padding: 32, textAlign: "center" }}>
              <Title level={5}>Nenhum livro cadastrado</Title>
              <p>Clique em “Novo Livro” para começar</p>
            </div>
          ),
        }}
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
                <Button
                  icon={<EyeOutlined />}
                  onClick={() => setSelectedBook(record)}
                />
                <ConfirmDelete
                  onConfirm={() => {
                    removeBook(record.id)
                    message.success("Livro removido com sucesso")
                  }}
                />
              </Space>
            ),
          },
        ]}
      />

      <BookFormModal open={createOpen} onClose={() => setCreateOpen(false)} />

      <BookViewModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    </div>
  )
}
