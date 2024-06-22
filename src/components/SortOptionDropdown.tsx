import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

type Props = {
 onChange : (value:string) => void;
 sortOption:string;
};

const sort_options = [
  {
    label: "Best Match",
    value: "bestMatch",
  },
  {
    label: "Delivery Price",
    value: "deliveryPrice", //camel case as it's defined in the schema in backend
  },
  {
    label: "Estimated Delivery Time",
    value: "estimatedDeliveryTime", //camel case as it's defined in the schema in backend
  },
];

export default function SortOptionDropdown({onChange,sortOption}: Props) {
  const selectedSortLabel = sort_options.find(
    (option) => option.value === sortOption
  )?.label || sort_options[0].label;
  return (
   <DropdownMenu>
    <DropdownMenuTrigger className="cursor-pointer">
     <Button variant={'outline'} className="w-full">
      Sort by:{selectedSortLabel}
     </Button>
     <DropdownMenuContent>
{
 sort_options.map((option) => (
  <DropdownMenuItem
   key={option.value}
   className="cursor-pointer"
   onClick={() => onChange(option.value)}
  >
   {option.label}
  </DropdownMenuItem>
 ))
}
     </DropdownMenuContent>

    </DropdownMenuTrigger>

   </DropdownMenu>
  )
}