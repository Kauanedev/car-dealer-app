import { Suspense } from "react";
import { VehicleList } from "../components";

async function fetchAllVehicles() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_VEHICLE_URL}?format=json`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (!data.Results || !Array.isArray(data.Results)) {
      throw new Error("Results array is missing or not an array");
    }

    return data.Results;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return [];
  }
}

async function fetchVehicles(MakeId: string, year: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_GET_VEHICLE_TYPE}/makeId/${MakeId}/modelyear/${year}?format=json`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch vehicle models");
    }
    const data = await response.json();
    return data.Results;
  } catch (error) {
    console.error("Error fetching vehicle models:", error);
    return [];
  }
}

export async function generateStaticParams() {
  const currentYear = new Date().getFullYear();
  const allVehicles = await fetchAllVehicles();

  if (!allVehicles || !Array.isArray(allVehicles)) {
    console.error("Failed to fetch vehicles or vehicles format is incorrect");
    return [];
  }

  const years = Array.from({ length: currentYear - 2014 }, (_, i) =>
    (currentYear - i).toString()
  );

  let params = [];

  for (const vehicle of allVehicles) {
    for (const year of years) {
      params.push({
        MakeId: vehicle.MakeId.toString(),
        year: year,
      });
    }
  }
  return params;
}

export default async function ResultPage({
  params,
}: {
  params: { makeId: string; year: string };
}) {
  const { makeId, year } = params;

  const vehicles = await fetchVehicles(makeId, year);

  const formatVehicles = vehicles.map((vehicle: any) => ({
    MakeId: vehicle.Make_ID,
    MakeName: vehicle.Make_Name,
    ModelId: vehicle.Model_ID,
    ModelName: vehicle.Model_Name,
  }));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-6">Vehicle Models</h1>

      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            Loading...
          </div>
        }
      >
        <VehicleList vehicles={formatVehicles} />
      </Suspense>
    </div>
  );
}
