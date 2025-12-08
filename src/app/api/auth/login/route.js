// import { NextResponse } from 'next/server';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
// import { auth, db } from '@/firebaseConfig';

// export async function POST(request) {
//     try {
//         const body = await request.json();
//         const { email, password } = body;
//         const userCredential = await signInWithEmailAndPassword(auth, email, password);
//         const { user } = userCredential;
//         const userRef = doc(db, "users", user.uid);
//         const userSnap = await getDoc(userRef);
//         if (!userSnap.exists()) {
//             await setDoc(userRef, {
//                 email: user.email,
//                 createdAt: serverTimestamp(),
//                 updatedAt: serverTimestamp(),
//                 uid: user.uid,
//                 role: "admin",
//             });
//         } else {
//             await updateDoc(userRef, {
//                 updatedAt: serverTimestamp(),
//             });
//         }
//         const token = await user.getIdToken();
//         const res = NextResponse.json(
//             { success: true, data: { uid: user.uid, email: user.email, token, role: 'admin' } },
//             { status: 200 }
//         );
//         res.cookies.set("authToken", token, {
//             httpOnly: true,
//             secure: true,
//             sameSite: "strict",
//             path: "/",
//             maxAge: 60 * 60,
//         });
//         return res;
//     } catch (error) {
//         console.error("Login API Error:", error);
//         return NextResponse.json(
//             {
//                 success: false,
//                 error: error.message || "Firebase login failed",
//             },
//             { status: 500 }
//         );
//     }
// }


import { NextResponse } from "next/server";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import admin from "@/firebaseAdmin";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        // Step 1: Verify password using CLIENT SDK
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Step 2: Get Firestore user doc
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        let userData = { uid: user.uid, email: user.email, role: "admin" };

        if (!userSnap.exists()) {
            // If user doesn't exist, set doc
            await setDoc(userRef, {
                email: user.email,
                uid: user.uid,
                role: "admin",
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });
        } else {
            // If exists, update the updatedAt timestamp
            await updateDoc(userRef, {
                updatedAt: serverTimestamp(),
            });
            userData = { ...userData, ...userSnap.data() };
        }

        // Step 3: Create secure custom token
        const token = await admin.auth().createCustomToken(user.uid);

        const res = NextResponse.json(
            { success: true, data: { ...userData, token } },
            { status: 200 }
        );

        // Set cookie
        res.cookies.set("authToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60,
        });

        return res;

    } catch (error) {
        console.error("Login API Error:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Login failed" },
            { status: 500 }
        );
    }
}

