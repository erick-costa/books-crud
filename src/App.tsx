import { Tabs } from "antd"
import { AuthorsPage } from "./pages/Authors"
import { BooksPage } from "./pages/Books"

export default function App() {
  return (
    <div style={{ padding: 24 }}>
      <Tabs
        items={[
          {
            key: "authors",
            label: "Autores",
            children: <AuthorsPage />,
          },
          {
            key: "books",
            label: "Livros",
            children: <BooksPage />,
          },
        ]}
      />
    </div>
  )
}
