import React from "react";

export default function ConfirmDeleteModal({
  isOpen,
  title = "Xác nhận xóa",
  message = "Bạn có chắc muốn xóa mục này?",
  confirmText = "Xóa",
  cancelText = "Hủy",
  loading = false,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h3 className="text-lg font-black text-text-main">{title}</h3>
        </div>

        <div className="px-6 py-5">
          <p className="text-sm text-text-muted leading-relaxed">{message}</p>
        </div>

        <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors disabled:opacity-60"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors disabled:opacity-60"
          >
            {loading ? "Đang xóa..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
