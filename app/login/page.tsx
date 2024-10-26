import { SignInForm } from "@/components/login/Form";
import Image from "next/image";

const SignIn = () => {
  return (
    <div className="w-full lg:grid lg:grid-cols-2">
      <SignInForm />
      <div className="hidden bg-muted md:block w-full h-full relative rounded-xl">
        <Image
          src="/images/login/slide6.png"
          alt="Image"
          fill
          className="h-full w-full object-cover rounded-xl"
        />
      </div>
    </div>
  );
};

export default SignIn;
