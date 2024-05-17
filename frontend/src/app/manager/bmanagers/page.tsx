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
  branchManagerId: z.string(),
  branchManagerFirstName: z.string(),
  branchManagerLastName: z.string(),
  branchManagerEmail: z.string(),
  branchManagerAddress: z.string(),
  branchManagerPhone: z.string(),
  branchManagerDoB: z.string(),
  branchManagerGender: z.string(),
  branchManagerBranch: z.string(),
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      branchManagerId: "",
      branchManagerFirstName: "",
      branchManagerLastName: "",
      branchManagerEmail: "",
      branchManagerAddress: "",
      branchManagerPhone: "",
      branchManagerDoB: "",
      branchManagerGender: "",
      branchManagerBranch: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post('http://localhost:3000/managers', values);
      console.log('Branch Manager added:', response.data);
      alert(`${response.data.branchManagerFirstName} added as branch manager`);
    } catch (error) {
      console.error('Error creating branch manager:', error);
      alert('Error creating branch manager');
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Add new Branch Manager" />
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
                  name="branchManagerId"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-bold">Branch Manager Id</FormLabel>
                        <FormControl>
                          <Input placeholder="Branch Manager Id" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="branchManagerFirstName"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-bold">Branch Manager First Name</FormLabel>
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
                  name="branchManagerLastName"
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
                  name="branchManagerEmail"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-bold">Branch Manager Email</FormLabel>
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
                  name="branchManagerAddress"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-bold">Branch Manager Address</FormLabel>
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
                  name="branchManagerPhone"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-bold">Branch Manager Phone Number</FormLabel>
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
                  name="branchManagerDoB"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-bold">Branch Manager Date of Birth</FormLabel>
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
                  name="branchManagerGender"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-bold">Branch Manager Gender</FormLabel>
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
                  name="branchManagerBranch"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-bold">Branch Manager Branch</FormLabel>
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
