import React, { useState, useEffect } from 'react';
import { Save, Edit3, Plus, PlayCircle, Image as ImageIcon, Clock, FileText, X } from 'lucide-react';
import { createLesson, updateLesson } from '../../api/courses';

export default function LessonFormModal({ isOpen, onClose, courseId, onSuccess, existingLesson = null }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState({
        title: '',
        videoUrl: '',
        duration: '',
        description: '',
        picture: ''
    });

    useEffect(() => {
        if (existingLesson) {
            setForm(existingLesson);
        } else {
            setForm({
                title: '',
                videoUrl: '',
                duration: '',
                description: '',
                picture: ''
            });
        }
        setError('');
    }, [existingLesson, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, videoUrl, duration, description, picture } = form;

        if (!title.trim() || !videoUrl.trim() || !duration.trim() || !description.trim() || !picture.trim()) {
            setError("Vui lòng nhập đầy đủ tất cả các trường thông tin.");
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

        setLoading(true);
        setError('');

        try {
            if (existingLesson?.id) {
                await updateLesson(existingLesson.id, payload);
                onSuccess("Cập nhật bài học thành công!");
            } else {
                await createLesson(payload);
                onSuccess("Thêm bài học mới thành công!");
            }
            onClose();
        } catch (err) {
            setError(existingLesson?.id ? "Cập nhật bài học thất bại." : "Thêm bài học thất bại.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                    <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        {existingLesson ? <Edit3 size={20} className="text-blue-600" /> : <Plus size={20} className="text-blue-600" />}
                        {existingLesson ? "Cập nhật bài học" : "Thêm bài học mới"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-5 max-h-[80vh] overflow-y-auto custom-scrollbar">
                    {error && (
                        <div className="p-4 rounded-xl text-xs font-bold uppercase tracking-widest bg-red-50 border border-red-100 text-red-600">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tiêu đề bài học</label>
                        <div className="relative">
                            <Edit3 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            <input
                                name="title"
                                value={form.title}
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
                                value={form.videoUrl}
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
                                    value={form.duration}
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
                                    value={form.picture}
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
                                value={form.description}
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
                            disabled={loading}
                            className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            <Save size={18} />
                            {existingLesson ? "Lưu cập nhật" : "Thêm bài học"}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                if (existingLesson) setForm(existingLesson);
                                else setForm({ title: '', videoUrl: '', duration: '', description: '', picture: '' });
                                setError('');
                            }}
                            className="px-6 bg-slate-100 text-slate-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
                        >
                            Làm mới
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}