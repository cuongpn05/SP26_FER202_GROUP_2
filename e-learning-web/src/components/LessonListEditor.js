import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import {
  createLesson,
  deleteLessonById,
  getCourses,
  getChaptersByCourse,
  getLessonsByChapterIds,
  updateLesson,
} from "../api/courses";
import { useAuth } from "../context/AuthContext";

const initialState = {
  loading: false,
  submitting: false,
  error: "",
  chapters: [],
  lessons: [],
  form: {
    id: null,
    title: "",
    videoUrl: "",
    duration: "",
    chapterId: "",
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "LOAD_START":
      return { ...state, loading: true, error: "" };
    case "LOAD_SUCCESS":
      return {
        ...state,
        loading: false,
        chapters: action.payload.chapters,
        lessons: action.payload.lessons,
      };
    case "LOAD_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "SET_FIELD":
      return {
        ...state,
        form: {
          ...state.form,
          [action.payload.name]: action.payload.value,
        },
      };
    case "SET_FORM":
      return { ...state, form: action.payload };
    case "RESET_FORM":
      return {
        ...state,
        form: {
          id: null,
          title: "",
          videoUrl: "",
          duration: "",
          chapterId: state.chapters[0] ? String(state.chapters[0].id) : "",
        },
      };
    case "SUBMIT_START":
      return { ...state, submitting: true, error: "" };
    case "SUBMIT_END":
      return { ...state, submitting: false };
    case "UPSERT_LESSON": {
      const nextLessons = [...state.lessons];
      const index = nextLessons.findIndex(
        (lesson) => String(lesson.id) === String(action.payload.id)
      );

      if (index >= 0) {
        nextLessons[index] = action.payload;
      } else {
        nextLessons.push(action.payload);
      }

      return { ...state, lessons: nextLessons };
    }
    case "REMOVE_LESSON":
      return {
        ...state,
        lessons: state.lessons.filter(
          (lesson) => String(lesson.id) !== String(action.payload)
        ),
      };
    default:
      return state;
  }
}

