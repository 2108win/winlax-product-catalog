"use client";
import { useEffect, useState } from "react";

export const Formatter = new Intl.NumberFormat("en-EN", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 3,
  style: "currency",
  currency: "USD",
});

interface CurrencyProps {
  value: string | number;
  className?: string;
}

const Currency: React.FC<CurrencyProps> = ({ value, className }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className={`w-fit font-semibold ${className}`}>
      {Formatter.format(Number(value))}
    </div>
  );
};

export default Currency;
