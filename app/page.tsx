"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Hero } from "../components";

export default function Home() {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [selectedMakeId, setSelectedMakeId] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [years, setYears] = useState<string[]>([]);

  const fetchVehicleTypes = async () => {
    try {
      const response = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch vehicle types");
      }
      const data = await response.json();
      setVehicleTypes(data.Results);
    } catch (error) {
      console.error("Error fetching vehicle types:", error);
    }
  };

  const loadYears = () => {
    const currentYear = new Date().getFullYear();
    const yearRange = Array.from({ length: currentYear - 2014 }, (_, i) =>
      (currentYear - i).toString()
    );
    setYears(yearRange);
  };

  useEffect(() => {
    fetchVehicleTypes();
    loadYears();
  }, []);

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold mb-4">Car Catalog</h1>
          <p className="text-lg">
            Explore our website to learn more about our products and services.
          </p>
        </div>
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-4">
            <div className="mb-4">
              <select
                className="border border-gray-300 rounded-md p-2"
                value={selectedMakeId}
                onChange={(e) => setSelectedMakeId(e.target.value)}
              >
                <option value="">Select Vehicle Type</option>
                {vehicleTypes.map((type: any) => (
                  <option key={type.MakeId} value={type.MakeId}>
                    {type.MakeName}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <select
                className="border border-gray-300 rounded-md p-2"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">Select Model Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <Link
              href={`/result/${selectedMakeId}/${selectedYear}`}
              className={`px-4 py-2 rounded text-white ${
                selectedMakeId && selectedYear ? "bg-blue-500" : "bg-gray-300"
              } ${selectedMakeId && selectedYear ? "cursor-pointer" : "cursor-not-allowed"}`}
            >
              Next
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
