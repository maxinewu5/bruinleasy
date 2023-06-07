import {getFirestore} from "firebase/firestore"
import { doc, getDoc } from "firebase/firestore";
const PropertyDisplay = async (Property_ID) => {
  const db = getFirestore();
  const Property_Reference = doc(db, "Properties", Property_ID);
  const Property = await getDoc(Property_Reference);

  console.log(Property.data())
  console.log("CLICKETH")
  
};

export default PropertyDisplay;