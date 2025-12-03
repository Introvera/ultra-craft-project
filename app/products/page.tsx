import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-800 p-4">
      <h1 className="text-5xl font-bold mb-4">Under Construction</h1>
      <p className="text-lg mb-6 text-center">
        Sorry, this page is still being built. Check back soon!
      </p>
      <Link href="/">
        <Button variant="coffee" size="pill" className="hidden lg:flex">
          Go Back Home
        </Button>
      </Link>
    </div>
  );
};

export default page;
