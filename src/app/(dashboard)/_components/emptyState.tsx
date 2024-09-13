import Image from "next/image";

const EmptyState: React.FC<{
  imageURL: string;
  imageAlt: string;
  height?: number;
  width?: number;
  title: string;
  subTitle: string;
  children?: React.ReactNode;
}> = ({
  imageURL,
  imageAlt,
  height = 140,
  width = 140,
  title,
  subTitle,
  children,
}) => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Image src={imageURL} alt={imageAlt} height={height} width={width} />

      <h2 className="mt-6 select-none text-2xl font-semibold">{title}</h2>
      <p className="mt-2 select-none text-sm text-muted-foreground">
        {subTitle}
      </p>

      {children}
    </div>
  );
};

export default EmptyState;
