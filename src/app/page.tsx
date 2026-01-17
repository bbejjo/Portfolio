import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n/translations";

export default async function Home() {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("locale")?.value;
  const nextLocale =
    cookieLocale === "ka" || cookieLocale === "en"
      ? cookieLocale
      : defaultLocale;

  redirect(`/${nextLocale}`);
}
