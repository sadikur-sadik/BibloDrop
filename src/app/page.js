import Banner from "@/components/Banner/Banner";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import StatsSection from "@/components/Stats/StatsSection";
export default function Home({children}) {
  return (
    <>
    <Navbar/>
    {children}
    <Banner/>
    <StatsSection/>
    <Footer/>
    </>
  )
}
