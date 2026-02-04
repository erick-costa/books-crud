import { Modal, Form, Input } from "antd"
import { useAuthorsStore } from "../../store/authors.store"
import { v4 as uuid } from "uuid"

type AuthorFormModalProps = {
  open: boolean
  onClose: () => void
}

export function AuthorFormModal({ open, onClose }: AuthorFormModalProps) {
  const [form] = Form.useForm()
  const { addAuthor } = useAuthorsStore()

  async function handleSubmit() {
    const values = await form.validateFields()

    await addAuthor({
      id: uuid(),
      name: values.name,
      email: values.email,
    })

    form.resetFields()
    onClose()
  }

  return (
    <Modal
      title="Criar Autor"
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
          rules={[{ required: true, message: "Informe o nome do autor" }]}
        >
          <Input placeholder="Ex: George R. R. Martin" />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input placeholder="opcional" />
        </Form.Item>
      </Form>
    </Modal>
  )
}
