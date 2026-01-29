// import { i18nRouter } from "next-i18n-router";
// import { NextResponse } from "next/server";
// import i18nConfig from "../i18nConfig";
// import { authRoutes, protectedRoutes } from "./router/routes";

// export function middleware(request) {
//   const { pathname } = request.nextUrl;

//   // 🚫 Never touch Next.js internals
//   if (
//     pathname.startsWith("/_next") ||
//     pathname.startsWith("/api") ||
//     pathname.includes(".")
//   ) {
//     return NextResponse.next();
//   }

//   const currentUser = request.cookies.get("USER")?.value;

//   if (protectedRoutes.includes(pathname) && !currentUser) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   if (authRoutes.includes(pathname) && currentUser) {
//     return NextResponse.redirect(new URL("/feed", request.url));
//   }

//   if (pathname === "/sw.js" || pathname === "/workbox-*.js") {
//     return NextResponse.next();
//   }


//   if (
//     pathname.includes("/admin") &&
//     (!currentUser || JSON.parse(currentUser).is_admin !== true)
//   ) {
//     return NextResponse.redirect(new URL("/feed", request.url));
//   }

//   return i18nRouter(request, i18nConfig);
// }


// // applies this middleware only to files in the app directory
// export const config = {
//   matcher: [
//     '/((?!_next/static|_next/image|api|favicon.ico|.*\\..*).*)',
//   ],
// };


import { NextResponse } from "next/server";
import { authRoutes, protectedRoutes } from "./router/routes";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // 🚫 Never touch Next.js internals or static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/sw.js" ||
    pathname.startsWith("/workbox-")
  ) {
    return NextResponse.next();
  }

  const currentUser = request.cookies.get("USER")?.value;

  // Parse current user once
  let parsedUser = null;
  if (currentUser) {
    try {
      parsedUser = JSON.parse(currentUser);
    } catch (error) {
      // Invalid JSON in cookie, clear it
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("USER");
      return response;
    }
  }

  // Redirect unauthenticated users from protected routes
  if (protectedRoutes.includes(pathname) && !parsedUser) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect authenticated users from auth routes
  if (authRoutes.includes(pathname) && parsedUser) {
    return NextResponse.redirect(new URL("/feed", request.url));
  }

  // Redirect non-admin users from admin routes
  if (pathname.includes("/admin") && (!parsedUser || parsedUser.is_admin !== true)) {
    return NextResponse.redirect(new URL("/feed", request.url));
  }

  return NextResponse.next();
}

// applies this middleware only to files in the app directory
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|api|favicon.ico|.*\\..*).*)',
  ],
};