import { useEffect, useState } from "react"
import { Button, Table, Typography } from "antd"
import { useAuthorsStore } from "../store/authors.store"
import { ConfirmDelete } from "../components/shared/ConfirmDelete"

const { Title } = Typography

export function AuthorsPage() {
  const { authors, loadAuthors, removeAuthor } = useAuthorsStore()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    loadAuthors()
  }, [])

  return (
    <div>
      <Title level={3}>Autores</Title>

      <Button type="primary" onClick={() => setOpen(true)}>
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
              <ConfirmDelete onConfirm={() => removeAuthor(record.id)} />
            ),
          },
        ]}
      />
    </div>
  )
}
