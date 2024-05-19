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
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
import PageTitle from "@/components/PageTitle";
import { CardContent } from "@/components/Card";
import axios from "axios";
import Image from 'next/image';

const formSchema = z.object({
  cashierId: z.string(),
  cashierFirstName: z.string(),
  cashierLastName: z.string(),
  cashierEmail: z.string(),
  cashierAddress: z.string(),
  cashierPhone: z.string(),
  cashierDoB: z.string(),
  cashierGender: z.string(),
  cashierBranch: z.string(),
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cashierId: "",
      cashierFirstName: "",
      cashierLastName: "",
      cashierEmail: "",
      cashierAddress: "",
      cashierPhone: "",
      cashierDoB: "",
      cashierGender: "",
      cashierBranch: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post('http://localhost:3000/cashier', values);
      console.log('Cashier added:', response.data);
      alert(`${response.data.cashierFirstName} added as cashier`);
      form.reset();  // Clear the form after successful submission
    } catch (error) {
      console.error('Error creating cashier:', error);
      alert('Error creating cashier');
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Add new item" />
      <section>
        <main className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <CardContent className="lg:col-span-1 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Insert Image"
                className="w-64 h-64 mb-4"
                aria-placeholder="empty"
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
                />
                <FormField
                  control={form.control}
                  name="cashierFirstName"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-bold">Cashier First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="First Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="cashierLastName"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-bold">Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Last Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="cashierEmail"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-bold">Cashier Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="cashierAddress"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-bold">Cashier Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="cashierPhone"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-bold">Cashier Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Phone Number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="cashierDoB"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-bold">Cashier Date of Birth</FormLabel>
                        <FormControl>
                          <Input type="date" placeholder="Date of Birth" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="cashierGender"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-bold">Cashier Gender</FormLabel>
                        <FormControl>
                          <Input placeholder="Gender" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="cashierBranch"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-bold">Cashier Branch</FormLabel>
                        <FormControl>
                          <Input placeholder="Branch" {...field} />
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
