import Link from "next/link";

const DesktopNavLinks = () => {
  return (
    <ul className="absolute right-0 flex flex-row space-x-6">
      <li className="text-xl hover:text-blue-900 hover:font-semibold">
        <Link href="/">Home</Link>
      </li>
    </ul>
  );
};

export default DesktopNavLinks;
