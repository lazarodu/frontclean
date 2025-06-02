import { Routes, Route } from "react-router-dom";
import { Layout } from "../pages/Layout/index";
import { Home } from "../pages/Home";
import { Details } from "../pages/Details";
import { Login } from "../pages/Login";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserCommentsPage } from "../pages/UserComments";
import { AdminPostPage } from "../pages/AdminPost";
import { AdminCreatePostPage } from "../pages/AdminCreatePost";
import { AdminEditPostPage } from "../pages/AdminEditPost";
import { RegisterPage } from "../pages/Register";
export function RouteWeb() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Protected routes - User */}
        <Route
          path="/user/comments"
          element={
            <ProtectedRoute>
              <UserCommentsPage />
            </ProtectedRoute>
          }
        />

        {/* Protected routes - Admin */}
        <Route
          path="/admin/posts"
          element={
            <ProtectedRoute requireAdmin>
              <AdminPostPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/posts/create"
          element={
            <ProtectedRoute requireAdmin>
              <AdminCreatePostPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/posts/edit/:id"
          element={
            <ProtectedRoute requireAdmin>
              <AdminEditPostPage />
            </ProtectedRoute>
          }
        />

      </Route>
    </Routes>
  );
}
