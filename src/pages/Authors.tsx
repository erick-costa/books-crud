import { useEffect, useState } from "react"
import { Button, Table, Typography, Space, Row, Col, message } from "antd"

import { useAuthorsStore } from "../store/authors.store"
import { useBooksStore } from "../store/books.store"

import { ConfirmDelete } from "../components/shared/ConfirmDelete"

import { AuthorFormModal } from "../components/authors/AuthorFormModal"
import { AuthorViewModal } from "../components/authors/AuthorViewModal"
import type { Author } from "../types/author"

import { EyeOutlined } from "@ant-design/icons"

const { Title } = Typography

export function AuthorsPage() {
  const { authors, loadAuthors, removeAuthor } = useAuthorsStore()
  const { removeBooksByAuthor } = useBooksStore()

  const [createOpen, setCreateOpen] = useState(false)
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null)

  useEffect(() => {
    loadAuthors()
  }, [loadAuthors])

  return (
    <div>
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={4}>Autores</Title>
        </Col>
        <Col>
          <Button type="primary" onClick={() => setCreateOpen(true)}>
            Novo Autor
          </Button>
        </Col>
      </Row>

      <Table
        style={{ marginTop: 20 }}
        size="middle"
        bordered
        pagination={{ pageSize: 5 }}
        dataSource={authors}
        rowKey="id"
        locale={{
          emptyText: (
            <div style={{ padding: 32, textAlign: "center" }}>
              <Title level={5}>Nenhum autor cadastrado</Title>
              <p>Clique em “Novo Autor” para começar</p>
            </div>
          ),
        }}
        columns={[
          { title: "Nome", dataIndex: "name" },
          { title: "Email", dataIndex: "email" },
          {
            title: "Ações",
            render: (_, record) => (
              <Space>
                <Button
                  icon={<EyeOutlined />}
                  onClick={() => setSelectedAuthor(record)}
                />

                <ConfirmDelete
                  onConfirm={async () => {
                    await removeBooksByAuthor(record.id)
                    await removeAuthor(record.id)

                    message.success(
                      "Autor e livros vinculados removidos com sucesso",
                    )
                  }}
                />
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
