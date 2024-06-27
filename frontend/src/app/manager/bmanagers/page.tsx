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
  branchManagerId: z.string().nonempty({ message: "ID is required" }),
  branchManagerFirstName: z
    .string()
    .nonempty({ message: "First name is required" }),
  branchManagerLastName: z
    .string()
    .nonempty({ message: "Last name is required" }),
  branchManagerEmail: z.string().email({ message: "Invalid email address" }),
  branchManagerAddress: z.string().nonempty({ message: "Address is required" }),
  branchManagerPhone: z
    .string()
    .regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits" }),
  branchManagerDoB: z
    .string()
    .nonempty({ message: "Date of birth is required" }),
  branchManagerGender: z.string().nonempty({ message: "Gender is required" }),
  branchManagerBranch: z.string().nonempty({ message: "Branch is required" }),
});

export default function AddBranchManager() {
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
      const response = await axios.post(
        "http://localhost:3000/branch-manager",
        values
      );
      console.log("Branch Manager added:", response.data);
      alert(`${response.data.branchManagerFirstName} added as branch manager`);
    } catch (error) {
      console.error("Error creating branch manager:", error);
      alert("Error creating branch manager");
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Add New Branch Manager" />
      <section>
        <main className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <CardContent className="lg:col-span-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="max-w-md w-full flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="branchManagerId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">
                        Branch Manager ID
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Branch Manager ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="branchManagerFirstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="branchManagerLastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="branchManagerEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="branchManagerAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="branchManagerPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="branchManagerDoB"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Date of Birth</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          placeholder="Date of Birth"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="branchManagerGender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">
                        Branch Manager Gender
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="branchManagerGender" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="branchManagerBranch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Branch</FormLabel>
                      <FormControl>
                        <Input placeholder="Branch" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
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
