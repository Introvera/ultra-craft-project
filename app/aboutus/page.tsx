import ContactUs from "@/components/contact";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-800 p-4">
      <ContactUs />
    </div>
  );
};

export default page;
