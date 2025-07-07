import { Post } from "../components/Post";
import { useEffect, useState } from "react";
import type { PostProps } from "../../shared/types/PostType";
import { makeGetAllPostsUseCase } from "../../factories/makePostUseCases";
import type { MessageReturn } from "../../shared/types/MessageType";

export function Home() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const usecase = makeGetAllPostsUseCase();
      const result = await usecase.execute();
      setPosts(result);
    } catch (err) {
      const error = err as unknown as MessageReturn
      setError("Erro ao carregar posts: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  if (isLoading) return <p>Carregando posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h1>Lista de Posts</h1>
      {posts.length === 0 ? (
        <p>Nenhum post encontrado.</p>
      ) : (
        <Post posts={posts} />
      )}
    </>
  )
}
