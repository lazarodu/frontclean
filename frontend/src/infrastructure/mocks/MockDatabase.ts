import { User } from "../../domain/entities/User";
import { Post } from "../../domain/entities/Post";
import { Comment } from "../../domain/entities/Comment";
import { mockUsers } from "./UserMock";
import { mockPosts } from "./PostMock";
import { mockComments } from "./CommentMock";

export const MockDatabase = {
  users: mockUsers as User[],
  posts: mockPosts as Post[],
  comments: mockComments as Comment[],
  currentUser: null as User | null,
};
