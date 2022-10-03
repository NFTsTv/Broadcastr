export default function Container({children}: {children: React.ReactNode}) {
  return (
    <div className="p-5 space-y-4 flex flex-col items-center">
      {children}
    </div>
  );
}
