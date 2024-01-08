import { NewPasswordForm } from "@/components/auth/new-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "New password"
}

const NewPasswordPage = () => {
  return ( 
    <NewPasswordForm />
   );
}
 
export default NewPasswordPage;