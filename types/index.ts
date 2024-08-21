import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string;
  containerStyles: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
}

export interface SearchVehicleTypesProps {
  vehicleTypes: string;
  setVehicleTypes: (vehicleTypes: string) => void;
}
export interface VehicleTypesProps {
  ModelId: string;
  MakeId: string;
  MakeName: string;
  ModelName: string;
}
