import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Edit3, Save, X, Clock } from 'lucide-react';

const API_URL = 'http://localhost:3636';

const NoteSystem = ({ lessonId, userId }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editingNote, setEditingNote] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, [lessonId]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/notes?lessonId=${lessonId}&userId=${userId}`);
      setNotes(res.data.sort((a, b) => b.timestamp - a.timestamp));
      setLoading(false);
    } catch (err) {
      console.error('Error fetching notes:', err);
      setLoading(false);
    }
  };

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
    <div className="bg-neutral-800/40 rounded-2xl p-6 border border-neutral-700/50 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="flex items-center gap-2 mb-8">
        <Edit3 className="text-indigo-400" size={20} />
        <h3 className="text-xl font-bold">Ghi chú của tôi</h3>
      </div>

      <form onSubmit={handleAddNote} className="mb-8">
        <div className="relative group">
          <textarea 
            className="w-full bg-neutral-950/50 border border-neutral-700/80 rounded-xl px-4 py-3 min-h-[120px] focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all resize-none text-neutral-200 placeholder:text-neutral-600"
            placeholder="Bạn đang nghĩ gì về bài học này?"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          ></textarea>
          <div className="absolute bottom-3 right-3 flex items-center gap-3">
             <button 
              type="submit"
              disabled={!newNote.trim()}
              className="bg-indigo-300 hover:bg-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2 rounded-lg font-medium transition-all shadow-lg active:scale-95 flex items-center gap-2"
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
            {[1, 2].map(i => <div key={i} className="h-24 bg-neutral-700/20 animate-pulse rounded-xl"></div>)}
          </div>
        ) : notes.length > 0 ? (
          notes.map(note => (
            <div 
              key={note.id} 
              className="bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700/50 p-5 rounded-xl transition-all duration-300 group"
            >
              {editingNote === note.id ? (
                <div className="space-y-3 scale-up-sm">
                  <textarea 
                    autoFocus
                    className="w-full bg-neutral-950 border border-indigo-500/30 rounded-lg p-3 min-h-[100px] focus:outline-none focus:ring-1 focus:ring-indigo-500/20 transition-all resize-none text-neutral-200"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => setEditingNote(null)}
                      className="p-2 text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5 text-sm"
                    >
                      <X size={16} /> Hủy
                    </button>
                    <button 
                      onClick={() => handleEditSave(note.id)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5"
                    >
                      <Save size={16} /> Lưu lại
                    </button>
                  </div>
                </div>
              ) : (
                <div className="animate-in fade-in duration-300">
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <div className="flex items-center gap-2 text-neutral-500 text-xs font-mono uppercase tracking-widest">
                      <Clock size={12} />
                      {formatTime(note.timestamp)}
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEditStart(note)}
                        className="p-1.5 hover:bg-neutral-800 rounded-md text-neutral-400 hover:text-indigo-400 transition-colors"
                        title="Chỉnh sửa"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteNote(note.id)}
                        className="p-1.5 hover:bg-neutral-800 rounded-md text-neutral-400 hover:text-rose-400 transition-colors"
                        title="Xóa"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="text-neutral-200 whitespace-pre-wrap leading-relaxed selection:bg-indigo-500/40">
                    {note.content}
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12 px-6 bg-neutral-900/30 border-2 border-dashed border-neutral-800/80 rounded-2xl">
            <div className="w-16 h-16 bg-neutral-800/80 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-500">
               <Edit3 size={24} />
            </div>
            <p className="text-neutral-400 font-medium">Bạn chưa có ghi chú nào cho bài tập này.</p>
            <p className="text-neutral-600 text-sm mt-1">Ghi lại những ý chính để ôn tập dễ dàng hơn!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteSystem;
