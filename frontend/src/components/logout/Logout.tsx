import { Button } from "@chakra-ui/react";

export function Logout() {
   
    return (
        <Button colorPalette='gray' variant='solid' asChild >
            <a href="/api/logout"> logOut</a>
        </Button>
    )
}