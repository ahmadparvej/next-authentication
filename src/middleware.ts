import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { protectedRoute, publicRoute } from './routes';
 
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt"

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const token = await getToken({req: request})
    const url = request.nextUrl;

    console.log(token)

    if(!token && url.pathname.startsWith("/dashboard")){
        return NextResponse.redirect( new URL('/sign-up', request.url))
    }

    return
}
 
// See "Matching Paths" below to learn more
export const config = {
    matcher: [
      '/',
      '/sign-in',
      '/sign-up',
      '/dashboard/:path*',
    ],
  }