"use client";

import { useState } from "react";
import Logo from "./Navbar/Logo";
import DesktopNavLinks from "./Navbar/DesktopNavLinks";
import MobileMenuButton from "./Navbar/MobileMenuButton";
import MobileDrawer from "./Navbar/MobileDrawer";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="container mx-auto">
      <div className="hidden relative py-6 sm:flex flex-col justify-center">
        <Logo />
        <DesktopNavLinks />
      </div>
      <div className="sm:hidden relative flex flex-row justify-between items-center my-4">
        <Logo height={80} width={80} />
        <MobileMenuButton onClick={handleDrawerToggle} />
        <MobileDrawer isOpen={isDrawerOpen} onClose={handleDrawerToggle} />
      </div>
    </div>
  );
};

export default Navbar;
