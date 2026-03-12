import React, { useEffect, useReducer, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  createLesson,
  deleteLessonById,
  getCourses,
  getLessonsByCourse,
  updateLesson,
} from "../api/courses";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft, Save, Trash2, Edit3, Plus, PlayCircle, Image as ImageIcon, Clock, FileText } from 'lucide-react';

const initialState = {
  loading: false,
  submitting: false,
  error: "",
  lessons: [],
  form: {
    id: null,
    title: "",
    videoUrl: "",
    duration: "",
    description: "",
    picture: "",
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
          description: "",
          picture: "",
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
  const navigate = useNavigate();
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
        const lessonsRes = await getLessonsByCourse(courseId);

        dispatch({
          type: "LOAD_SUCCESS",
          payload: {
            lessons: lessonsRes.data || [],
          },
        });

        dispatch({ type: "RESET_FORM" });
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
        description: lesson.description || "",
        picture: lesson.picture || "",
      },
    });
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    const { id, title, videoUrl, duration, description, picture } = state.form;
    const courseId = fixedCourseId || selectedCourseId;

    if (!title.trim() || !videoUrl.trim() || !duration.trim() || !description.trim() || !picture.trim()) {
      dispatch({
        type: "LOAD_ERROR",
        payload: "Vui lòng nhập đầy đủ tất cả các trường thông tin.",
      });
      return;
    }

    const payload = {
      courseId: Number(courseId),
      title: title.trim(),
      videoUrl: videoUrl.trim(),
      duration: duration.trim(),
      description: description.trim(),
      picture: picture.trim(),
    };

    dispatch({ type: "SUBMIT_START" });
    try {
      const response = id
        ? await updateLesson(id, payload)
        : await createLesson(payload);

      dispatch({ type: "UPSERT_LESSON", payload: response.data });
      dispatch({ type: "RESET_FORM" });
      alert(id ? "Cập nhật bài học thành công!" : "Thêm bài học mới thành công!");
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

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      {/* Header section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-3 bg-white rounded-full shadow-md text-gray-400 hover:text-blue-600 transition-all border border-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Quản lý bài học</h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
              Thêm, sửa hoặc xóa nội dung bài giảng video
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column - Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-slate-50 bg-blue-50/30">
              <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                {state.form.id ? <Edit3 size={20} className="text-blue-600" /> : <Plus size={20} className="text-blue-600" />}
                {state.form.id ? "Cập nhật bài học" : "Thêm bài học mới"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              {state.error && (
                <div className="p-4 rounded-xl text-xs font-bold uppercase tracking-widest bg-red-50 border border-red-100 text-red-600">
                  {state.error}
                </div>
              )}

              {!fixedCourseId && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Chọn khóa học</label>
                  <select
                    value={selectedCourseId}
                    onChange={(event) => setSelectedCourseId(event.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-700 font-medium"
                  >
                    {availableCourses.map((course) => (
                      <option key={course.id} value={String(course.id)}>{course.title}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tiêu đề bài học</label>
                <div className="relative">
                  <Edit3 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    name="title"
                    value={state.form.title}
                    onChange={handleChange}
                    type="text"
                    placeholder="Nhập tiêu đề hấp dẫn..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-700 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Link Video (YouTube)</label>
                <div className="relative">
                  <PlayCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    name="videoUrl"
                    value={state.form.videoUrl}
                    onChange={handleChange}
                    type="url"
                    placeholder="https://youtube.com/embed/..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-700 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Thời lượng</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input
                      name="duration"
                      value={state.form.duration}
                      onChange={handleChange}
                      type="text"
                      placeholder="10:00"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-700 font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Thumbnail bài học</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input
                      name="picture"
                      value={state.form.picture}
                      onChange={handleChange}
                      type="url"
                      placeholder="URL ảnh..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-700 font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mô tả bài học</label>
                <div className="relative">
                  <FileText className="absolute left-4 top-4 text-slate-300" size={18} />
                  <textarea
                    name="description"
                    value={state.form.description}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Bài học này giúp học viên đạt được..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-700 font-medium resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={state.submitting || state.loading}
                  className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Save size={18} />
                  {state.form.id ? "Lưu cập nhật" : "Thêm bài học"}
                </button>
                <button
                  type="button"
                  onClick={() => dispatch({ type: "RESET_FORM" })}
                  className="px-6 bg-slate-100 text-slate-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
                >
                  Làm mới
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right column - List */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-white sticky top-0 z-10">
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">Danh sách bài học</h3>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">
                  {state.lessons.length} bài đã có trong hệ thống
                </p>
              </div>
            </div>

            <div className="p-8">
              {state.loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <div className="w-12 h-12 rounded-full border-t-2 border-blue-600 animate-spin"></div>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Đang tải dữ liệu...</p>
                </div>
              ) : state.lessons.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-slate-100 rounded-[2rem]">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-200">
                    <Plus size={32} />
                  </div>
                  <p className="text-slate-900 font-black text-sm uppercase tracking-tight">Chưa có bài học nào</p>
                  <p className="text-slate-400 text-xs mt-1 font-medium italic">Hãy bắt đầu thêm bài học đầu tiên!</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
                  {state.lessons.map((lesson, idx) => (
                    <div
                      key={lesson.id}
                      className="group bg-white border border-slate-100 rounded-3xl p-5 hover:border-blue-100 hover:shadow-xl hover:scale-[1.01] transition-all flex items-center gap-6"
                    >
                      <div className="w-24 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 relative">
                        <img
                          src={lesson.picture}
                          alt={lesson.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <PlayCircle className="text-white" size={24} />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Part {idx + 1}</span>
                          <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">• {lesson.duration}</span>
                        </div>
                        <h4 className="text-sm font-black text-slate-900 truncate uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                          {lesson.title}
                        </h4>
                        <p className="text-slate-500 text-[11px] font-medium line-clamp-1 mt-1 italic">
                          {lesson.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                        <button
                          onClick={() => handleEdit(lesson)}
                          className="p-3 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all shadow-sm"
                          title="Chỉnh sửa"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(lesson.id)}
                          className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-sm"
                          title="Xóa"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

