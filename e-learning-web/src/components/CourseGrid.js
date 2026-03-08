import React, { Suspense, lazy } from 'react';
import SkeletonCard from './SkeletonCard';

// Lazy load the CourseCard component
const CourseCardLazy = lazy(() => import('./CourseCard'));

const CourseGrid = ({ courses, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <span className="text-4xl text-gray-500 font-bold">!</span>
        </div>
        <h3 className="text-xl font-bold text-text-main">Không tìm thấy khóa học nào</h3>
        <p className="text-text-muted mt-2 text-center max-w-sm">
          Bạn hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm để khám phá thêm nhiều nội dung hấp dẫn.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      <Suspense fallback={[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}>
        {courses.map((course) => (
          <CourseCardLazy key={course.id} course={course} />
        ))}
      </Suspense>
    </div>
  );
};

export default CourseGrid;
