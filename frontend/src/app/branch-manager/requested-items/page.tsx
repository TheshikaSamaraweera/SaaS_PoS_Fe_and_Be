"use client";

import { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Modal from "react-modal";

interface RequestItem {
  companyName: string;
  requestedBranch: string;
  requestedCashier: string;
  requestedItemCode: string;
  requestedItemName: string;
  requestedQuantity: number;
  requestedDate: string;
  requestedSupply: string;
}

export default function ShowRequestedItems() {
  const [requestedItems, setRequestedItems] = useState<RequestItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<RequestItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchRequestedItems = async () => {
    try {
      const response = await fetch("http://localhost:3000/request");
      const data: RequestItem[] = await response.json();
      setRequestedItems(data);
    } catch (error) {
      console.error("Error fetching requested items:", error);
    }
  };

  useEffect(() => {
    fetchRequestedItems();
  }, []);

  const handleRowClick = (item: RequestItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Requested Items" />

      <Table>
        <TableCaption>A list of requested items.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">Company</TableHead>
            <TableHead className="font-bold">Branch</TableHead>
            <TableHead className="font-bold">Cashier</TableHead>
            <TableHead className="font-bold">Item Code</TableHead>
            <TableHead className="font-bold">Item Name</TableHead>
            <TableHead className="font-bold">Quantity</TableHead>
            <TableHead className="font-bold">Date</TableHead>
            <TableHead className="font-bold">Supply</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requestedItems.map((item, index) => (
            <TableRow
              key={index}
              className={index % 2 === 0 ? "black-100" : "black-200"}
              onClick={() => handleRowClick(item)}
            >
              <TableCell>{item.companyName}</TableCell>
              <TableCell>{item.requestedBranch}</TableCell>
              <TableCell>{item.requestedCashier}</TableCell>
              <TableCell>{item.requestedItemCode}</TableCell>
              <TableCell>{item.requestedItemName}</TableCell>
              <TableCell>{item.requestedQuantity}</TableCell>
              <TableCell>{item.requestedDate}</TableCell>
              <TableCell>{item.requestedSupply}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Item Details"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "20px",
            width: "80%",
          },
        }}
      >
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="close-button"
              onClick={() => setIsModalOpen(false)}
            >
              X
            </button>
            <h2>Item Details</h2>
            {selectedItem && (
              <>
                <p>
                  <strong>Company:</strong> {selectedItem.companyName}
                </p>
                <p>
                  <strong>Branch:</strong> {selectedItem.requestedBranch}
                </p>
                <p>
                  <strong>Cashier:</strong> {selectedItem.requestedCashier}
                </p>
                <p>
                  <strong>Item Code:</strong> {selectedItem.requestedItemCode}
                </p>
                <p>
                  <strong>Item Name:</strong> {selectedItem.requestedItemName}
                </p>
                <p>
                  <strong>Quantity:</strong> {selectedItem.requestedQuantity}
                </p>
                <p>
                  <strong>Date:</strong> {selectedItem.requestedDate}
                </p>
                <p>
                  <strong>Supply:</strong> {selectedItem.requestedSupply}
                </p>
              </>
            )}
            <button
              onClick={() => setIsModalOpen(false)}
              className="secondary-close-button"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
