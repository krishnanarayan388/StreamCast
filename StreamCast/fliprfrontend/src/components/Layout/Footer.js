import { Typography } from "@material-tailwind/react";
import logo from "../../assets/logo.svg";
import Image from "next/image";
 
export default function Footer() {
  return (
    <footer className="w-full  pt-12 pb-48 ">
      <hr className="my-8 border-primary-100" />
      <div className="flex">
        <Image
            alt="logo"
            src={logo}
            width={40}
            height={40}
            className="mr-2"
          />
        <p className="text-white text-xl">BuzzTalk</p>
        </div>
      <Typography color="white" className="text-center font-normal">
        &copy; 2023 Buzz Talk. All rights reserved.
      </Typography>
    </footer>
  );
}