import { NextResponse } from "next/server";
import { adminDb } from "@/firebaseAdmin";
import { PAGESIZE } from "@/constants/constants";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const lastDocId = searchParams.get('lastDocId');
        const pageSize = parseInt(searchParams.get('pageSize') || PAGESIZE);

        const restaurantsRef = adminDb.collection('restaurants');
        
        // Parse status properly
        let statusValue = null;
        if (status === 'true') statusValue = true;
        else if (status === 'false') statusValue = false;
        else if (status === 'null') statusValue = null;

        // Base query
        let baseQuery = restaurantsRef.where('documentsVerified', '==', statusValue);
        
        // Get total count (parallel)
        const countPromise = baseQuery.count().get();
        
        // Build paginated query
        let dataQuery = baseQuery.orderBy('createdAt', 'desc').limit(pageSize);
        
        if (lastDocId) {
            const lastDocRef = await restaurantsRef.doc(lastDocId).get();
            if (lastDocRef.exists) {
                dataQuery = baseQuery
                    .orderBy('createdAt', 'desc')
                    .startAfter(lastDocRef)
                    .limit(pageSize);
            }
        }
        
        // Execute both queries in parallel
        const [countSnapshot, querySnapshot] = await Promise.all([
            countPromise,
            dataQuery.get()
        ]);
        
        const totalCount = countSnapshot.data().count;
        
        // Get restaurants with user data (parallel)
        const restaurants = await Promise.all(
            querySnapshot.docs.map(async (doc) => {
                const data = doc.data();
                let userData = null;
                
                if (data.userId) {
                    try {
                        const userDoc = await adminDb.collection('users').doc(data.userId).get();
                        if (userDoc.exists) {
                            userData = userDoc.data();
                        }
                    } catch (err) {
                        console.warn(`User not found: ${data.userId}`);
                    }
                }
                
                return {
                    restaurantId: doc.id,
                    ...data,
                    user: userData,
                };
            })
        );
        
        const lastVisible = querySnapshot.docs.length > 0 
            ? querySnapshot.docs[querySnapshot.docs.length - 1].id 
            : null;
        
        return NextResponse.json({
            success: true,
            data: {
                restaurants,
                lastVisible,
                totalCount,
                hasMore: querySnapshot.docs.length === pageSize
            }
        });
    } catch (error) {
        console.error("Get Restaurants API Error:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error", error: error.message },
            { status: 500 }
        );
    }
}

// ==========================================
// 2. GET RESTAURANT BY ID
// app/api/admin/restaurants/[id]/route.js
// ==========================================

// import { NextResponse } from "next/server";
// import { adminDb } from "@/firebaseAdmin";

// export async function GET(request, { params }) {
//     try {
//         const { id: restaurantId } = params;
        
//         // Get restaurant document
//         const restaurantDoc = await adminDb.collection('restaurants').doc(restaurantId).get();
        
//         if (!restaurantDoc.exists) {
//             return NextResponse.json(
//                 { success: false, message: "Restaurant not found" },
//                 { status: 404 }
//             );
//         }
        
//         const restaurantData = restaurantDoc.data();
        
//         // Fetch all related data in parallel
//         const [
//             userData,
//             cuisines,
//             restaurantTypes,
//             deliveryRange,
//             deliveryRulesData,
//             foodTypeServe
//         ] = await Promise.all([
//             // User data
//             restaurantData.userId 
//                 ? adminDb.collection('users').doc(restaurantData.userId).get()
//                     .then(doc => doc.exists ? doc.data() : null)
//                     .catch(() => null)
//                 : Promise.resolve(null),
            
//             // Cuisines
//             Array.isArray(restaurantData.cuisines) && restaurantData.cuisines.length > 0
//                 ? Promise.all(
//                     restaurantData.cuisines.map(async (ref) => {
//                         try {
//                             const snap = await ref.get();
//                             return snap.exists ? { id: snap.id, ...snap.data() } : null;
//                         } catch {
//                             return null;
//                         }
//                     })
//                 ).then(data => data.filter(Boolean))
//                 : Promise.resolve([]),
            
//             // Restaurant types
//             Array.isArray(restaurantData.restaurantType) && restaurantData.restaurantType.length > 0
//                 ? Promise.all(
//                     restaurantData.restaurantType.map(async (ref) => {
//                         try {
//                             const snap = await ref.get();
//                             return snap.exists ? { id: snap.id, ...snap.data() } : null;
//                         } catch {
//                             return null;
//                         }
//                     })
//                 ).then(data => data.filter(Boolean))
//                 : Promise.resolve([]),
            
//             // Delivery range
//             restaurantData.deliveryRange
//                 ? restaurantData.deliveryRange.get()
//                     .then(snap => snap.exists ? { id: snap.id, ...snap.data() } : null)
//                     .catch(() => null)
//                 : Promise.resolve(null),
            
//             // Delivery rules
//             Array.isArray(restaurantData.deliveryRules) && restaurantData.deliveryRules.length > 0
//                 ? Promise.all(
//                     restaurantData.deliveryRules.map(async ({ deliveryRuleRef, price }) => {
//                         try {
//                             const ruleSnap = await deliveryRuleRef.get();
//                             if (ruleSnap.exists) {
//                                 return {
//                                     range: {
//                                         id: ruleSnap.id,
//                                         label: ruleSnap.data().label,
//                                         value: ruleSnap.data().value,
//                                     },
//                                     price,
//                                 };
//                             }
//                             return null;
//                         } catch {
//                             return null;
//                         }
//                     })
//                 ).then(data => data.filter(Boolean))
//                 : Promise.resolve([]),
            
