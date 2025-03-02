export { auth as middleware } from "@/lib/auth";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/create-invoice/:path*",
    "/customers/:path*",
    "/invoices/:path*",
    "/api/:path*",
    "/analytics/:path*",
  ],
};
