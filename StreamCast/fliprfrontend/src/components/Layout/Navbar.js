import React, { useState } from "react";
import Image from "next/image";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars3Icon,
  ArrowLeftOnRectangleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/utils/Redux/UserSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import { Input } from "@material-tailwind/react";
import logo from "../../assets/logo.svg";
// profile menu component

function LoginOptions() {
  return (
    <div className="relative md:flex items-center">
      <Link href="/sign-up">
        <Button
          className="md:mx-4 w-full md:w-auto border-primary-100 text-primary-100 "
          variant="outlined"
        >
          Sign-up
        </Button>
      </Link>
      <Link href="/sign-in">
        <Button
          className="mx-0 my-4 md:my-0 w-full bg-primary-100 "
          variant="filled"
        >
          Sign-in
        </Button>
      </Link>
    </div>
  );
}

function ProfileMenu(props) {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const logoutUser = () => {
    localStorage.removeItem("user");
    window.open(`https://fipr-backend.onrender.com/auth/logout`, "_self");
    dispatch(setUser(null));
  };
  const gotodashboard = () => {
    window.open("/dashboard", "_self");
  };
  const gototfav = () => {
    alert("go to favourites");
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <div className="p-2">{props.user.name}</div>
          <Avatar
            variant="circular"
            size="sm"
            alt="candice wu"
            className="border border-blue-500 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        <MenuItem
          key="Dashboard"
          onClick={() => {
            closeMenu();
            gotodashboard();
          }}
          className={`flex items-center gap-2 rounded`}
        >
          {React.createElement(UserCircleIcon, {
            className: `h-4 w-4`,
            strokeWidth: 2,
          })}
          <Typography
            as="span"
            variant="small"
            className="font-normal"
            color="inherit"
          >
            Dashboard
          </Typography>
        </MenuItem>
        {/* <MenuItem
          key="Favourites"
          onClick={() => {
            closeMenu();
            gototfav();
          }}
          className={`flex items-center gap-2 rounded`}
        >
          {React.createElement(HeartIcon, {
            className: `h-4 w-4`,
            strokeWidth: 2,
          })}
          <Typography
            as="span"
            variant="small"
            className="font-normal"
            color="inherit"
          >
            Favourites
          </Typography>
        </MenuItem> */}
        <MenuItem
          key="Sign-Out"
          onClick={() => {
            closeMenu();
            logoutUser();
          }}
          className={`flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10`}
        >
          {React.createElement(ArrowLeftOnRectangleIcon, {
            className: `h-4 w-4 text-red-500`,
            strokeWidth: 2,
          })}
          <Typography
            as="span"
            variant="small"
            className="font-normal"
            color="red"
          >
            Sign-Out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default function ComplexNavbar() {
  const dispatch = useDispatch();
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
  const user = useSelector((state) => state.UserSlice);
  const [searchText, setSearchText] = useState("");

  // const userDataHandler = () => {
  //     dispatch(setUser("Hello World"));
  // }

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <div className=" p-2   rounded-none  bg-primary-900 border-b-2 border-primary-200 pb-5 ">
      <div className="relative mx-auto flex justify-between items-end text-blue-gray-900">
        <Link href="/" className="flex items-center">
          <Image
            alt="logo"
            src={logo}
            width={40}
            height={40}
            className="mr-2"
          />
          <p className="text-white text-xl">BuzzTalk</p>
        </Link>

        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 md:hidden"
        >
          <Bars3Icon className="h-6 w-6" />
        </IconButton>
        <div className="hidden relative md:flex w-1/2">
          <Input
            type="text"
            placeholder="Search Podcasts"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            className="pr-20 bg-primary-500 border-2 outline-none border-primary-100 focus:!border-primary-200 text-white "
            containerProps={{
              className: "min-w-0 ",
            }}
          />
          <Button
            size="sm"
            className="!absolute right-1 top-1 rounded bg-primary-100 "
          >
            <Link href={`/search/${searchText}`}>
              <MagnifyingGlassIcon className="h-4 w-5" strokeWeight="1" />
            </Link>
          </Button>
        </div>
        <div className="hidden relative md:flex items-center">
          {user ? <ProfileMenu user={user} /> : <LoginOptions />}
        </div>
      </div>
      <MobileNav open={isNavOpen} className="">
        <div className="relative flex w-full my-5">
          <Input
            type="text"
            placeholder="Search Podcasts"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            className="pr-20 bg-primary-500 border-2 outline-none border-primary-100 focus:!border-primary-200 text-white "
            containerProps={{
              className: "min-w-0 ",
            }}
          />
          <Button
            size="sm"
            className="!absolute right-1 top-1 rounded bg-primary-100 "
          >
            <Link href={`/search/${searchText}`}>
              <MagnifyingGlassIcon className="h-4 w-5" strokeWeight="1" />
            </Link>
          </Button>
        </div>
        <div className="relative md:flex md:flex-col items-center">
          {user ? <ProfileMenu user={user} /> : <LoginOptions />}
        </div>
      </MobileNav>
    </div>
  );
}
