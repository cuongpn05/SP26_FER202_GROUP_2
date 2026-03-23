import React, { Suspense } from 'react';
import SkeletonCard from './SkeletonCard';

// Lazy load the CourseCard component
const CourseCard = React.lazy(() => import('./CourseCard'));

const CourseGrid = ({ 
  courses, 
  loading, 
  columns = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5",
  skeletonCount = 10
}) => {
  if (loading) {
    return (
      <div className={`grid ${columns} gap-6`}>
        {[...Array(skeletonCount)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 bg-[#E8F0FE]/30 rounded-3xl border border-[#1A73E8]/10 animate-fade-in">
        <div className="w-16 h-16 bg-[#1A73E8]/5 rounded-2xl flex items-center justify-center mb-6 text-[#1A73E8]">
          <span className="text-3xl font-black italic">F</span>
        </div>
        <h3 className="text-xl font-black text-[#202124]">Không tìm thấy kết quả nào</h3>
        <p className="text-[#5F6368] mt-2 text-center max-w-sm font-medium">
          Rất tiếc, chúng tôi không tìm thấy khóa học nào phù hợp với yêu cầu của bạn.
        </p>
      </div>
    );
  }

  return (
    <div className={`grid ${columns} gap-6`}>
      <Suspense fallback={
        <>{[...Array(skeletonCount)].map((_, i) => <SkeletonCard key={i} />)}</>
      }>
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </Suspense>
    </div>
  );
};

export default CourseGrid;

