import { NextResponse } from 'next/server'

export function middleware(request) {
  const cookie = request.cookies.get('jwt');

  const currentPath = request.nextUrl.pathname;

  if (currentPath.includes('panel') && cookie === undefined) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
  if (currentPath === '/auth/login' && cookie) {
    return NextResponse.redirect(new URL('/panel', request.url))
  }


  return NextResponse.next()
}