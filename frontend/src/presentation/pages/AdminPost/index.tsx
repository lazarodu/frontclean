import { usePost } from "../../hooks/usePost"
import { ActionButtons, Container, CreateButton, DeleteButton, EditButton, LoadingMessage, NoPosts, Table, Td, Th, Title, TitleRow } from "./styles"

export const AdminPostPage = () => {
  const { posts, isLoading, deletePost } = usePost()

  const handleDeletePost = async (id: string) => {
    if (window.confirm("Tem certeza de que deseja excluir esta postagem?")) {
      try {
        await deletePost(id)
      } catch (error) {
        console.error("Falha ao apagar o post:", error)
      }
    }
  }

  return (
    <>
      <Container>
        <TitleRow>
          <Title>Gerenciar Posts</Title>
          <CreateButton to="/admin/posts/create">Criar um Post</CreateButton>
        </TitleRow>

        {isLoading ? (
          <LoadingMessage>Carregando posts...</LoadingMessage>
        ) : posts.length === 0 ? (
          <NoPosts>Nenhum post encontrado. Crie o seu primeiro post!</NoPosts>
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>Título</Th>
                <Th>Autor</Th>
                <Th>Data</Th>
                <Th>Ações</Th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <Td>{post.title}</Td>
                  <Td>{post.user?.name}</Td>
                  <Td>{new Intl.DateTimeFormat("pt-BR").format(post.date)}</Td>
                  <Td>
                    <ActionButtons>
                      <EditButton to={`/admin/posts/edit/${post.id}`}>Edit</EditButton>
                      <DeleteButton onClick={() => handleDeletePost(post.id)}>Delete</DeleteButton>
                    </ActionButtons>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  )
}
