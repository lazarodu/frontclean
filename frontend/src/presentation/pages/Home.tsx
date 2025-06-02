import { Post } from "../components/Post";
import { mockPosts } from "../../infrastructure/mocks/PostMock";

export function Home() {

  return <Post posts={mockPosts} />;
}
