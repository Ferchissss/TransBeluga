import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"
import Script from "next/script"

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Trans Beluga | Transporte de Cargas Bolivia",
  description:
    "Transporte interurbano de cargas y pasajeros con puntualidad, seguridad y calidez. Conectamos Bolivia con excelencia.",
  generator: "v0.app",
  icons: {
  icon: "/favicon.ico?v=2",
}
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geist.className} ${geistMono.className} font-sans antialiased`}>
        <div id="google_translate_element" style={{ display: 'none' }}></div>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
        <Analytics />
        <Script
          id="chatwoot-widget"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(d,t) {
                var BASE_URL="https://app.chatwoot.com";
                var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
                g.src=BASE_URL+"/packs/js/sdk.js";
                g.async = true;
                s.parentNode.insertBefore(g,s);
                g.onload=function(){
                  window.chatwootSDK.run({
                    websiteToken: 'KrLbEx4vySpzDKfQCR6WvCfd',
                    baseUrl: BASE_URL
                  })
                }
              })(document,"script");
            `,
          }}
        />

        <Script
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />

      <Script id="google-translate-init" strategy="afterInteractive">
  {`
    function googleTranslateElementInit() {
      new google.translate.TranslateElement({
        pageLanguage: 'es', 
        includedLanguages: 'en,es', 
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
      }, 'google_translate_element');
    }

    window.translatePage = function(lang) {
      var iframe = document.querySelector('.goog-te-menu-frame');
      if (!iframe) return;
      var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      var langSelector = iframeDoc.querySelector('select.goog-te-combo');
      if (langSelector) {
        langSelector.value = lang;
        langSelector.dispatchEvent(new Event('change'));
      }
    }
  `}
</Script>

      </body>
    </html>
  )
}
