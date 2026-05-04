import Navbar from "@/Components/Navbar";
import "./globals.css";
import Footer from "@/Components/Footer";
import FloatingButtons from "@/Components/FloatingButtons";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <FloatingButtons />
        <Footer />
      </body>
    </html>
  );
}
