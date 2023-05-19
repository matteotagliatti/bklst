import Link from "next/link";

interface TitleProps {
  title: string;
  description: string;
}

export default function Title({ title, description }: TitleProps) {
  return (
    <div
      className={`flex flex-row pb-4 gap-2 justify-between items-end max-w-xs`}
    >
      <div>
        <h2 className={`text-2xl mb-1`}>{title}</h2>
        <p className="text-sm text-neutral-400">{description}</p>
      </div>
    </div>
  );
}
