import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { ROUTE } from "./shared/constants/routes";

export default async function middleware(req: NextRequest) {
	const cookieStore = await cookies();
	const token = cookieStore.get('token')?.value;

	const isAuthPage = req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/registration";

	if (!token && !isAuthPage) {
		return NextResponse.redirect(new URL(ROUTE.LOGIN, req.nextUrl));
	}

	return NextResponse.next()
}

export const config = { 
  matcher: ['/((?!login|registration|api|_next/static|_next/image|favicon.ico).*)'] 
}; 
