import { db } from "@/service/firebaseConfig";
import { ResponseType, UserDataType } from "@/types";
import { doc, updateDoc } from "firebase/firestore";
import { uploadFileToCloudinary } from "./imageUtile";


export const updateUser = async (
    uid: string,
    updatedData: UserDataType
): Promise<ResponseType> => {
    try {

        if (updatedData.image && updatedData?.image?.uri) {
            const imageUploadRes = await uploadFileToCloudinary(updatedData.image, "users");

            if (!imageUploadRes.success) {
                return {
                    success: false,
                    msg: imageUploadRes.msg || "Failed to upload image",
                }
            }
        }
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, updatedData);
         
        return{success:true , msg: "Updated successfully"}
    } catch (error: any) {
        console.log("Error updating user: ", error);
        return {success: false , msg: error?.message};
    }
}