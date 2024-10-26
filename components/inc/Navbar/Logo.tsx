import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  height?: number;
  width?: number;
}

const Logo = ({ height, width }: LogoProps) => {
  return (
    <Link href="/">
      <Image
        alt="FLOORTASY Logo"
        className="cursor-pointer"
        height={height ? height : 100}
        width={width ? width : 100}
        src="/images/logo/logo.svg"
      />
    </Link>
  );
};

export default Logo;
