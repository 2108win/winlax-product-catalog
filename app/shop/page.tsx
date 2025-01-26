"use client";
import ShopHero from "@/components/layouts/Shop/ShopHero";
import ShopProducts from "@/components/layouts/Shop/ShopProducts";
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
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import { useState } from "react";

function ShopPage() {
  const [selectedCategories, setSelectedCategories] = useState<string>();
  const [selectedColors, setSelectedColors] = useState<string>();
  const onClickReset = () => {
    setSelectedColors("");
    setSelectedCategories("");
  };
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
                <ToggleGroupItem
                  value="A"
                  className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                >
                  Shoes
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="b"
                  className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                >
                  Jackets
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="c"
                  className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                >
                  Pants
                </ToggleGroupItem>
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
              <ToggleGroupItem
                value="black"
                className="h-8 w-fit cursor-pointer gap-0 rounded-full border-2 px-0 data-[state=on]:bg-transparent data-[state=on]:ring-2 data-[state=on]:ring-primary"
                style={{ backgroundColor: "black" }}
              >
                <X
                  className={cn(
                    "ml-10 mr-1 hidden !h-5 !w-5 rounded-full bg-muted text-muted-foreground",
                    selectedColors === "black" && "inline-block",
                  )}
                />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="white"
                className="h-8 w-fit cursor-pointer gap-0 rounded-full border-2 px-0 data-[state=on]:bg-transparent data-[state=on]:ring-2 data-[state=on]:ring-primary"
                style={{ backgroundColor: "white" }}
              >
                <X
                  className={cn(
                    "ml-10 mr-1 hidden !h-5 !w-5 rounded-full bg-muted text-muted-foreground",
                    selectedColors === "white" && "inline-block",
                  )}
                />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="red"
                className="h-8 w-fit cursor-pointer gap-0 rounded-full border-2 px-0 data-[state=on]:bg-transparent data-[state=on]:ring-2 data-[state=on]:ring-primary"
                style={{ backgroundColor: "red" }}
              >
                <X
                  className={cn(
                    "ml-10 mr-1 hidden !h-5 !w-5 rounded-full bg-muted text-muted-foreground",
                    selectedColors === "red" && "inline-block",
                  )}
                />
              </ToggleGroupItem>
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

            <ShopProducts />
          </div>
        </div>
      </div>
    </>
  );
}

export default ShopPage;
