// import { NextResponse } from 'next/server'
// import { getUser } from "@/services/authoriza"

// export async function middleware(request) {
//     // ตรวจสอบว่ามีผู้ใช้ล็อกอินอยู่หรือไม่
//     const user = await getUser();
//     if (!user) {
//         // หากไม่มีผู้ใช้ล็อกอิน ให้ redirect ไปที่หน้าหลัก
//         return NextResponse.redirect(new URL('/', request.url))
//     }
// }

// export const config = {
//   matcher: ['/user/account/order', '/user/account/information', '/user/account/information/editAccount', '/user/account/information/editPassword'],
// }