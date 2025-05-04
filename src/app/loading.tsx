export default function Loading() {
  return (
    <div className="flex justify-center items-center z-30 bg-black opacity-35 h-full w-full fixed">
      <div className="border-4 rounded-full border-white bg-linear-to-r animate-spin h-12 w-12" />
    </div>
  );
}
