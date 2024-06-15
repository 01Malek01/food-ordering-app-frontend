import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  cuisine: string;
  field: ControllerRenderProps<FieldValues, "cuisines">;
};
function CuisineCheckbox({ cuisine, field }: Props) {

  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2 ">
      <FormControl>
        {/* we passed field prop to register the checkbox and inputs in our cuisineCheckbox component */}
        <Checkbox
          className="bg-white"
          checked={field.value.includes(cuisine)}
          onCheckedChange={(checked) => {
            if (checked) {
              //add the cuisine to the cuisines array (value)
              field.onChange([...field.value, cuisine]);
            } else {
              //remove the cuisine from the cuisines array (value) if the user unchecked it
              field.onChange(field.value.filter((c: string) => c !== cuisine));
            }
          }}
          {...field}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{cuisine}</FormLabel>
    </FormItem>
  );
}

export default CuisineCheckbox;
