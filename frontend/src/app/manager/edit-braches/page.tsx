/** @format */
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
  branchId: z.string(),
});

interface Branch {
  branchName: string;
  city: string;
  street: string;
}

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      branchId: "",
    },
  });

  const [branch, setBranch] = useState<Branch | null>(null);

  const fetchBranch = async () => {
    const id = window.localStorage.getItem("branchId");
    if (!id) return;
    try {
      const response = await axios.get(`http://localhost:3000/branch/${id}`);
      setBranch(response.data);
    } catch (error) {
      console.error("Error fetching branch:", error);
    }
  };

  const updateBranch = async () => {
    const id = window.localStorage.getItem("branchId");
    if (!id || !branch) return;
    try {
      await axios.put(`http://localhost:3000/branch/${id}`, branch);
      alert("Branch details updated successfully");
    } catch (error) {
      console.error("Error updating branch:", error);
    }
  };

  useEffect(() => {
    fetchBranch();
  }, []);

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Branch Details" />
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
                  fetchBranch();
                })}
                className="max-w-md w-full flex flex-col gap-4"
              >
                {branch && (
                  <>
                    <FormItem>
                      <FormLabel className="font-bold">Branch Name</FormLabel>
                      <FormControl>
                        <Input
                          value={branch.branchName}
                          onChange={(e) =>
                            setBranch({
                              ...branch,
                              branchName: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormLabel className="font-bold">City</FormLabel>
                      <FormControl>
                        <Input
                          value={branch.city}
                          onChange={(e) =>
                            setBranch({
                              ...branch,
                              city: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormLabel className="font-bold">Street</FormLabel>
                      <FormControl>
                        <Input
                          value={branch.street}
                          onChange={(e) =>
                            setBranch({
                              ...branch,
                              street: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </FormItem>
                  </>
                )}
                <Button
                  type="button"
                  onClick={updateBranch}
                  className="w-full font-bold"
                >
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
