import { MouseEventHandler } from "react";
import { Cross as Hamburger } from "hamburger-react";

interface MobileMenuButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const MobileMenuButton = ({ onClick }: MobileMenuButtonProps) => {
  return (
    <button className="z-20" onClick={onClick}>
      <Hamburger />
    </button>
  );
};

export default MobileMenuButton;
