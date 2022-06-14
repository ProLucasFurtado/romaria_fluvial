import { Tooltip, Link as ChakraLink, Text, Icon, } from "@chakra-ui/react";
import Router from "next/router";
import { ElementType, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { ActiveLink } from "../ActiveLink";

interface NavLinkProps {
    label: string;
    url: string;
    icon: ElementType;
    color: string;
}

export function NavLink({ label, url, icon, color }: NavLinkProps) {
    const { menuOpen } = useContext(UserContext);

    return (
        <ActiveLink href={url} passHref>
            <ChakraLink display="flex">
                <Icon as={icon} fontSize="20" />
                {menuOpen && <Text ml="4" fontWeight="medium">
                    {label}
                </Text>}
            </ChakraLink>
        </ActiveLink>
    )
}