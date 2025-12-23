export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10 text-center space-y-4">
        <div className="h-10 w-64 bg-gray-200 animate-pulse mx-auto rounded"></div>
        <div className="h-4 w-96 bg-gray-100 animate-pulse mx-auto rounded"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex flex-col gap-4 w-full p-4 border rounded-2xl">
            <div className="skeleton h-52 w-full"></div>
            <div className="skeleton h-6 w-3/4"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-10 w-full mt-2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}