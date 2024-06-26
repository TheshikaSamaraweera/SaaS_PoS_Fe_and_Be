import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([/manager\/*/,            // Matches any route starting with "manager/"
  /branch-manager\/*/,     // Matches any route starting with "branch-manager/"
  /cashier\/*/,            // Matches any route starting with "cashier/"
  ]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
