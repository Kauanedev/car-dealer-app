import Image from "next/image";
import { Hero } from "../components";
import SearchBar from "../components/SearchBar";
import CustomFilter from "../components/CustomFilter";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold mb-4">Car Cataloge</h1>
          <p className="text-lg">
            Explore our website to learn more about our products and services.
          </p>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilter title="fuel" />
            <CustomFilter title="year" />
          </div>
        </div>
      </div>
    </main>
  );
}
