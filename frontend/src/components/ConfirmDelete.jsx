const ConfirmDelete = ({ studentName, onConfirm, onCancel }) => {
  return (
    // Background overlay
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      {/* Popup card */}
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-semibold mb-4 text-center text-red-600">
          Confirm Delete
        </h2>

        <p className="text-gray-700 text-center mb-6">
          Are you sure you want to delete{" "}
          <span className="font-bold">{studentName}</span>? This action cannot
          be undone.
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onCancel}
            className="px-6 py-2 rounded-md border border-gray-300 cursor-pointer hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 cursor-pointer rounded-md bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
