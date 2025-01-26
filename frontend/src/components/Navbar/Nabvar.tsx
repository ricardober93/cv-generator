
import { Link as RouterLink } from "@tanstack/react-router";
import { Logout } from "../logout/Logout.tsx";
import { ColorModeButton } from "@components/colorMode/color-mode.tsx";

export function Navbar({
  user,
}: {
  user: {
    picture: null | string;
    family_name: string;
    given_name: string;
    email: string;
    id: string;
  } | null;
}) {
  return (
    <nav
    className="bg-teal-500 text-white p-4 flex items-center w-full">

      <div className="flex items-center justify-between w-full gap-4">

          <RouterLink className="mr-4  " to="/"> Notes </RouterLink>

        <div className="flex items-center gap-4">

          <ColorModeButton />

            <RouterLink className="active:font-bold" to="/about"> About </RouterLink>

            <RouterLink to="/create"> Create </RouterLink>

          {user && <Logout />}
        </div>
      </div>
    </nav>
  );
}