export default function LessonListEditor({ courseId: propCourseId }) {
  const { user } = useAuth();
  const { courseId: routeCourseId } = useParams();
  const fixedCourseId = propCourseId || routeCourseId || "";
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(fixedCourseId);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setSelectedCourseId(fixedCourseId);
  }, [fixedCourseId]);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const instructorId = user?.role === "instructor" ? user.id : null;
        const response = await getCourses(instructorId);
        setAvailableCourses(response.data || []);

        if (!fixedCourseId && response.data?.length > 0) {
          setSelectedCourseId(String(response.data[0].id));
        }
      } catch (error) {
        setAvailableCourses([]);
      }
    };

    loadCourses();
  }, [fixedCourseId, user?.id, user?.role]);

  useEffect(() => {
    const loadData = async () => {
      const courseId = fixedCourseId || selectedCourseId;
      if (!courseId) return;

      dispatch({ type: "LOAD_START" });
      try {
        const chaptersRes = await getChaptersByCourse(courseId);
        const chapters = chaptersRes.data || [];

        const lessonsRes = await getLessonsByChapterIds(
          chapters.map((chapter) => chapter.id)
        );

        dispatch({
          type: "LOAD_SUCCESS",
          payload: {
            chapters,
            lessons: lessonsRes.data || [],
          },
        });

        dispatch({
          type: "SET_FORM",
          payload: {
            id: null,
            title: "",
            videoUrl: "",
            duration: "",
            chapterId: chapters[0] ? String(chapters[0].id) : "",
          },
        });
      } catch (error) {
        dispatch({
          type: "LOAD_ERROR",
          payload: "Không tải được danh sách bài học. Vui lòng thử lại.",
        });
      }
    };

    loadData();
  }, [fixedCourseId, selectedCourseId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch({ type: "SET_FIELD", payload: { name, value } });
  };

  const handleEdit = (lesson) => {
    dispatch({
      type: "SET_FORM",
      payload: {
        id: lesson.id,
        title: lesson.title || "",
        videoUrl: lesson.videoUrl || "",
        duration: lesson.duration || "",
        chapterId: String(lesson.chapterId || ""),
      },
    });
  };

  const handleDelete = async (lessonId) => {
    const shouldDelete = window.confirm("Bạn có chắc muốn xóa bài học này?");
    if (!shouldDelete) return;

    dispatch({ type: "SUBMIT_START" });
    try {
      await deleteLessonById(lessonId);
      dispatch({ type: "REMOVE_LESSON", payload: lessonId });
    } catch (error) {
      dispatch({
        type: "LOAD_ERROR",
        payload: "Xóa bài học thất bại. Vui lòng thử lại.",
      });
    } finally {
      dispatch({ type: "SUBMIT_END" });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { id, title, videoUrl, duration, chapterId } = state.form;

    if (!title.trim() || !videoUrl.trim() || !chapterId) {
      dispatch({
        type: "LOAD_ERROR",
        payload: "Vui lòng nhập đầy đủ tiêu đề, link video và chương.",
      });
      return;
    }

    const payload = {
      title: title.trim(),
      videoUrl: videoUrl.trim(),
      duration: duration.trim() || "10:00",
      chapterId: Number(chapterId),
    };

    dispatch({ type: "SUBMIT_START" });
    try {
      const response = id
        ? await updateLesson(id, payload)
        : await createLesson(payload);

      dispatch({ type: "UPSERT_LESSON", payload: response.data });
      dispatch({ type: "RESET_FORM" });
    } catch (error) {
      dispatch({
        type: "LOAD_ERROR",
        payload: id
          ? "Cập nhật bài học thất bại."
          : "Thêm bài học thất bại.",
      });
    } finally {
      dispatch({ type: "SUBMIT_END" });
    }
  };

  const chapterNameMap = new Map(
    state.chapters.map((chapter) => [String(chapter.id), chapter.title])
  );

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-premium overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-primary/5 to-transparent">
          <h2 className="text-2xl font-black text-text-main">LessonListEditor</h2>
          <p className="text-sm text-text-muted mt-1">
            Thêm, cập nhật hoặc xóa bài học nhỏ (video link) trong khóa học.
          </p>

          {!fixedCourseId && (
            <div className="mt-4 max-w-sm">
              <label className="block text-sm font-semibold text-text-main mb-2">
                Chọn khóa học
              </label>
              <select
                value={selectedCourseId}
                onChange={(event) => setSelectedCourseId(event.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {availableCourses.length === 0 ? (
                  <option value="">Chưa có khóa học</option>
                ) : (
                  availableCourses.map((course) => (
                    <option key={course.id} value={String(course.id)}>
                      {course.title}
                    </option>
                  ))
                )}
              </select>
            </div>
          )}
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {state.error && (
              <div className="p-3 rounded-lg text-sm bg-red-50 border border-red-200 text-red-700">
                {state.error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-text-main mb-2">
                Tiêu đề bài học
              </label>
              <input
                name="title"
                value={state.form.title}
                onChange={handleChange}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Ví dụ: useReducer nâng cao"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-main mb-2">
                Video link
              </label>
              <input
                name="videoUrl"
                value={state.form.videoUrl}
                onChange={handleChange}
                type="url"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="https://youtu.be/..."
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-text-main mb-2">
                  Thời lượng
                </label>
                <input
                  name="duration"
                  value={state.form.duration}
                  onChange={handleChange}
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="10:00"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-main mb-2">
                  Chương
                </label>
                <select
                  name="chapterId"
                  value={state.form.chapterId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={state.chapters.length === 0}
                >
                  {state.chapters.length === 0 ? (
                    <option value="">Không có chương</option>
                  ) : (
                    state.chapters.map((chapter) => (
                      <option key={chapter.id} value={String(chapter.id)}>
                        {chapter.title}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={state.submitting || state.loading}
                className="px-5 py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                {state.form.id ? "Lưu cập nhật" : "Thêm bài học"}
              </button>
              <button
                type="button"
                onClick={() => dispatch({ type: "RESET_FORM" })}
                className="px-5 py-2.5 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
              >
                Làm mới form
              </button>
            </div>
          </form>

          <div>
            <h3 className="text-lg font-bold text-text-main mb-3">Danh sách bài học</h3>
            {state.loading ? (
              <p className="text-sm text-text-muted">Đang tải dữ liệu...</p>
            ) : state.lessons.length === 0 ? (
              <p className="text-sm text-text-muted">Chưa có bài học nào trong khóa học này.</p>
            ) : (
              <ul className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                {state.lessons
                  .slice()
                  .sort((a, b) => Number(a.chapterId) - Number(b.chapterId))
                  .map((lesson) => (
                    <li
                      key={lesson.id}
                      className="border border-gray-200 rounded-xl p-4 bg-white"
                    >
                      <p className="font-semibold text-text-main">{lesson.title}</p>
                      <p className="text-xs text-text-muted mt-1">
                        Chương: {chapterNameMap.get(String(lesson.chapterId)) || "N/A"}
                      </p>
                      <a
                        href={lesson.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-primary hover:underline break-all"
                      >
                        {lesson.videoUrl}
                      </a>
                      <div className="mt-3 flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(lesson)}
                          className="px-3 py-1.5 rounded-md bg-blue-50 text-blue-700 text-sm font-medium hover:bg-blue-100"
                        >
                          Sửa
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(lesson.id)}
                          className="px-3 py-1.5 rounded-md bg-red-50 text-red-700 text-sm font-medium hover:bg-red-100"
                        >
                          Xóa
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
