import Navbar from "@/ui/Navbar";
import Footer from "@/ui/Footer";
import "./globals.css";

export const metadata = {
  title: "Cooking Website",
  description: "Discover delicious recipes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
