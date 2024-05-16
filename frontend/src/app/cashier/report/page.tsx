import PageTitle from "@/components/PageTitle";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Head from "next/head";

const invoices = [
  {
    invoice: "SL001",
    paymentStatus: "Paid",
    totalAmount: "Rs. 7600.00",
    paymentMethod: "Cash",
  },
  {
    invoice: "SL002",
    paymentStatus: "Pending",
    totalAmount: "Rs. 9350.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "SL003",
    paymentStatus: "Paid",
    totalAmount: "Rs. 1250.00",
    paymentMethod: "Cash",
  },
  {
    invoice: "SL004",
    paymentStatus: "Paid",
    totalAmount: "Rs. 8400.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "SL005",
    paymentStatus: "Paid",
    totalAmount: "Rs. 6500.00",
    paymentMethod: "Cash",
  },
  {
    invoice: "SL006",
    paymentStatus: "Paid",
    totalAmount: "Rs. 4000.00",
    paymentMethod: "Cash",
  },
  {
    invoice: "SL007",
    paymentStatus: "Paid",
    totalAmount: "Rs. 3000.00",
    paymentMethod: "Credit Card",
  },
];

export default function TableDemo() {
  return (
    <>
      <Head>
        <title>Sales Report</title>
      </Head>

      <div>
        <PageTitle title="Sales Report" />

        <Table>
          <TableCaption>A list of your recent sales.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] font-bold">SalesID</TableHead>
              <TableHead className="font-bold" >Status</TableHead>
              <TableHead className="font-bold" >Method</TableHead>
              <TableHead className="text-right font-bold">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice, index) => (
              <TableRow
                key={invoice.invoice}
                className={index % 2 === 0 ? "black-100" : "black-200"}
              >
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="text-right">
                  {invoice.totalAmount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">Rs. 40100.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  );
}
