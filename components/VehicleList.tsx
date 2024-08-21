"use client";

import React from "react";
import { VehicleTypesProps } from "../types";

const VehicleList = ({ vehicles }: { vehicles: VehicleTypesProps[] }) => {
  console.log(vehicles);

  if (!vehicles || vehicles.length === 0) {
    return <div>No vehicles found</div>;
  }
  return (
    <ul className="space-y-4">
      {vehicles.map((vehicle) => (
        <li
          key={vehicle.ModelId}
          className="bg-white p-4 rounded shadow-md hover:shadow-lg
        transition-shadow"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              {vehicle.MakeName} {vehicle.ModelId}
            </h2>
            <p className="text-gray-600">{vehicle.ModelName}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default VehicleList;
