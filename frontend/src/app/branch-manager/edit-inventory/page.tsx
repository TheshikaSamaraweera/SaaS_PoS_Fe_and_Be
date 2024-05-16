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
  itemID: z.string(),
});

interface Item {
  itemID: string;
  itemName: string;
  quantity: string;
  supply: string;
  date: string;
  unitPrice: string;
  sellPrice: string;
  description: string;
  category: string;
  
}

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemID: "",
    },
  });

  const [item, setItem] = useState< Item | null>(null);

  // const fetchCashier = async (id: string) => {
  //   try {
  //     const response = await axios.get(`http://localhost:3000/cashier/${id}`);
  //     setCashier(response.data);
  //   } catch (error) {
  //     console.error('Error fetching cashier:', error);
  //   }
  // };
  const fetchItems = async () => {
    const id = window.localStorage.getItem("itemID");
    if (!id) return;
    try {
      const response = await axios.get(`http://localhost:3000/inventory/${id}`);
      setItem(response.data);
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  };

  const updateItem = async () => {
    const id = window.localStorage.getItem("itemID");
    if (!id || !item) return;
    try {
      await axios.put(`http://localhost:3000/inventory/${id}`, item);
      alert("Item details updated successfully");
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // useEffect(() => {
  //   const cashierId = form.getValues().cashierId;
  //   if (cashierId) {
  //     fetchCashier(cashierId);
  //   }
  // }, [form.watch('cashierId')]);

  useEffect(() => {
    fetchItems();
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
                  fetchItems();
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
                {item && (
                  <>
                    <FormItem>
                      <FormLabel className="font-bold" >Item Name</FormLabel>
                      <FormControl>
                        <Input
                          value={item.itemName}
                          onChange={(e) =>
                            setItem({
                              ...item,
                              itemName: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormLabel className="font-bold" >Quantity</FormLabel>
                      <FormControl>
                        <Input
                          value={item.quantity}
                          onChange={(e) =>
                            setItem({
                             ...item,
                              quantity: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormLabel className="font-bold" >Supply</FormLabel>
                      <FormControl>
                        <Input
                          value={item.supply}
                          onChange={(e) =>
                            setItem({
                             ...item,
                              supply: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormLabel className="font-bold" >Date</FormLabel>
                      <FormControl>
                        <Input
                          value={item.date}
                          onChange={(e) =>
                            setItem({
                             ...item,
                              date: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormLabel className="font-bold" >Unit Price</FormLabel>
                      <FormControl>
                        <Input
                          value={item.unitPrice}
                          onChange={(e) =>
                            setItem({
                             ...item,
                              unitPrice: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormLabel className="font-bold" >Sell Price</FormLabel>
                      <FormControl>
                        <Input
                          value={item.sellPrice}
                          onChange={(e) =>
                            setItem({
                             ...item,
                              sellPrice: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormLabel className="font-bold" >Description</FormLabel>
                      <FormControl>
                        <Input
                          value={item.description}
                          onChange={(e) =>
                            setItem({
                             ...item,
                              description: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormLabel className="font-bold" >Category</FormLabel>
                      <FormControl>
                        <Input
                          value={item.category}
                          onChange={(e) =>
                            setItem({
                             ...item,
                              category: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </FormItem>
                    
                  </>
                )}
                <Button
                  type="button"
                  onClick={updateItem}
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
