import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import Sidebar from "../sidebar/Sidebar";

export const UserLayout = ({ children, title }) => {
  return (
    <div className="d-flex min-vh-100">
      <div className="side-menu bg-dark text-light">
      <Sidebar/></div>
        
      <div className="right-content w-100">
        <Header />
        <div className="p-3">
            <h2>{title}</h2>
            <hr/>
        </div>
        <main className="main">{children}</main>
        <Footer />
      </div>
    </div>
  );
};
