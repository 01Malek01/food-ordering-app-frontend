import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cuisinesList } from "@/config/restaurant-options-config";
import { useFormContext } from "react-hook-form";
import CuisineCheckbox from "./CuisineCheckbox";
export default function CuisinesSections() {
  const { control } = useFormContext();
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Cuisines</h2>
        <FormDescription>
          Select the cuisines that are served at this restaurant
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="cuisines"
        render={({ field }) => (
          <FormItem>
            <div className="grid md:grid-cols-5 gap-1">
              {cuisinesList.map((cuisine) => (
                //we passed field prop to register the checkbox and inputs in our cuisineCheckbox component
                <CuisineCheckbox cuisine={cuisine} field={field} />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
