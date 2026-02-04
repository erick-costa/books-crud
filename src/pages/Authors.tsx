import { useEffect, useState } from "react"
import { Button, Table, Typography, Space } from "antd"

import { useAuthorsStore } from "../store/authors.store"
import { ConfirmDelete } from "../components/shared/ConfirmDelete"

import { AuthorFormModal } from "../components/authors/AuthorFormModal"
import { AuthorViewModal } from "../components/authors/AuthorViewModal"
import type { Author } from "../types/author"

const { Title } = Typography

export function AuthorsPage() {
  const { authors, loadAuthors, removeAuthor } = useAuthorsStore()

  const [createOpen, setCreateOpen] = useState(false)
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null)

  useEffect(() => {
    loadAuthors()
  }, [loadAuthors])

  return (
    <div>
      <Title level={3}>Autores</Title>

      <Button type="primary" onClick={() => setCreateOpen(true)}>
        Novo Autor
      </Button>

      <Table
        style={{ marginTop: 20 }}
        dataSource={authors}
        rowKey="id"
        columns={[
          { title: "Nome", dataIndex: "name" },
          { title: "Email", dataIndex: "email" },
          {
            title: "Ações",
            render: (_, record) => (
              <Space>
                <Button onClick={() => setSelectedAuthor(record)}>
                  Visualizar
                </Button>

                <ConfirmDelete onConfirm={() => removeAuthor(record.id)} />
              </Space>
            ),
          },
        ]}
      />
      <AuthorFormModal open={createOpen} onClose={() => setCreateOpen(false)} />

      <AuthorViewModal
        author={selectedAuthor}
        onClose={() => setSelectedAuthor(null)}
      />
    </div>
  )
}
