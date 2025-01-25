import { Flex, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "@tanstack/react-router";
import { Logout } from "../logout/Logout.tsx";
import { ColorModeButton } from "./../ui/color-mode.tsx";

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
    <Flex
      as="nav"
      bg="teal.500"
      color="white"
      padding="4"
      alignItems="center"
      w="100%">
      <Flex
        gap={4}
        justifyContent="space-between"
        alignItems="center"
        w="100%">
        <Link
          as={RouterLink}
          marginRight="4"
          _active={{ fontWeight: "bold" }}>
          <RouterLink to="/"> Notes </RouterLink>
        </Link>
        <Flex
          gap={4}
          justifyContent="flex-end"
          alignItems="center">
          <ColorModeButton />
          <Link
            asChild
            _active={{ fontWeight: "bold" }}>
            <RouterLink to="/about"> About </RouterLink>
          </Link>
          <Link
            asChild
            _active={{ fontWeight: "bold" }}>
            <RouterLink to="/create"> Create </RouterLink>
          </Link>
          {user && <Logout />}
        </Flex>
      </Flex>
    </Flex>
  );
}
