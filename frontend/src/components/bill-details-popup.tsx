import React from "react";
import "../../styles/pos.css"; // Adjust the import path as needed

interface BillItem {
  label: string;
  amount: number;
  count: number;
}

interface BillDetails {
  billId: string;
  cashierId: string;
  branchId: string;
  items: BillItem[];
  totalAmount: number;
  billDate: string;
  billTime: string;
}

interface BillDetailsPopupProps {
  isVisible: boolean;
  onClose: () => void;
  billDetails: BillDetails | null; // Allow null for initial state
}

const BillDetailsPopup: React.FC<BillDetailsPopupProps> = ({
  isVisible,
  onClose,
  billDetails,
}) => {
  if (!isVisible || !billDetails) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* <button className="close-button" onClick={onClose}>
          X
        </button> */}
        <h2 className="font-bold">Invoice</h2>
        <p>
          <strong>Bill ID:</strong> {billDetails.billId}
        </p>
        <p>
          <strong>Cashier ID:</strong> {billDetails.cashierId}
        </p>
        <p>
          <strong>Branch ID:</strong> {billDetails.branchId}
        </p>
        <table className="bill-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {billDetails.items.map((item) => (
              <tr key={item.label}>
                <td>{item.label}</td>
                <td>{item.count}</td>
                <td>{item.amount}</td>
                <td>{item.amount * item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Total Amount: Rs. {billDetails.totalAmount.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default BillDetailsPopup;
