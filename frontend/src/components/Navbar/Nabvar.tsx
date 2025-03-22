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
    <nav className="bg-base-100 dark:bg-base-200 text-primary-content p-4 flex items-center w-full">
      <div className="flex items-center justify-between w-full gap-4">
        <RouterLink
          activeProps={{ className: "font-bold" }}
          className="mr-4 hover:font-bold font-medium"
          to="/">
          {" "}
          CV Generator{" "}
        </RouterLink>

        <div className="flex items-center gap-4">
          <ColorModeButton />

          <RouterLink
            className="hover:font-bold"
            activeProps={{ className: "font-bold" }}
            to="/create">
            {" "}
            Create{" "}
          </RouterLink>

          {user && <Logout />}
        </div>
      </div>
    </nav>
  );
}
