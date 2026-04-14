export function RoomCardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-6 border border-[#E4E7EF] animate-pulse">
      {/* Language Badge Skeleton */}
      <div className="flex items-center justify-between mb-3">
        <div className="w-16 h-6 bg-[#F1F3F9] rounded-md"></div>
      </div>

      {/* Room Name Skeleton */}
      <div className="h-6 bg-[#F1F3F9] rounded-md mb-3 w-3/4"></div>

      {/* Participants & Last Edited */}
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {[1, 2, 3].map((idx) => (
            <div
              key={idx}
              className="w-8 h-8 rounded-full bg-[#F1F3F9] border-2 border-white"
            />
          ))}
        </div>
        <div className="w-20 h-4 bg-[#F1F3F9] rounded"></div>
      </div>
    </div>
  );
}
