import Link from "next/link";
import { MouseEventHandler, useEffect } from "react";
import Logo from "./Logo";

interface MobileDrawerProps {
  onClose: MouseEventHandler<HTMLButtonElement>;
  isOpen: boolean;
}

const MobileDrawer = ({ isOpen, onClose }: MobileDrawerProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed flex flex-col items-center z-10 top-0 right-0 h-full w-full bg-black text-white transition-transform duration-300 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="relative mt-20">
        <Logo />
        <ul className="flex flex-col justify-center items-center space-y-14 mt-[80px]">
          <li className="text-3xl">
            <Link href="/">Home</Link>
          </li>
          <li className="text-3xl">
            <Link href="/">Home</Link>
          </li>
          <li className="text-3xl">
            <Link href="/">Home</Link>
          </li>
          <li className="text-3xl">
            <Link href="/">Home</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileDrawer;
