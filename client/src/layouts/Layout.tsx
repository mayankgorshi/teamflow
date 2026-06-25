import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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