import { cuisinesList } from "@/config/restaurant-options-config";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

type Props = {
  onChange: (cuisine: string[]) => void;
  selectedCuisines: string[];
  isExpanded?: boolean;
  onExpandClick: () => void;
};

export default function CuisineFilter({
  onChange, // pass selected cuisine to the parent
  selectedCuisines,
  isExpanded = false,
  onExpandClick,
}: Props) {
  const handleCuisinesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = e.target.value;
    const isChecked = e.target.checked;
    const newCuisinesList = isChecked
      ? [...selectedCuisines, clickedCuisine]
      : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);
    onChange(newCuisinesList);
  };

  const handleCuisinesReset = () => {
    onChange([]);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="text-md font-semibold mb-2">Filter By Cuisine</div>
        <div
          className="text-sm font-semibold underline cursor-pointer text-blue-500"
          onClick={handleCuisinesReset}
        >
          Reset Filters
        </div>
      </div>
      <div className="space-y-2 flex flex-col">
        {cuisinesList
          .slice(0, isExpanded ? cuisinesList.length : 7)
          .map((cuisine) => {
            const isSelected = selectedCuisines.includes(cuisine);
            return (
              <div className="flex" key={cuisine}>
                <input
                  id={`cuisine_${cuisine}`}
                  className="hidden"
                  type="checkbox"
                  checked={isSelected}
                  onChange={handleCuisinesChange}
                  value={cuisine}
                />
                <Label
                  htmlFor={`cuisine_${cuisine}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                    isSelected
                      ? "bg-orange-400 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {cuisine}
                </Label>
              </div>
            );
          })}
        <Button
          variant={"link"}
          className="mt-4 flex-1"
          onClick={onExpandClick}
        >
          {isExpanded ? (
            <span className="flex flex-row items-center">
              Show Less
              <ChevronUp size={20} strokeWidth={3} />
            </span>
          ) : (
            <span className="flex flex-row items-center">
              Show More
              <ChevronDown size={20} strokeWidth={3} />
            </span>
          )}
        </Button>
      </div>
    </>
  );
}
