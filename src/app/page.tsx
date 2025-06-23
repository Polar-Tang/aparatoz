import Hero from "@/components/hero"
import BenefitsSection from "@/components/benefits-section"
import FeaturedProducts from "@/components/featured-products"
import Testimonials from "@/components/testimonials"
import Layout from "@/components/Layout"



export default function HomePage() {
  return (
    <Layout isHome={true}>
      <Hero />
      <FeaturedProducts />
      <BenefitsSection />
      <Testimonials />

    </Layout>
  )
}
