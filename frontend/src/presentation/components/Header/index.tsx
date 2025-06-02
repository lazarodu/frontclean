import { FcSearch, FcVoicePresentation } from "react-icons/fc";
import { SHeader } from "./styles";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function Header() {
  const { currentUser, logout } = useAuth()
  return (
    <SHeader>
      <Link to="/">
        <FcVoicePresentation />
      </Link>
      <input type="checkbox" id="menu" />
      <nav>
        <label htmlFor="menu">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <div>
          <form action="" method="post">
            <FcSearch />
            <input type="text" name="search" placeholder="Busca" />
          </form>

          {currentUser ? (
            <>
              <Link to="/user/comments">Comentários</Link>
              {currentUser.role === "admin" && <Link to="/admin/posts">Postagens</Link>}
              <button type="button" onClick={logout}>Sair</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>
    </SHeader>
  );
}
