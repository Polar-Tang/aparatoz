
import { ReactNode } from "react";
import Footer from "./footer";
import HomeHeader from "./home-header";


interface LayoutProps {
  children: ReactNode;
  isHome: boolean
}

export default function Layout({ children, isHome }: LayoutProps) {
  return (
    <main className="min-h-screen">
      <div className="relative">
        <HomeHeader isHome={isHome} />
      </div>
      
      {children}
      
      <Footer />
    </main>
  );
}