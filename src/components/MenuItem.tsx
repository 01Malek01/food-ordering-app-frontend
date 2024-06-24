import { MenuItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  menuItem: MenuItem;
  addToCart: () => void;
};

export default function MenuItemCard({ menuItem, addToCart }: Props) {
  return(

   <Card className="cursor-pointer" onClick={addToCart}>
<CardHeader>
 <CardTitle className="text-3xl font-bold tracking-tight">
  {menuItem.name}
 </CardTitle>
</CardHeader>
<CardContent className="font-bold">
${(menuItem.price/100).toFixed(2)}
</CardContent>
  </Card>
   )
}
