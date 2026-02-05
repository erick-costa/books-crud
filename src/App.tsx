import { Layout, Typography, Tabs, Card } from "antd"
import { AuthorsPage } from "./pages/Authors"
import { BooksPage } from "./pages/Books"
import "./index.css"

const { Header, Content } = Layout
const { Title } = Typography

export default function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "#fff",
          padding: "24px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Title level={3} style={{ margin: 0 }}>
          Books & Authors
        </Title>
      </Header>

      <Content style={{ padding: 24 }}>
        <Card>
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
        </Card>
      </Content>
    </Layout>
  )
}
