import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
 
interface NavbarProps {
  headerList?: string[];
}

export const StickyNavbar: React.FC<NavbarProps> = ({
  headerList = [],
}) => {
  const [openNav, setOpenNav] = React.useState(false);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const NavList = () => {
    return (
      headerList && headerList.length > 0 && (
        <div className="mr-4 hidden lg:block">
          <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            {
              headerList.map((item, index) => {
                return (
                  <Typography
                    as="li"
                    variant="small"
                    color="blue-gray"
                    className="p-1 font-normal"
                    placeholder=""
                    key={`index-${index}`}
                  >
                    <a href="#" className="flex items-center">
                      {item}
                    </a>
                  </Typography>
                );
              })
            }
          </ul>
        </div>
      )
    )
  }
 
  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4" placeholder="">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium"
          placeholder=""
        >
          Simple Website
        </Typography>
        <div className="flex items-center gap-4">
          <NavList />
          <div className="flex items-center gap-x-1">
            <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block"
              placeholder=""
            >
              <span>Sign up</span>
            </Button>
            <Button
              variant="text"
              size="sm"
              className="hidden lg:inline-block"
              placeholder=""
            >
              <span>Log In</span>
            </Button>
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
            placeholder=""
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        <NavList />
        <div className="flex items-center gap-x-1">
          <Button fullWidth variant="text" size="sm" className="" placeholder="">
            <span>Log In</span>
          </Button>
          <Button fullWidth variant="gradient" size="sm" className="" placeholder="">
            <span>Sign in</span>
          </Button>
        </div>
      </Collapse>
    </Navbar>
  );
}