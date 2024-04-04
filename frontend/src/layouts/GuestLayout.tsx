import { ReactNode } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function GuestLayout({
  title,
  children,
  description,
}: {
  title?: string;
  children: ReactNode;
  description?: string;
}) {
  return (
    <HelmetProvider>
      <div className="grid place-items-center h-screen">
        <Helmet>
          {title ? <title>{title}</title> : ""}
          {description ? <meta name="description" content={description} /> : ""}
        </Helmet>
        <main className="w-full max-w-md ">{children}</main>
      </div>
    </HelmetProvider>
  );
}
