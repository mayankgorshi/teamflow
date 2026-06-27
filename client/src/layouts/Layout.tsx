import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

type Layoutprops = {
    children: React.ReactNode;
};
function Layout({children}: Layoutprops){
    return(
        <>
        <Navbar/>
        <main>
            {children}
        </main>

        <Footer/>
        </>
    );
}
export default Layout