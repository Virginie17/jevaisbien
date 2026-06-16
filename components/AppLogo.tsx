import Link from "next/link";

type AppLogoProps = {
  showText?: boolean;
  href?: string;
  className?: string;
};

function LogoMark() {
  return (
    <div className="relative flex h-12 w-12 items-center justify-center rounded-[1.4rem] bg-gradient-to-br from-[#78BFA6] to-[#4F9F8A] shadow-sm">
      <svg viewBox="0 0 64 64" aria-hidden="true" className="h-9 w-9">
        <path d="M32 53s-2.2-1.5-5.4-4C16.4 40.8 10 34.2 10 25.7 10 19.5 14.8 15 20.8 15c3.7 0 7.2 1.9 9.2 4.8C32 16.9 35.5 15 39.2 15 45.2 15 50 19.5 50 25.7c0 8.5-6.4 15.1-16.6 23.3C34.2 51.5 32 53 32 53Z" fill="white" />
        <path d="M21 30.2h5.9l2.7-6.1 5.1 14.2 3.4-8.1H43" fill="none" stroke="#4F9F8A" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function AppLogo({ showText = true, href = "/", className = "" }: AppLogoProps) {
  const content = (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoMark />
      {showText && (
        <div className="leading-tight">
          <p className="text-lg font-bold text-[#263238]">Je vais bien</p>
          <p className="text-xs font-semibold text-[#4F9F8A]">Je rassure les miens</p>
        </div>
      )}
    </div>
  );

  if (!href) return content;

  return (
    <Link href={href} className="inline-flex no-underline">
      {content}
    </Link>
  );
}
