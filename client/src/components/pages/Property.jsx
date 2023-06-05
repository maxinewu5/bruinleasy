import "firebase/firestore";
import app from "../../firebase-config";

const PropertyDisplay = async (Property_ID) => {
  const db = app.firestore();
  db.collection("Properties")
    .doc(Property_ID)
    .get()
    .then((Property_Object) => {
      if (Property_Object.exists) {
        const data = Property_Object.data();
        console.log(data);
      } else {
        console.log("Couldn't find the property");
      }
    })
    .catch((error) => {
      alert("Error getting the property info", error);
    });
};

export default PropertyDisplay;