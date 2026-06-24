import Banner from "@/components/Banner/Banner";
import CategoryCarousel from "@/components/CategoriesComponent/Categories";
import Footer from "@/components/Footer/Footer";
import StatsSection from "@/components/Stats/StatsSection";
import TopLibrarians from "@/components/Top-Librarian/TopLibrarians";
export default function Home({children}) {
  return (
    <>
    
    {children}
    <Banner/>
    <StatsSection/>
    <TopLibrarians/>
    <CategoryCarousel />
    <Footer/>
    </>
  )
}
