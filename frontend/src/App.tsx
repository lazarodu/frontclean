import { GlobalStyle } from "./shared/styles/GlobalStyle";
import { RouteWeb } from "./presentation/routes";
import { AuthProvider } from "./presentation/contexts/AuthContext";
import { PostProvider } from "./presentation/contexts/PostContext";
import { CommentProvider } from "./presentation/contexts/CommentContext";
import { useNavigate } from "react-router-dom";
import { setupInterceptors } from "./infrastructure/http/interceptors";
import { ToastContainer } from "react-toastify";

export function App() {
  const navigate = useNavigate();
  setupInterceptors(() => {
    navigate("/login");
  });

  return (
    <AuthProvider>
      <GlobalStyle />
      <ToastContainer />
      <PostProvider>
        <CommentProvider>
          <RouteWeb />
        </CommentProvider>
      </PostProvider>
    </AuthProvider>
  );
}
