import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-[#FAFAF5] px-4">
      <div className="text-center w-full max-w-sm">
        <p className="text-[#001E5A] font-extrabold text-5xl sm:text-6xl mb-3">404</p>
        <h1 className="text-xl sm:text-2xl font-bold text-[#001E5A] mb-3">Page Not Found</h1>
        <p className="text-gray-500 text-sm mb-8 max-w-xs mx-auto leading-relaxed">
          The page you are looking for does not exist or may have moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/"
            className="bg-[#001E5A] text-white font-bold px-7 py-3 rounded-lg hover:bg-[#D2003C] transition-colors text-sm">
            Go Home
          </Link>
          <Link href="/contact"
            className="border-2 border-[#001E5A] text-[#001E5A] font-bold px-7 py-3 rounded-lg hover:bg-[#001E5A] hover:text-white transition-colors text-sm text-center">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
