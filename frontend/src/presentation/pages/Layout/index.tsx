import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { SMain } from "./styles";

export function Layout() {
  return (
    <>
      <Header />
      <SMain>
        <Outlet />
      </SMain>
      <Footer />
    </>
  );
}
