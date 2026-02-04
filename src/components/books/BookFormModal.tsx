import { Modal, Form, Input, InputNumber, Select } from "antd"
import { v4 as uuid } from "uuid"

import { useBooksStore } from "../../store/books.store"
import { useAuthorsStore } from "../../store/authors.store"

type BookFormModalProps = {
  open: boolean
  onClose: () => void
}

export function BookFormModal({ open, onClose }: BookFormModalProps) {
  const [form] = Form.useForm()

  const { addBook } = useBooksStore()
  const { authors } = useAuthorsStore()

  async function handleSubmit() {
    const values = await form.validateFields()

    await addBook({
      id: uuid(),
      name: values.name,
      author_id: values.author_id,
      pages: values.pages,
      createdAt: new Date().toISOString(),
    })

    form.resetFields()
    onClose()
  }

  return (
    <Modal
      title="Criar Livro"
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      okText="Salvar"
      cancelText="Cancelar"
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Nome"
          name="name"
          rules={[{ required: true, message: "Informe o nome do livro" }]}
        >
          <Input placeholder="Ex: A Guerra dos Tronos" />
        </Form.Item>

        <Form.Item
          label="Autor"
          name="author_id"
          rules={[{ required: true, message: "Selecione um autor" }]}
        >
          <Select
            showSearch={{ optionFilterProp: "label" }}
            placeholder="Selecione um autor"
            options={authors.map((author) => ({
              value: author.id,
              label: author.name,
            }))}
          />
        </Form.Item>

        <Form.Item label="Páginas" name="pages">
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Opcional"
            min={1}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
