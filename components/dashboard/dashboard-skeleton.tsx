"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="bg-dark min-h-screen p-4 md:p-6">
      <div className="max-w-full mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-12 w-64 mb-2 bg-dark-100" />
          <Skeleton className="h-6 w-96 bg-dark-100" />
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-dark-100 rounded-2xl p-4 md:p-6 border border-primary-border">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="w-12 h-12 rounded-xl bg-primary-bg" />
                <Skeleton className="h-4 w-16 bg-dark-200" />
              </div>
              <Skeleton className="h-8 w-24 mb-2 bg-dark-200" />
              <Skeleton className="h-4 w-20 bg-dark-300" />
            </div>
          ))}
        </div>

        {/* Charts Skeleton */}
        <div className="grid lg:grid-cols-2 gap-4 md:gap-6 mb-8">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-dark-100 rounded-2xl p-4 md:p-6 border border-primary-border">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <Skeleton className="h-6 w-32 mb-2 bg-dark-200" />
                  <Skeleton className="h-4 w-48 bg-dark-300" />
                </div>
                <div className="text-right">
                  <Skeleton className="h-8 w-20 mb-1 bg-dark-200" />
                  <Skeleton className="h-3 w-24 bg-dark-300" />
                </div>
              </div>
              <Skeleton className="h-64 w-full bg-dark-200 rounded-lg" />
            </div>
          ))}
        </div>

        {/* Activity and Actions Skeleton */}
        <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-dark-100 rounded-2xl p-4 md:p-6 border border-primary-border">
            <Skeleton className="h-6 w-40 mb-6 bg-dark-200" />
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-dark rounded-xl">
                  <Skeleton className="w-10 h-10 rounded-lg bg-primary-bg" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-32 mb-1 bg-dark-200" />
                    <Skeleton className="h-3 w-48 bg-dark-300" />
                  </div>
                  <Skeleton className="h-3 w-16 bg-dark-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-dark-100 rounded-2xl p-4 md:p-6 border border-primary-border">
            <Skeleton className="h-6 w-32 mb-6 bg-dark-200" />
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-dark rounded-xl">
                  <Skeleton className="w-10 h-10 rounded-lg bg-primary-bg" />
                  <Skeleton className="h-4 w-24 bg-dark-200" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
