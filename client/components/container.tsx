export default function Container({children}: {children: React.ReactNode}) {
  return (
    <div className="flex flex-col w-80 space-y-4 m-auto relative ">
      {children}
    </div>
  );
}
