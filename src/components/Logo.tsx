import Image from "next/image";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`inline-flex items-center ${light ? "bg-white px-2 py-1" : ""}`}>
      <Image
        src="/img/brand/regent-logo.png"
        alt="Regent Industrial Valves"
        width={239}
        height={100}
        priority
        className="h-auto w-[148px] sm:w-[164px]"
      />
    </span>
  );
}