//             // Food type serve
//             Array.isArray(restaurantData.foodTypeServe) && restaurantData.foodTypeServe.length > 0
//                 ? Promise.all(
//                     restaurantData.foodTypeServe.map(async (ref) => {
//                         try {
//                             const snap = await ref.get();
//                             return snap.exists ? { id: snap.id, ...snap.data() } : null;
//                         } catch {
//                             return null;
//                         }
//                     })
//                 ).then(data => data.filter(Boolean))
//                 : Promise.resolve([]),
//         ]);
        
//         return NextResponse.json({
//             success: true,
//             data: {
//                 restaurantId: restaurantDoc.id,
//                 ...restaurantData,
//                 user: userData,
//                 cuisines,
//                 restaurantType: restaurantTypes,
//                 deliveryRange,
//                 deliveryRules: deliveryRulesData,
//                 foodTypeServe,
//             }
//         });
//     } catch (error) {
//         console.error("Get Restaurant By ID API Error:", error);
//         return NextResponse.json(
//             { success: false, message: "Internal Server Error", error: error.message },
//             { status: 500 }
//         );
//     }
// }

// // ==========================================
// // 3. GET RESTAURANT DOCUMENTS
// // app/api/admin/restaurants/[id]/documents/route.js
// // ==========================================

// import { NextResponse } from "next/server";
// import { adminDb } from "@/firebaseAdmin";

// export async function GET(request, { params }) {
//     try {
//         const { id: restaurantId } = params;
        
//         const querySnapshot = await adminDb.collection('restaurants_documents')
//             .where('restaurantId', '==', restaurantId)
//             .get();
        
//         if (querySnapshot.empty) {
//             return NextResponse.json({
//                 success: true,
//                 data: []
//             });
//         }
        
//         const documents = querySnapshot.docs.map(doc => ({
//             id: doc.id,
//             ...doc.data()
//         }));
        
//         return NextResponse.json({
//             success: true,
//             data: documents
//         });
//     } catch (error) {
//         console.error("Get Restaurant Documents API Error:", error);
//         return NextResponse.json(
//             { success: false, message: "Internal Server Error", error: error.message },
//             { status: 500 }
//         );
//     }
// }

// // ==========================================
// // 4. APPROVE RESTAURANT DOCUMENT
// // app/api/admin/restaurants/documents/approve/route.js
// // ==========================================

// import { NextResponse } from "next/server";
// import { adminDb } from "@/firebaseAdmin";
// import admin from "firebase-admin";

// export async function POST(request) {
//     try {
//         const body = await request.json();
//         const { docId, data, restaurantId, allDocsValid } = body;
        
//         if (!docId || !restaurantId || allDocsValid === undefined) {
//             return NextResponse.json(
//                 { success: false, message: "Missing required fields" },
//                 { status: 400 }
//             );
//         }
        
//         const batch = adminDb.batch();
        
//         // Update document
//         const docRef = adminDb.collection('restaurants_documents').doc(docId);
//         batch.update(docRef, {
//             ...data,
//             processedAt: admin.firestore.FieldValue.serverTimestamp()
//         });
        
//         // Update restaurant
//         const restaurantRef = adminDb.collection('restaurants').doc(restaurantId);
//         batch.update(restaurantRef, {
//             documentsVerified: allDocsValid,
//             isOnline: allDocsValid ? false : null,
//             updatedAt: admin.firestore.FieldValue.serverTimestamp(),
//         });
        
//         // Commit batch (atomic operation)
//         await batch.commit();
        
//         return NextResponse.json({
//             success: true,
//             message: "Document approved successfully"
//         });
//     } catch (error) {
//         console.error("Approve Document API Error:", error);
//         return NextResponse.json(
//             { success: false, message: "Internal Server Error", error: error.message },
//             { status: 500 }
//         );
//     }
// }

// // ==========================================
// // 5. REJECT RESTAURANT DOCUMENTS
// // app/api/admin/restaurants/[id]/reject/route.js
// // ==========================================

// import { NextResponse } from "next/server";
// import { adminDb } from "@/firebaseAdmin";
// import admin from "firebase-admin";

// export async function POST(request, { params }) {
//     try {
//         const { id: restaurantId } = params;
        
//         await adminDb.collection('restaurants').doc(restaurantId).update({
//             documentsVerified: false,
//             updatedAt: admin.firestore.FieldValue.serverTimestamp(),
//         });
        
//         return NextResponse.json({
//             success: true,
//             message: "Restaurant documents rejected successfully"
//         });
//     } catch (error) {
//         console.error("Reject Documents API Error:", error);
//         return NextResponse.json(
//             { success: false, message: "Internal Server Error", error: error.message },
//             { status: 500 }
//         );
//     }
// }

// // ==========================================
// // 6. CHANGE RESTAURANT STATUS
// // app/api/admin/restaurants/[id]/status/route.js
// // ==========================================

// import { NextResponse } from "next/server";
// import { adminDb } from "@/firebaseAdmin";
// import admin from "firebase-admin";

// export async function PATCH(request, { params }) {
//     try {
//         const { id: restaurantId } = params;
//         const body = await request.json();
//         const { status } = body;
        
//         if (!status || !['ACTIVE', 'INACTIVE'].includes(status)) {
//             return NextResponse.json(
//                 { success: false, message: "Invalid status. Must be ACTIVE or INACTIVE" },
//                 { status: 400 }
//             );
//         }
        
//         await adminDb.collection('restaurants').doc(restaurantId).update({
//             status: status,
//             updatedAt: admin.firestore.FieldValue.serverTimestamp(),
//         });
        
//         return NextResponse.json({
//             success: true,
//             message: `Restaurant status changed to ${status} successfully`
//         });
//     } catch (error) {
//         console.error("Change Status API Error:", error);
//         return NextResponse.json(
//             { success: false, message: "Internal Server Error", error: error.message },
//             { status: 500 }
//         );
//     }
// }