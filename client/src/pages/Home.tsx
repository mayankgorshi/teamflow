import Layout from "../layouts/Layout";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import WhyChooseUs from "../components/Whychooseus";
import CTA from "../components/CTA";


function Home() {
    return (
        <>
            <Layout>
                <Hero />
                <Features />
                <WhyChooseUs/>
                <CTA />
            </Layout>
        </>

    );
}
export default Home;