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
  branchManagerFirstName: z.string().nonempty("First name is required"),
  branchManagerLastName: z.string().nonempty("Last name is required"),
  branchManagerEmail: z.string().email("Invalid email address"),
  branchManagerAddress: z.string().nonempty("Address is required"),
  branchManagerPhone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  branchManagerDoB: z.string().nonempty("Date of birth is required"),
  branchManagerGender: z.enum(["Male", "Female", "Other"], {
    required_error: "Gender is required",
  }),
  branchManagerBranch: z.string().nonempty("Branch is required"),
});

interface Branch {
  _id: string;
  branchName: string;
}

interface BranchManager {
  branchManagerFirstName: string;
  branchManagerLastName: string;
  branchManagerEmail: string;
  branchManagerAddress: string;
  branchManagerPhone: string;
  branchManagerDoB: string;
  branchManagerGender: string;
  branchManagerBranch: string;
}

export default function EditBranchManager() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      branchManagerFirstName: "",
      branchManagerLastName: "",
      branchManagerEmail: "",
      branchManagerAddress: "",
      branchManagerPhone: "",
      branchManagerDoB: "",
      branchManagerGender: "Male",
      branchManagerBranch: "", // Initialize branch manager's branch selection
    },
  });

  const [branches, setBranches] = useState<Branch[]>([]);
  const [branchManager, setBranchManager] = useState<BranchManager | null>(null);

  useEffect(() => {
    const fetchBranchManager = async () => {
      const id = window.localStorage.getItem("branchManagerId");
      if (!id) return;
      try {
        const response = await axios.get(`http://localhost:3000/branch-manager/${id}`);
        const managerData: BranchManager = response.data;
        setBranchManager(managerData);
        form.reset({
          branchManagerFirstName: managerData.branchManagerFirstName,
          branchManagerLastName: managerData.branchManagerLastName,
          branchManagerEmail: managerData.branchManagerEmail,
          branchManagerAddress: managerData.branchManagerAddress,
          branchManagerPhone: managerData.branchManagerPhone,
          branchManagerDoB: managerData.branchManagerDoB,
          branchManagerGender: managerData.branchManagerGender as "Male" | "Female" | "Other",
          branchManagerBranch: managerData.branchManagerBranch,
        });
      } catch (error) {
        console.error("Error fetching branch manager:", error);
      }
    };

    const fetchBranches = async () => {
      try {
        const response = await axios.get("http://localhost:3000/branches");
        setBranches(response.data);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranchManager();
    fetchBranches();
  }, [form]);

  const updateBranchManager = async (data: z.infer<typeof formSchema>) => {
    const id = window.localStorage.getItem("branchManagerId");
    if (!id) return;
    try {
      await axios.put(`http://localhost:3000/branch-manager/${id}`, data);
      alert("Branch Manager details updated successfully");
    } catch (error) {
      console.error("Error updating branch manager:", error);
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Edit Branch Manager Details" />
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
                onSubmit={form.handleSubmit((data) => updateBranchManager(data))}
                className="max-w-md w-full flex flex-col gap-4"
              >
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
                      <FormLabel className="font-bold">Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone" {...field} />
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
                        <Input type="date" placeholder="Date of Birth" {...field} />
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
                      <FormLabel className="font-bold">Gender</FormLabel>
                      <FormControl>
                        <Input placeholder="Gender" {...field} />
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
                        <select {...field} className="input-field">
                          <option value="">Select Branch</option>
                          {branches.map((branch) => (
                            <option key={branch._id} value={branch.branchName}>
                              {branch.branchName}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full font-bold">
                  Save
                </Button>
              </form>
            </Form>
          </CardContent>
        </main>
      </section>
    </div>
  );
}
