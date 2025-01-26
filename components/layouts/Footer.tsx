import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const FooterLinks = [
  {
    title: "Shop",
    links: [
      { name: "Men’s", href: "/shop/" },
      { name: "Kids’", href: "/shop/" },
      { name: "Shoes", href: "/shop/" },
      { name: "Equipment", href: "/shop/" },
      { name: "By Activity", href: "/shop/" },
      { name: "Gift Cards", href: "/shop/" },
      { name: "Sale", href: "/shop/" },
    ],
  },
  {
    title: "Help",
    links: [
      { name: "Help Center", href: "/help/" },
      { name: "Order Status", href: "/help/" },
      { name: "Size Chart", href: "/help/" },
      { name: "Returns & Warranty", href: "/help/" },
      { name: "Contact Us", href: "/help/" },
    ],
  },
  {
    title: "About",
    links: [
      { name: "About Us", href: "/about/" },
      { name: "Responsibility", href: "/about/" },
      { name: "Technology & Innovation", href: "/about/" },
      { name: "Explore our stories", href: "/about/" },
    ],
  },
];

function Footer() {
  return (
    <div className="w-full bg-secondary">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 px-4 py-8 text-secondary-foreground md:grid-cols-2 md:gap-8 lg:grid-cols-5">
        <div className="flex flex-col gap-4 md:col-span-2">
          <p className="text-4xl font-bold">Sign up for our newsletter</p>
          <p className="text-sm text-secondary-foreground">
            Be the first to know about our special offers, new product launches,
            and events
          </p>
          <div className="flex w-fit items-center rounded-md border-2 outline-none ring-0">
            <Input
              placeholder="Enter your email"
              className="max-w-52 border-none text-lg outline-none focus-visible:ring focus-visible:ring-transparent"
            />
            <Button variant="ghost">Subscribe</Button>
          </div>
        </div>
        {FooterLinks.map((group) => (
          <div key={group.title} className="flex flex-col gap-2">
            <p className="font-bold">{group.title}</p>
            <ul className="gap-2 text-sm font-medium text-secondary-foreground">
              {group.links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:underline">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto flex w-full items-center bg-primary/10 p-4">
        <Link
          href="https://winlax.id.vn"
          className="max-w-7xl font-bold hover:underline"
          target="_blank"
        >
          @win_lax
        </Link>
      </div>
    </div>
  );
}

export default Footer;
