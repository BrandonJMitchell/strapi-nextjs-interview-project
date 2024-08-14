"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection,
} from "@nextui-org/autocomplete";
import { useAsyncList } from "@react-stately/data";
import { useRouter } from "next/navigation";
import React from "react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon, Logo } from "@/components/icons";
import { fetchBlogs } from "@/lib/fetchBlogs";
import { fetchVideos } from "@/lib/fetchVideos";

export const Navbar = () => {
  const router = useRouter();
  const [value, setValue] = React.useState("");
  const [selectedKey, setSelectedKey] = React.useState(null);

  const onSelectionChange = (id) => {
    setSelectedKey(id);
    const [prefix, idNbr] = id.split("-");

    // Navigate to the details page with query parameters
    if (prefix === "blog") {
      router.push(`/blogDetail/${idNbr}`);
    } else {
      router.push(`/videoDetail/${idNbr}`);
    }
  };

  const onInputChange = (value) => {
    setValue(value);
  };

  let allBlogs = useAsyncList({
    async load({ signal }) {
      let res = await fetchBlogs(signal);

      return {
        items: res,
      };
    },
  });

  let allVideos = useAsyncList({
    async load({ signal }) {
      let res = await fetchVideos(signal);

      return {
        items: res,
      };
    },
  });

  let autoComplete = (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Autocomplete
        className="max-w-xs"
        label="Search..."
        onInputChange={onInputChange}
        onSelectionChange={onSelectionChange}
      >
        <AutocompleteSection showDivider title="Blogs">
          {allBlogs.items.map((item) => (
            <AutocompleteItem key={`blog-${item.id}`} textValue={item.title}>
              {item.id} : {item.title}
            </AutocompleteItem>
          ))}
        </AutocompleteSection>
        <AutocompleteSection showDivider title="Videos">
          {allVideos.items.map((item) => (
            <AutocompleteItem key={`video-${item.id}`} value={item.title}>
              {item.id} : {item.title}
            </AutocompleteItem>
          ))}
        </AutocompleteSection>
      </Autocomplete>
    </div>
  );

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">PSCU</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{autoComplete}</NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>
    </NextUINavbar>
  );
};
