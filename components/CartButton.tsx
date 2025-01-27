import useCart from "@/hooks/useCart";
import { useSession } from "@clerk/nextjs";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import AuthModal from "./modal/auth-modal";
import { Button } from "./ui/button";
import Loading from "./ui/loading";

function CartButton() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useSession();

  const cart = useCart();
  const handleGotoCart = () => router.push("/cart");
  return (
    <div className="flex items-center gap-2">
      {!isSignedIn || !isLoaded ? (
        <>
          <AuthModal
            trigger={
              <Button className="flex items-center gap-1 rounded-full px-4 py-2">
                <ShoppingBag size={20} />
                <span className="ml-2 font-semibold">
                  {isSignedIn && !isLoaded ? <Loading /> : 0}
                </span>
              </Button>
            }
          />
          {isSignedIn && !isLoaded && <Loading />}
        </>
      ) : (
        <Button
          onClick={handleGotoCart}
          className="flex items-center gap-1 rounded-full px-4 py-2"
        >
          <ShoppingBag size={20} />
          {cart ? (
            <span className="ml-2 font-semibold">{cart.items.length}</span>
          ) : (
            <Loading />
          )}
        </Button>
      )}
    </div>
  );
}

export default CartButton;
