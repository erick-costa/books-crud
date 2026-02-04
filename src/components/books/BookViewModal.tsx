import { Modal, Descriptions } from "antd"
import type { Book } from "../../types/book"
import { useAuthorsStore } from "../../store/authors.store"
import dayjs from "dayjs"

type BookViewModalProps = {
  book: Book | null
  onClose: () => void
}

export function BookViewModal({ book, onClose }: BookViewModalProps) {
  const { authors } = useAuthorsStore()

  if (!book) return null

  const authorName =
    authors.find((a) => a.id === book.author_id)?.name || "Desconhecido"

  return (
    <Modal
      centered
      title="Detalhes do Livro"
      open={!!book}
      onCancel={onClose}
      footer={null}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="ID">{book.id}</Descriptions.Item>
        <Descriptions.Item label="Nome">{book.name}</Descriptions.Item>
        <Descriptions.Item label="Autor">{authorName}</Descriptions.Item>
        <Descriptions.Item label="Páginas">
          {book.pages || "—"}
        </Descriptions.Item>
        <Descriptions.Item label="Criado em">
          {dayjs(book.createdAt).format("DD/MM/YYYY HH:mm")}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  )
}
