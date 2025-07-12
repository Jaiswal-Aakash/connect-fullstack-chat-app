import React from "react";
import { Users, User } from "lucide-react";

const AddContactSkeleton = () => {
  return (
    <div className="flex h-[95vh] w-full max-w-7xl mx-auto gap-6 z-50">
      {/* Left Side - Users List Skeleton */}
      <div className="flex-1 bg-white rounded-[14px] border border-gray-300 shadow-md p-4 sm:p-6 flex flex-col h-full">
        {/* Header Skeleton */}
        <div className="flex flex-col items-center mb-6 flex-shrink-0">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-8 h-8 text-gray-400" />
            <div className="bg-gray-200 animate-pulse h-8 w-32 rounded"></div>
          </div>
          <div className="bg-gray-200 animate-pulse h-4 w-48 rounded"></div>
        </div>

        {/* Search Bar Skeleton */}
        <div className="w-full max-w-lg mx-auto mb-6 flex-shrink-0">
          <div className="bg-gray-200 animate-pulse h-14 w-full rounded-xl"></div>
        </div>

        {/* Users List Skeleton */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array(6).fill(null).map((_, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col h-full">
                {/* Header Skeleton */}
                <div className="flex items-start justify-between mb-4 flex-shrink-0">
                  <div className="flex items-center gap-4">
                    {/* Profile Picture Skeleton */}
                    <div className="relative">
                      <div className="bg-gray-300 animate-pulse w-16 h-16 rounded-full"></div>
                      <div className="bg-gray-200 animate-pulse w-12 h-5 rounded-full absolute -top-1 -right-1"></div>
                    </div>

                    {/* User Info Skeleton */}
                    <div className="flex-1 min-w-0">
                      <div className="bg-gray-200 animate-pulse h-5 w-28 mb-2 rounded"></div>
                      <div className="bg-gray-200 animate-pulse h-3 w-32 mb-1 rounded"></div>
                      <div className="bg-gray-200 animate-pulse h-3 w-24 rounded"></div>
                    </div>
                  </div>
                </div>

                {/* Bio Section Skeleton */}
                <div className="mb-4 flex-shrink-0">
                  <div className="bg-gray-100 rounded-lg p-3 border border-gray-100">
                    <div className="bg-gray-200 animate-pulse h-4 w-full mb-2 rounded"></div>
                    <div className="bg-gray-200 animate-pulse h-3 w-3/4 rounded"></div>
                  </div>
                </div>

                {/* Spacer */}
                <div className="flex-1"></div>

                {/* Buttons Skeleton */}
                <div className="flex gap-2 mt-auto">
                  <div className="bg-gray-200 animate-pulse h-9 flex-1 rounded-lg"></div>
                  <div className="bg-gray-200 animate-pulse h-9 flex-1 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Stats Skeleton */}
        <div className="w-full text-center text-sm text-gray-500 border-t pt-4 mt-4 flex-shrink-0">
          <div className="bg-gray-200 animate-pulse h-4 w-32 mx-auto rounded"></div>
        </div>
      </div>

      {/* Right Side - Profile Preview Skeleton */}
      <div className="w-80 bg-white rounded-[14px] border border-gray-300 shadow-md p-6">
        <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
          <User className="w-16 h-16 mb-4 text-gray-300" />
          <div className="bg-gray-200 animate-pulse h-6 w-32 mb-2 rounded"></div>
          <div className="bg-gray-200 animate-pulse h-4 w-48 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default AddContactSkeleton; 