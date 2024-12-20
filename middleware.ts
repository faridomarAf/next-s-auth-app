//import { auth } from "@/auth" it should be removed

//note we should modify our middleware regarding to our, becuase we doesnt use 'auth' where we clearly use the non-edge supported prismaAdapter. instead we should use the 'authConfig' to extract the 'auth' meddilware from it. so we should modify it as bellow by importing  'authConfig' from it auth.config.ts and 'NextAuth' from 'next-auth'
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "./routes";


const {auth} = NextAuth(authConfig);// now we use 'auth' like this everything should wrok as default
 
export default auth((req) => {
  const {nextUrl} = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if(isApiAuthRoute){
    return;// No action for API auth routes
  }

  if(isAuthRoute){
    if(isLoggedIn){
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return; // Allow the request to proceed
  }

  if(!isLoggedIn && !isPublicRoute){
    return Response.redirect(new URL('/login',nextUrl));
  }

  return; // Allow the request to proceed
})
 
// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}