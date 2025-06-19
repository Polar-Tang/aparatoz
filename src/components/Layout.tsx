
import { ReactNode } from "react";
import Footer from "./footer";
import Header from "./header-navigation";


interface LayoutProps {
  children: ReactNode;
  isHome: boolean
}

export default function Layout({ children, isHome }: LayoutProps) {
  return (
    <main className="min-h-screen">
      <div className="relative">
        <Header isHome={isHome} />
      </div>
      
      {children}
      
      <Footer />
    </main>
  );
}