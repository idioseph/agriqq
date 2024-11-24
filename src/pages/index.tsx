import Hero from "@/components/FRONTEND/HomePage/Hero";
import News from "@/components/FRONTEND/HomePage/News";
import Products from "@/components/FRONTEND/HomePage/Products";

export default function Home() {
  return (
    <div className="font-montserrat">
      <section>
        <Hero />
      </section>
      <section>
        <Products />
      </section>
      <section>
        <News />
      </section>
    </div>
  );
}
