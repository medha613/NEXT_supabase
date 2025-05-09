
import "../css/euclid-circular-a-font.css";
import "../css/style.css";

import { hasLocale } from "next-intl";
import { notFound} from "next/navigation";
import { routing } from "@/i18n/routing";
import { LangChangeHandler } from "@/components/Header/LangChangeHandler";
import ClientProvider from "@/components/Header/ClientProvider";

export default async function RootLayout({
  children, params
}: {
  children: React.ReactNode;
  params: { locale: string }
}) {

  const { locale } = await params;

  const messages = (await import(`../../../messages/${locale}.json`)).default;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <LangChangeHandler />
      <body>
        <ClientProvider locale={locale} messages={messages}>{children} </ClientProvider>
      </body>
    </html>
  );
}
