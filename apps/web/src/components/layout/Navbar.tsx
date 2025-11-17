import { auth } from "@clerk/nextjs/server";
import NavbarCLient from "./NavbarClient";

export async function Navbar() {
  const { userId } = await auth();
  return <NavbarCLient userId={userId} />;
}
