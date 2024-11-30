import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Extract token from cookies
  const token = request.cookies.get("next-auth.session-token");
  console.log(token);
  // Require token for GET and other methods
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Optionally: Parse the token if it's a JSON Web Token (JWT) or handle it as needed
  // For example, you could decode it here if it's a JWT

  //   try {
  //     const decodedToken = JSON.parse(token.value); // Example: if it's a JSON stringified token
  // console.log(decodedToken);
  //     if (decodedToken.role !== "ADMIN") {
  //       return NextResponse.redirect(new URL("/myProducts", request.url));
  //     }
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   } catch (error) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }

  return NextResponse.next();
}

// Matching specific paths
export const config = {
  matcher: [
    "/((?!\\/).*)", // This matches all routes except the root "/"
  ],
};
