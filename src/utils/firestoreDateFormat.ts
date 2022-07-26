import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export function dateFormat(timestamp: FirebaseFirestoreTypes.Timestamp) { //receives a timestamp that has as parameter a firebase timestamp
    if (timestamp) {
        const date = new Date(timestamp.toDate()); //js function to new date

        const day = date.toLocaleDateString('pt-BR'); //returns date in brazilian standards
        const hour = date.toLocaleTimeString('pt-BR'); //returns hours in brazilian standards

        return `${ day } às ${ hour }`; //return of the function the way we wanted.
    }    
}

//this function allows us to format the data the way we want to.