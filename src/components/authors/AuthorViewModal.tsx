import { Modal, Descriptions } from "antd"
import dayjs from "dayjs"
import type { Author } from "../../types/author"

type AuthorViewModalProps = {
  author: Author | null
  onClose: () => void
}

export function AuthorViewModal({ author, onClose }: AuthorViewModalProps) {
  return (
    <Modal
      title="Detalhes do Autor"
      open={!!author}
      onCancel={onClose}
      footer={null}
    >
      {author && (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="ID">{author.id}</Descriptions.Item>
          <Descriptions.Item label="Nome">{author.name}</Descriptions.Item>
          <Descriptions.Item label="Email">
            {author.email || "—"}
          </Descriptions.Item>

          <Descriptions.Item label="Criado em">
            {dayjs(author.createdAt).format("DD/MM/YYYY HH:mm")}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  )
}
