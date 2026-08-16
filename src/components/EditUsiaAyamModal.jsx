import { useEffect, useState } from "react";
import { onlyDigits } from "../utils/moneyFormat";

export const EditUsiaAyamModal = ({ open, onClose, onSave, initialValues }) => {
  const [totalChicken, setTotalChicken] = useState("");
  const [chickenAge, setChickenAge] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setTotalChicken(
      initialValues?.totalChicken != null
        ? String(initialValues.totalChicken)
        : ""
    );
    setChickenAge(
      initialValues?.chickenAge != null ? String(initialValues.chickenAge) : ""
    );
  }, [open, initialValues]);

  if (!open) return null;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave({
        totalChicken: Number(totalChicken || 0),
        chickenAge: Number(chickenAge || 0),
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-lg p-6 rounded shadow-xl">
        <h3 className="text-lg font-bold mb-4">Edit Usia Ayam</h3>

        <label className="block mb-1 font-medium">Jumlah Ayam</label>
        <input
          type="text"
          inputMode="numeric"
          className="w-full border rounded p-2 mb-3"
          placeholder="Masukkan jumlah ayam"
          value={totalChicken}
          onChange={(e) => setTotalChicken(onlyDigits(e.target.value))}
        />

        <label className="block mb-1 font-medium">Usia Ayam (minggu)</label>
        <input
          type="text"
          inputMode="numeric"
          className="w-full border rounded p-2 mb-4"
          placeholder="Masukkan usia ayam"
          value={chickenAge}
          onChange={(e) => setChickenAge(onlyDigits(e.target.value))}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-4 py-2 rounded text-white ${
              isSaving
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-700 hover:bg-green-900 cursor-pointer"
            }`}
          >
            {isSaving ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
};
