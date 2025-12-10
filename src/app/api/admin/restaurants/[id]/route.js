// app/api/admin/restaurants/[id]/route.js
import { NextResponse } from "next/server";
import { adminDb } from "@/firebaseAdmin";

export async function GET(request, { params }) {
    try {
        const { id: restaurantId } = await params;
        
        // Validate restaurantId
        if (!restaurantId || typeof restaurantId !== 'string') {
            return NextResponse.json(
                { success: false, message: "Invalid restaurant ID" },
                { status: 400 }
            );
        }
        
        // Get restaurant document
        const restaurantDoc = await adminDb.collection('restaurants').doc(restaurantId).get();
        
        if (!restaurantDoc.exists) {
            return NextResponse.json(
                { success: false, message: "Restaurant not found" },
                { status: 404 }
            );
        }
        
        const restaurantData = restaurantDoc.data();
        
        // Helper function to safely get reference data
        const getRefData = async (ref) => {
            if (!ref || typeof ref.get !== 'function') return null;
            try {
                const snap = await ref.get();
                return snap.exists ? { id: snap.id, ...snap.data() } : null;
            } catch (error) {
                console.warn('Failed to fetch reference:', error.message);
                return null;
            }
        };
        
        // Fetch all related data in parallel
        const [
            userData,
            cuisines,
            restaurantTypes,
            deliveryRange,
            deliveryRulesData,
            foodTypeServe
        ] = await Promise.all([
            // User data
            restaurantData.userId 
                ? adminDb.collection('users').doc(restaurantData.userId).get()
                    .then(doc => doc.exists ? doc.data() : null)
                    .catch((err) => {
                        console.warn(`User not found: ${restaurantData.userId}`, err.message);
                        return null;
                    })
                : Promise.resolve(null),
            
            // Cuisines - with validation
            Array.isArray(restaurantData.cuisines) && restaurantData.cuisines.length > 0
                ? Promise.all(
                    restaurantData.cuisines
                        .filter(ref => ref && typeof ref.get === 'function') // Filter valid refs
                        .map(ref => getRefData(ref))
                  ).then(data => data.filter(Boolean))
                : Promise.resolve([]),
            
            // Restaurant types - with validation
            Array.isArray(restaurantData.restaurantType) && restaurantData.restaurantType.length > 0
                ? Promise.all(
                    restaurantData.restaurantType
                        .filter(ref => ref && typeof ref.get === 'function') // Filter valid refs
                        .map(ref => getRefData(ref))
                  ).then(data => data.filter(Boolean))
                : Promise.resolve([]),
            
            // Delivery range - with validation
            restaurantData.deliveryRange && typeof restaurantData.deliveryRange.get === 'function'
                ? getRefData(restaurantData.deliveryRange)
                : Promise.resolve(null),
            
            // Delivery rules - with validation
            Array.isArray(restaurantData.deliveryRules) && restaurantData.deliveryRules.length > 0
                ? Promise.all(
                    restaurantData.deliveryRules
                        .filter(item => item && item.deliveryRuleRef && typeof item.deliveryRuleRef.get === 'function')
                        .map(async ({ deliveryRuleRef, price }) => {
                            const ruleData = await getRefData(deliveryRuleRef);
                            if (ruleData) {
                                return {
                                    range: {
                                        id: ruleData.id,
                                        label: ruleData.label,
                                        value: ruleData.value,
                                    },
                                    price,
                                };
                            }
                            return null;
                        })
                  ).then(data => data.filter(Boolean))
                : Promise.resolve([]),
            
            // Food type serve - with validation
            Array.isArray(restaurantData.foodTypeServe) && restaurantData.foodTypeServe.length > 0
                ? Promise.all(
                    restaurantData.foodTypeServe
                        .filter(ref => ref && typeof ref.get === 'function') // Filter valid refs
                        .map(ref => getRefData(ref))
                  ).then(data => data.filter(Boolean))
                : Promise.resolve([]),
        ]);
        
        return NextResponse.json({
            success: true,
            data: {
                restaurantId: restaurantDoc.id,
                ...restaurantData,
                user: userData,
                cuisines,
                restaurantType: restaurantTypes,
                deliveryRange,
                deliveryRules: deliveryRulesData,
                foodTypeServe,
            }
        });
    } catch (error) {
        console.error("Get Restaurant By ID API Error:", error);
        return NextResponse.json(
            { 
                success: false, 
                message: "Internal Server Error", 
                error: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
            },
            { status: 500 }
        );
    }
}