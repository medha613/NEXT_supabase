"use client"

import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";

import { useTransition } from "react";

export default function LangSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const { locale } = useParams();

    const [isPending, startTransition] = useTransition();

    const getNewPathWithLocale = (locale) => {
        const segments = pathname.split("/");

        const supportedLocales = ["en", "de"];
        const currentLocale = segments[1];

        if (supportedLocales.includes(currentLocale)) {
            segments[1] = locale;
        } else {
            segments.splice(1, 0, locale);
        }

        return segments.join("/") || "/";
    };

    const handleLangSwitch = (e) => {
        const newLocale = e.target.value;
        const newPath = getNewPathWithLocale(newLocale);

        startTransition(() => {
            router.replace(newPath);
        });
    };
    return (
        <>
            {isPending ? (
                <div>Loading.....</div>
            ) : (
                <div>
                    <label htmlFor="language-select" className="sr-only">Select label</label>
                    <select
                        id="language-select"
                        value={locale}
                        onChange={handleLangSwitch}
                        className=""
                    >
                        <option value="en">Eng</option>
                        <option value="de">De</option>

                    </select>
                </div>
            )}
        </>
    );
}


