"use client";
import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Button } from "../ui/button";
import { ArrowRightIcon, LogInIcon } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

const features: { title: string; href: string; description: string }[] = [
  {
    title: "Ai Generation",
    href: "/docs/primitives/alert-dialog",
    description: "Generate forms instantly using natural language.",
  },
  {
    title: "Templates",
    href: "/docs/primitives/hover-card",
    description: "Start with pre-built templates for common scenarios",
  },
  {
    title: "Customization",
    href: "/docs/primitives/progress",
    description: "Customize every aspect of your forms.",
  },
  {
    title: "Analysis",
    href: "/docs/primitives/scroll-area",
    description: "Get insights from your form responses",
  },
];

const resources: { title: string; href: string; description: string }[] = [
  {
    title: "Documentation",
    href: "/docs/primitives/alert-dialog",
    description: "Learn how to use formGPT effectively.",
  },
  {
    title: "API Reference",
    href: "/docs/primitives/hover-card",
    description: "Integrate formGPT into your applications",
  },
  {
    title: "Customization",
    href: "/docs/primitives/progress",
    description: "Customize every aspect of your forms.",
  },
  {
    title: "Examples",
    href: "/docs/primitives/scroll-area",
    description: "See formGPT in action with real examples",
  },
];

export const Header = () => {
  const { user, signInWithGoogle } = useAuth();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-500">
      <nav className="flex h-16 items-center px-6">
        <Link href="/" className="text-white mr-8 font-bold text-xl flex items-center space-x-2">
          form<span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">GPT</span>
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-white">Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {features.map((feature) => (
                    <ListItem key={feature.title} title={feature.title} href={feature.href}>
                      {feature.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-white">Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px]">
                  {resources.map((resource) => (
                    <ListItem key={resource.title} title={resource.title} href={resource.href}>
                      {resource.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto">
          {user ? (
            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-purple-500/35">
                Dashboard
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35" onClick={signInWithGoogle}>
              Login
              <LogInIcon className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a ref={ref} className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground", className)} {...props}>
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
