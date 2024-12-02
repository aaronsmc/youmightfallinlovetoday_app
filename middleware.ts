import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)', 
  '/sign-up(.*)',
  '/welcome(.*)'
])

export default clerkMiddleware(async (auth, request) => {
  console.log("Middleware running for path:", request.url);
  console.log("Is public route?", isPublicRoute(request));
  
  if (!isPublicRoute(request)) {
    console.log("Protected route - enforcing auth");
    await auth.protect();
  } else {
    console.log("Public route - allowing access");
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}