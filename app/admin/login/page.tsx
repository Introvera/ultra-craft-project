import { query } from "@/lib/db";
import LoginForm from "../../../components/admin/adminLogin";

export default async function AdminLoginPage() {
  return (
    <LoginForm />
  );
}