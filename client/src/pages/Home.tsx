import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";

function Home() {
    return (
        <>
            <div>
                <h1>Teamflow</h1>
                <p>Manage Projects, Track Tasks. Ship Faster. </p>
            </div>
            

            <Navbar />
            <Hero />
            <Features />
            <Footer />
        </>

    );
}
export default Home ;