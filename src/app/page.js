import Banner from "@/components/Banner/Banner";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
export default function Home({children}) {
  return (
    <>
    <Navbar/>
    {children}
    <Banner/>
    <Footer/>
    </>
  )
}
