export default function Loading() {
  return (
    <div className="bg-gray-100 lg:py-26 py-24 md:pb-4 mb-2 max-w-[1920px] mx-auto min-h-screen">
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
      </div>
    </div>
  );
}
