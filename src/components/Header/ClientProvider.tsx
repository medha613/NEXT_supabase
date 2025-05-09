"use client";


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextIntlClientProvider } from "next-intl";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReduxProvider } from "@/redux/provider";
import { CartModalProvider } from "@/app/context/CartSidebarModalContext";
import { ModalProvider } from "@/app/context/QuickViewModalContext";
import { PreviewSliderProvider } from "@/app/context/PreviewSliderContext";
import QuickViewModal from "../Common/QuickViewModal";
import CartSidebarModal from "../Common/CartSidebarModal";
import PreviewSliderModal from "../Common/PreviewSlider";
import Header from "../../components/Header";
import ScrollToTop from "../Common/ScrollToTop";
import Footer from "../Footer";


export default function ClientProvider({ children, locale, messages }) {
    // const [queryClient] = useState(() => new QueryClient());
    return (
        <>
            <NextIntlClientProvider locale={locale} messages={messages} timeZone="UTC" >
                {/* <QueryClientProvider client={queryClient}> */}
                <ReduxProvider>
                    <CartModalProvider>
                        <ModalProvider>
                            <PreviewSliderProvider>
                                <Header />
                                {children}

                                <QuickViewModal />
                                <CartSidebarModal />
                                <PreviewSliderModal />
                            </PreviewSliderProvider>
                        </ModalProvider>
                    </CartModalProvider>
                </ReduxProvider>
                {/* </QueryClientProvider> */}
            </NextIntlClientProvider>
            {/* <ReactQueryDevtools /> */}
            <ScrollToTop />
            <Footer />
        </>
    );
}
