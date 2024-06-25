"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/PageTitle";
import { CardContent } from "@/components/Card";
import axios from "axios";

const formSchema = z.object({
  companyName: z.string(),
  requestedBranch: z.string(),
  requestedCashier: z.string(),
  requestedItemCode: z.string(),
  requestedItemName: z.string(),
  requestedQuantity: z.preprocess(
    (val) => Number(val),
    z.number().positive().int()
  ),
  requestedDate: z.string(),
  requestedSupply: z.string(),
});

export default function RequestItem() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      requestedBranch: "",
      requestedCashier: "",
      requestedItemCode: "",
      requestedItemName: "",
      requestedQuantity: 1,
      requestedDate: "",
      requestedSupply: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/request",
        values
      );
      console.log("Request created:", response.data);
      alert(`${values.requestedItemName} added to inventory successfully!`);
      form.reset();
    } catch (error) {
      console.error("Error creating request:", error);
      alert("Error creating request");
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Request New Item" />
      <section>
        <main className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <CardContent className="lg:col-span-1 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Insert Image"
                className="w-64 h-64 mb-4"
              />
              <p className="text-gray-600 text-center">
                Click or drag image to upload
              </p>
            </div>
          </CardContent>

          <CardContent className="lg:col-span-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="max-w-md w-full flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-bold">
                          Company Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Company Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="requestedBranch"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-bold">
                          Requested Branch
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Requested Branch" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="requestedCashier"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-bold">
                          Requested Cashier
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Requested Cashier" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="requestedItemCode"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-bold">Item Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Item Code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="requestedItemName"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-bold">Item Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Item Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="requestedQuantity"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-bold">Quantity</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Quantity"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="requestedDate"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-bold">Date</FormLabel>
                        <FormControl>
                          <Input placeholder="Date" type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="requestedSupply"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-bold">Supply</FormLabel>
                        <FormControl>
                          <Input placeholder="Supply" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <Button type="submit" className="w-full font-bold">
                  Submit
                </Button>
              </form>
            </Form>
          </CardContent>
        </main>
      </section>
    </div>
  );
}
