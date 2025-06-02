import { GlobalStyle } from "./shared/styles/GlobalStyle";
import { RouteWeb } from "./presentation/routes";
import { AuthProvider } from "./presentation/contexts/AuthContext";
import { PostProvider } from "./presentation/contexts/PostContext";
import { CommentProvider } from "./presentation/contexts/CommentContext";

export function App() {
  return (
    <AuthProvider>
      <GlobalStyle />
      <PostProvider>
        <CommentProvider>
          <RouteWeb />
        </CommentProvider>
      </PostProvider>
    </AuthProvider>
  );
}
