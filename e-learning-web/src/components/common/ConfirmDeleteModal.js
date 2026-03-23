import React from "react";
import { X, AlertCircle } from "lucide-react";

export default function ConfirmDeleteModal({
  isOpen,
  title = "Xác nhận",
  message = "Bạn có chắc muốn thực hiện hành động này?",
  confirmText = "Xác nhận",
  cancelText = "Hủy",
  loading = false,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-hidden">
      <div className="w-full max-w-sm rounded-lg bg-white shadow-xl flex flex-col">
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
          <h3 className="text-base font-bold text-gray-900">{title}</h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-6 flex gap-4">
          <div className="w-10 h-10 bg-red-50 text-red-500 rounded-full flex items-center justify-center shrink-0">
            <AlertCircle size={24} />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500 leading-relaxed">{message}</p>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 rounded-b-lg">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-6 py-2 rounded shadow-sm bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-all disabled:opacity-50"
          >
            {loading ? "Đang xử lý..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
