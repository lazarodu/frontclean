import { Link } from "react-router-dom";
import { SMain } from "./styles";
import type { PostListProps } from "../../../shared/types/PostType";

export function Post({ posts }: PostListProps) {
  return (
    <SMain>
      {posts.map((post) => (
        <section key={post.id}>
          <header>
            <h3>{post.title}</h3>
            <div>
              <h5>{post.autor}</h5>, <h5>{post.data}</h5>
            </div>
          </header>
          <p>{post.description}</p>
          <Link to={`/details/${post.id}`}>Ver</Link>
        </section>
      ))}
    </SMain>
  );
}
