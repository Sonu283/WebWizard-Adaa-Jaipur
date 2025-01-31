import { useState } from "react";

export function ReturnExchangeForm({ onSubmit }) {
  const [orderNumber, setOrderNumber] = useState("");
  const [itemName, setItemName] = useState("");
  const [action, setAction] = useState("return");
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ orderNumber, itemName, action, reason });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="orderNumber"
          className="block text-sm font-medium text-gray-700"
        >
          Order Number
        </label>
        <input
          type="text"
          id="orderNumber"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF8A00] focus:ring-[#FF8A00]"
          required
        />
      </div>
      <div>
        <label
          htmlFor="itemName"
          className="block text-sm font-medium text-gray-700"
        >
          Item Name
        </label>
        <input
          type="text"
          id="itemName"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF8A00] focus:ring-[#FF8A00]"
          required
        />
      </div>
      <div>
        <label
          htmlFor="action"
          className="block text-sm font-medium text-gray-700"
        >
          Action
        </label>
        <select
          id="action"
          value={action}
          onChange={(e) => setAction(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF8A00] focus:ring-[#FF8A00]"
        >
          <option value="return">Return</option>
          <option value="exchange">Exchange</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="reason"
          className="block text-sm font-medium text-gray-700"
        >
          Reason
        </label>
        <textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF8A00] focus:ring-[#FF8A00]"
          rows={3}
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-[#FF8A00] hover:bg-[#FF8A00]/90 text-white py-2 px-4 rounded-md transition-colors duration-200"
      >
        Submit Request
      </button>
    </form>
  );
}
