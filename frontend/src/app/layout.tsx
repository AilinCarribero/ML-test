import type { Metadata } from "next"
import Image from "next/image"
import logoML from "../../public/imgs/logo-ml.svg"
import localFont from "next/font/local"
import { Buscador } from "./components"
import Link from "next/link"

import '@fortawesome/fontawesome-svg-core/styles.css'
import "../styles/global.scss"

const proximaNova = localFont({
  src: [{
    path: '../../public/fonts/proximanova_regular.ttf',
    weight: '400',
    style: 'normal'
  }]
})

export const metadata: Metadata = {
  title: "Mercado Libre - FontEnd Test"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={proximaNova.className}>
        <div className="navbar-content">
          <Link href={'/'} className="logo-content">
            <Image src={logoML} alt="Mercado Libre" width={50} height={undefined} />
          </Link>
          <div className="buscador-content">
            <Buscador />
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
