import Image from "next/image";

import { SignUpForm } from "@/components/sign-up/Form";

const SignUp = () => {
  return (
    <div className="w-full lg:grid lg:grid-cols-2">
      <SignUpForm />
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

export default SignUp;
