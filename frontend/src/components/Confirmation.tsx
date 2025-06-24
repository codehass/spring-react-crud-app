function ConfirmationModal({
	open,
	onConfirm,
	onCancel,
}: {
	open: boolean;
	onConfirm: () => void;
	onCancel: () => void;
}) {
	if (!open) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
			<div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
				<h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
				<p className="mb-6">This action cannot be undone.</p>
				<div className="flex justify-end gap-3">
					<button
						onClick={onCancel}
						className="px-4 py-2 text-gray-700 hover:text-gray-900"
					>
						Cancel
					</button>
					<button
						onClick={onConfirm}
						className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}

export default ConfirmationModal;
