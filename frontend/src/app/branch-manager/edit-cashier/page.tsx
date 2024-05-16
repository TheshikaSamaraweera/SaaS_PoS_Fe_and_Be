"use client";
import { useEffect, useState } from "react";
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
  cashierId: z.string(),
});

interface Cashier {
  cashierFirstName: string;
  cashierLastName: string;
  cashierEmail: string;
  cashierAddress: string;
  cashierPhone: string;
  cashierDoB: string;
  cashierGender: string;
  cashierBranch: string;
}

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cashierId: "",
    },
  });

  const [cashier, setCashier] = useState<Cashier | null>(null);

  // const fetchCashier = async (id: string) => {
  //   try {
  //     const response = await axios.get(`http://localhost:3000/cashier/${id}`);
  //     setCashier(response.data);
  //   } catch (error) {
  //     console.error('Error fetching cashier:', error);
  //   }
  // };
  const fetchCashier = async () => {
    const id = window.localStorage.getItem("cashierId");
    if (!id) return;
    try {
      const response = await axios.get(`http://localhost:3000/cashier/${id}`);
      setCashier(response.data);
    } catch (error) {
      console.error("Error fetching cashier:", error);
    }
  };

  const updateCashier = async () => {
    const id = window.localStorage.getItem("cashierId");
    if (!id || !cashier) return;
    try {
      await axios.put(`http://localhost:3000/cashier/${id}`, cashier);
      alert("Cashier details updated successfully");
    } catch (error) {
      console.error("Error updating cashier:", error);
    }
  };

  // useEffect(() => {
  //   const cashierId = form.getValues().cashierId;
  //   if (cashierId) {
  //     fetchCashier(cashierId);
  //   }
  // }, [form.watch('cashierId')]);

  useEffect(() => {
    fetchCashier();
  }, []);

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Cashier Details" />
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
                onSubmit={form.handleSubmit((data) => {
                  fetchCashier();
                })}
                className="max-w-md w-full flex flex-col gap-4"
              >
                {/* <FormField
                  control={form.control}
                  name="cashierId"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-bold">Cashier Id</FormLabel>
                        <FormControl>
                          <Input placeholder="Cashier Id" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                /> */}
                {cashier && (
                  <>
                    <FormItem>
                      <FormLabel className="font-bold">First Name</FormLabel>
                      <FormControl>
                        <Input
                          value={cashier.cashierFirstName}
                          onChange={(e) =>
                            setCashier({
                              ...cashier,
                              cashierFirstName: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormLabel className="font-bold">Last Name</FormLabel>
                      <FormControl>
                        <Input
                          value={cashier.cashierLastName}
                          onChange={(e) =>
                            setCashier({
                              ...cashier,
                              cashierLastName: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormLabel className="font-bold" >E-mail</FormLabel>
                      <FormControl>
                        <Input
                          value={cashier.cashierEmail}
                          onChange={(e) =>
                            setCashier({
                              ...cashier,
                              cashierEmail: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormLabel className="font-bold" >Address</FormLabel>
                      <FormControl>
                        <Input
                          value={cashier.cashierAddress}
                          onChange={(e) =>
                            setCashier({
                              ...cashier,
                              cashierAddress: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormLabel className="font-bold" >Phone</FormLabel>
                      <FormControl>
                        <Input
                          value={cashier.cashierPhone}
                          onChange={(e) =>
                            setCashier({
                              ...cashier,
                              cashierPhone: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormLabel className="font-bold" >Date of Birth</FormLabel>
                      <FormControl>
                        <Input
                          value={cashier.cashierDoB}
                          onChange={(e) =>
                            setCashier({
                              ...cashier,
                              cashierDoB: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormLabel className="font-bold" >Gender</FormLabel>
                      <FormControl>
                        <Input
                          value={cashier.cashierGender}
                          onChange={(e) =>
                            setCashier({
                              ...cashier,
                              cashierGender: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormLabel className="font-bold" >Branch</FormLabel>
                      <FormControl>
                        <Input
                          value={cashier.cashierBranch}
                          onChange={(e) =>
                            setCashier({
                              ...cashier,
                              cashierBranch: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </FormItem>
                  </>
                )}
                <Button
                  type="button"
                  onClick={updateCashier}
                  className="w-full font-bold"
                >
                  Save
                </Button>
                {/* <Button type="submit" className="w-full font-bold">
                  Fetch Cashier
                </Button> */}
              </form>
            </Form>
          </CardContent>
        </main>
      </section>
    </div>
  );
}
