"use client";
import ShopHero from "@/components/pages/Shop/ShopHero";
import ShopProducts from "@/components/pages/Shop/ShopProducts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ItemMore } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import { getListCategories } from "@/utils/fetchCategories";
import { getListColors } from "@/utils/fetchColors";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

function ShopPage() {
  const [selectedCategories, setSelectedCategories] = useState<string>();
  const [selectedColors, setSelectedColors] = useState<string>();
  const [listColors, setListColors] = useState<ItemMore[]>([]);
  const [listCategories, setListCategories] = useState<ItemMore[]>([]);
  const onClickReset = () => {
    setSelectedColors("");
    setSelectedCategories("");
  };

  useEffect(() => {
    async function fetchSize() {
      try {
        const res = await getListColors();
        setListColors(res);
      } catch (error) {
        console.error("Error fetching sizes:", error);
      }
    }
    async function fetchCategories() {
      try {
        const res = await getListCategories();
        setListCategories(res);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchSize();
    fetchCategories();
  }, []);

  return (
    <>
      <ShopHero />

      <div className="pb-10 pt-5">
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 space-y-5 px-4 md:grid-cols-4 md:gap-6">
          <div className="sticky top-0 z-10 flex h-fit flex-col gap-4 bg-background py-5">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between">
                <p className="text-3xl font-bold">Categories</p>
                <Button
                  variant="link"
                  className="text-primary"
                  onClick={onClickReset}
                >
                  Reset
                </Button>
              </div>
              <ToggleGroup
                type="single"
                variant="outline"
                className="flex-wrap justify-start gap-2"
                value={selectedCategories}
                onValueChange={(value) => setSelectedCategories(value)}
              >
                {listCategories.map((category) => (
                  <ToggleGroupItem
                    key={category.id}
                    value={category.id.toString()}
                    className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                  >
                    {category.value}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
            <p className="hidden text-xl font-medium md:flex">Colors</p>
            <ToggleGroup
              type="single"
              variant="outline"
              className="flex-wrap justify-start gap-2"
              value={selectedColors}
              onValueChange={(value) => setSelectedColors(value)}
            >
              {listColors.map((color) => (
                <ToggleGroupItem
                  key={color.id}
                  value={color.id.toString()}
                  className="h-8 w-fit cursor-pointer gap-0 rounded-full border-2 px-0 data-[state=on]:bg-transparent data-[state=on]:ring-2 data-[state=on]:ring-primary"
                  style={{ backgroundColor: color.value }}
                >
                  <X
                    className={cn(
                      "ml-10 mr-1 hidden !h-5 !w-5 rounded-full bg-muted text-muted-foreground",
                      selectedColors === color.id.toString() && "inline-block",
                    )}
                  />
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <div className="my-5 flex flex-col gap-6 md:col-span-3">
            <div className="flex items-center justify-between gap-2">
              {/* Search bar */}
              <div className="flex overflow-hidden rounded-md border focus-within:ring-2 focus-within:ring-ring focus-within:ring-opacity-50 md:w-1/2">
                <Button variant="ghost" className="p-2">
                  <Search className="!h-5 !w-5" />
                  <span className="sr-only">Search</span>
                </Button>
                <Input
                  placeholder="Search ..."
                  className="border-none pl-1 text-lg outline-none placeholder:text-base focus-visible:ring focus-visible:ring-transparent"
                />
              </div>
              <Select>
                <SelectTrigger className="w-fit min-w-fit space-x-2 text-lg font-medium">
                  <span className="text-sm font-normal text-secondary-foreground">
                    Sort by
                  </span>
                  <SelectValue defaultValue="popular" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Popular</SelectItem>
                  <SelectItem value="priceDown">Price Down</SelectItem>
                  <SelectItem value="priceUp">Price Up</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ShopProducts
              color={selectedColors}
              category={selectedCategories}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ShopPage;
