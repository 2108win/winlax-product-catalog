import { ShoppingBasket } from "lucide-react";
import { Button } from "./ui/button";

function CartButton() {
  return (
    <Button variant="outline" className="w-fit text-lg">
      <ShoppingBasket />
      <span className="font-bold">3</span>
    </Button>
  );
}

export default CartButton;
