//data transfer object (things that come from firebase)

import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type OrderFirestoreDTO = {
    patrimony: string;
    description: string;
    status: 'open' | 'closed',
    solution?: string,
    created_at: FirebaseFirestoreTypes.Timestamp,
    closed_at: FirebaseFirestoreTypes.Timestamp
}