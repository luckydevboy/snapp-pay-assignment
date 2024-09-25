import { Link } from "react-router-dom";
import { Button, Sheet, SheetContent, SheetTrigger } from "@/components/ui";
import { MenuIcon } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NavLinks = () => (
    <>
      <Link to="/" className="transition-colors hover:text-foreground/80">
        Home
      </Link>
    </>
  );

  return (
    <header className="container mx-auto flex h-14 items-center sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mr-4 hidden md:flex">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <span className="hidden font-bold sm:inline-block">Contacts</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <NavLinks />
        </nav>
      </div>
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          >
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0">
          <nav className="flex flex-col gap-4 text-lg font-medium">
            <NavLinks />
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
