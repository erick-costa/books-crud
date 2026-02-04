import { Popconfirm, Button } from "antd"
import { DeleteOutlined } from "@ant-design/icons"

type ConfirmDeleteProps = {
  onConfirm: () => void
}

export function ConfirmDelete({ onConfirm }: ConfirmDeleteProps) {
  return (
    <Popconfirm
      title="Tem certeza que deseja excluir?"
      okText="Sim"
      cancelText="Cancelar"
      onConfirm={onConfirm}
    >
      <Button danger icon={<DeleteOutlined />} />
    </Popconfirm>
  )
}
