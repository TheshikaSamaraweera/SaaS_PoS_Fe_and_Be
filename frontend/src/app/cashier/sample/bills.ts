import axios from "axios";
import moment from "moment";

export const getBillsByDate = async (billDate: string) => {
  try {
    const response = await axios.get(`http://localhost:3000/bill/date/${billDate}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching bills by date:", error);
    throw error;
  }
};

export const getBillsByCashierId = async (cashierId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/bill/cashier/${cashierId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching bills by cashierId:", error);
    throw error;
  }
};

export const getBillsByBranchId = async (branchId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/bill/branch/${branchId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching bills by branchId:", error);
    throw error;
  }
};
