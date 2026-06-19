import Banner from "@/components/Banner/Banner";
import Footer from "@/components/Footer/Footer";
import StatsSection from "@/components/Stats/StatsSection";
export default function Home({children}) {
  return (
    <>
    
    {children}
    <Banner/>
    <StatsSection/>
    <Footer/>
    </>
  )
}
