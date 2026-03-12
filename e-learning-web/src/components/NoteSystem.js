import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Plus, Trash2, Edit3, Save, X, Clock } from 'lucide-react';

const API_URL = 'http://localhost:3636';

const NoteSystem = ({ lessonId, userId }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editingNote, setEditingNote] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/notes?lessonId=${lessonId}&userId=${userId}`);
      setNotes(res.data.sort((a, b) => b.timestamp - a.timestamp));
      setLoading(false);
    } catch (err) {
      console.error('Error fetching notes:', err);
      setLoading(false);
    }
  }, [lessonId, userId]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    try {
      const noteData = {
        userId,
        lessonId,
        content: newNote,
        timestamp: Date.now()
      };
      const res = await axios.post(`${API_URL}/notes`, noteData);
      setNotes([res.data, ...notes]);
      setNewNote('');
    } catch (err) {
      console.error('Error adding note:', err);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`${API_URL}/notes/${id}`);
      setNotes(notes.filter(note => note.id !== id));
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  const handleEditStart = (note) => {
    setEditingNote(note.id);
    setEditContent(note.content);
  };

  const handleEditSave = async (id) => {
    try {
      const res = await axios.patch(`${API_URL}/notes/${id}`, { content: editContent });
      setNotes(notes.map(note => note.id === id ? res.data : note));
      setEditingNote(null);
    } catch (err) {
      console.error('Error updating note:', err);
    }
  };


  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit',
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="flex items-center gap-2 mb-8">
        <Edit3 className="text-blue-600" size={20} />
        <h3 className="text-xl font-black text-slate-900 tracking-tight">Ghi chú của tôi</h3>
      </div>

      <form onSubmit={handleAddNote} className="mb-8">
        <div className="relative group">
          <textarea 
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 min-h-[120px] focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none text-slate-700 placeholder:text-slate-400 font-medium"
            placeholder="Bạn đang nghĩ gì về bài học này?"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          ></textarea>
          <div className="absolute bottom-3 right-3 flex items-center gap-3">
             <button 
              type="submit"
              disabled={!newNote.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-100 active:scale-95 flex items-center gap-2"
            >
              <Plus size={18} />
              Lưu ghi chú
            </button>
          </div>
        </div>
      </form>

      <div className="space-y-4">
        {loading ? (
          <div className="space-y-3">
            {[1, 2].map(i => <div key={i} className="h-24 bg-slate-50 animate-pulse rounded-xl border border-slate-100"></div>)}
          </div>
        ) : notes.length > 0 ? (
          notes.map(note => (
            <div 
              key={note.id} 
              className="bg-white border border-slate-100 hover:border-blue-100 hover:shadow-md p-5 rounded-xl transition-all duration-300 group"
            >
              {editingNote === note.id ? (
                <div className="space-y-3 scale-up-sm">
                  <textarea 
                    autoFocus
                    className="w-full bg-slate-50 border border-blue-200 rounded-lg p-3 min-h-[100px] focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all resize-none text-slate-700 font-medium"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => setEditingNote(null)}
                      className="p-2 text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest"
                    >
                      <X size={16} /> Hủy
                    </button>
                    <button 
                      onClick={() => handleEditSave(note.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-100 flex items-center gap-1.5"
                    >
                      <Save size={16} /> Lưu lại
                    </button>
                  </div>
                </div>
              ) : (
                <div className="animate-in fade-in duration-300">
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                      <Clock size={12} />
                      {formatTime(note.timestamp)}
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEditStart(note)}
                        className="p-1.5 hover:bg-slate-50 rounded-md text-slate-400 hover:text-blue-600 transition-colors"
                        title="Chỉnh sửa"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteNote(note.id)}
                        className="p-1.5 hover:bg-slate-50 rounded-md text-slate-400 hover:text-rose-600 transition-colors"
                        title="Xóa"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm whitespace-pre-wrap leading-relaxed font-medium">
                    {note.content}
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12 px-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl">
            <div className="w-16 h-16 bg-white rounded-full border border-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-300 shadow-sm">
               <Edit3 size={24} />
            </div>
            <p className="text-slate-900 font-black text-sm uppercase tracking-tighter">Bạn chưa có ghi chú nào</p>
            <p className="text-slate-400 text-xs mt-1 font-medium italic">Ghi lại những ý chính để ôn tập dễ dàng hơn!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteSystem;
