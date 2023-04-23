interface LoaderIconProps {
  hw?: string;
}

export default function LoaderIcon({ hw }: LoaderIconProps) {
  if (!hw) {
    hw = "h-4 w-4";
  }

  return (
    <span
      className={`${hw} block rounded-full border-2 border-t-neutral-400 animate-spin`}
    ></span>
  );
}
