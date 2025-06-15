export default function Navbar() {
  return (
    <header className="bg-white border-b border-orange-200 shadow-md rounded-l-2xl rounded-r-2xl h-[70px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-orange-600">
              ON MY BIRTHDAY!
            </h1>
          </div>
          <div className="flex items-center">
            <div className="flex items-center space-x-10">
              <span className="text-sm text-orange-600">Github</span>
              <span className="text-sm text-orange-600">LinkedIn</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
