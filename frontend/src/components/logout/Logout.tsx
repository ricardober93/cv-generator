import { RiLogoutBoxRLine } from "react-icons/ri"

export function Logout() {
  return <a
    href="/api/logout"
    className="font-bold rounded-lg px-4 py-2 bg-zinc-800 text-white justify-center cursor-pointer">
    <RiLogoutBoxRLine className="inline-block mr-2" />
    Logout
  </a>;
}
