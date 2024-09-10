import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={120}
        height={120}
        className="animate-pulse duration-700"
      />
    </div>
  );
};

export default Loading;
