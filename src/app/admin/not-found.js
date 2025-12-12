import { Button } from "@/components/ui/button";
import Link from "next/link";
import NotFoundImage from "../../assets/images/not-found.png";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 bg-gradient-to-br from-white via-[#FFF2EB] to-[#FF5E0420]">
      <Image
        src={NotFoundImage}
        alt="404 Not Found"
        className="w-80 mb-6 opacity-90"
      />
      <h1 className="text-5xl font-bold text-gray-900">Page Not Found</h1>
      <p className="text-lg text-gray-500 mt-3 max-w-md text-center">
        Oops! The page you are looking for does not exist or may have been moved.
      </p>
      <Button className="mt-6 px-6 py-5 text-lg" asChild>
        <Link href="/">
          Go Back Home
        </Link>
      </Button>
    </div>
  );
}
