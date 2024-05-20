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
  branchManagerId: z.string(),
});

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

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      branchManagerId: "",
    },
  });

  const [branchManager, setBranchManager] = useState<BranchManager | null>(null);

  const fetchBranchManager = async () => {
    const id = window.localStorage.getItem("branchManagerId");
    if (!id) return;
    try {
      const response = await axios.get(`http://localhost:3000/managers/${id}`);
      setBranchManager(response.data);
    } catch (error) {
      console.error("Error fetching branch manager:", error);
    }
  };

  const updateBranchManager = async () => {
    const id = window.localStorage.getItem("branchManagerId");
    if (!id || !branchManager) return;
    try {
      await axios.put(`http://localhost:3000/managers/${id}`, branchManager);
      alert("Branch Manager details updated successfully");
    } catch (error) {
      console.error("Error updating branch manager:", error);
    }
  };

  useEffect(() => {
    fetchBranchManager();
  }, []);

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Branch Manager Details" />
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
                  fetchBranchManager();
                })}
                className="max-w-md w-full flex flex-col gap-4"
              >
                {branchManager && (
                  <>
                    <FormItem>
                      <FormLabel className="font-bold">First Name</FormLabel>
                      <FormControl>
                        <Input
                          value={branchManager.branchManagerFirstName}
                          onChange={(e) =>
                            setBranchManager({
                              ...branchManager,
                              branchManagerFirstName: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormLabel className="font-bold">Last Name</FormLabel>
                      <FormControl>
                        <Input
                          value={branchManager.branchManagerLastName}
                          onChange={(e) =>
                            setBranchManager({
                              ...branchManager,
                              branchManagerLastName: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormLabel className="font-bold">E-mail</FormLabel>
                      <FormControl>
                        <Input
                          value={branchManager.branchManagerEmail}
                          onChange={(e) =>
                            setBranchManager({
                              ...branchManager,
                              branchManagerEmail: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormLabel className="font-bold">Address</FormLabel>
                      <FormControl>
                        <Input
                          value={branchManager.branchManagerAddress}
                          onChange={(e) =>
                            setBranchManager({
                              ...branchManager,
                              branchManagerAddress: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormLabel className="font-bold">Phone</FormLabel>
                      <FormControl>
                        <Input
                          value={branchManager.branchManagerPhone}
                          onChange={(e) =>
                            setBranchManager({
                              ...branchManager,
                              branchManagerPhone: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormLabel className="font-bold">Date of Birth</FormLabel>
                      <FormControl>
                        <Input
                          value={branchManager.branchManagerDoB}
                          onChange={(e) =>
                            setBranchManager({
                              ...branchManager,
                              branchManagerDoB: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormLabel className="font-bold">Gender</FormLabel>
                      <FormControl>
                        <Input
                          value={branchManager.branchManagerGender}
                          onChange={(e) =>
                            setBranchManager({
                              ...branchManager,
                              branchManagerGender: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormLabel className="font-bold">Branch</FormLabel>
                      <FormControl>
                        <Input
                          value={branchManager.branchManagerBranch}
                          onChange={(e) =>
                            setBranchManager({
                              ...branchManager,
                              branchManagerBranch: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </FormItem>
                  </>
                )}
                <Button
                  type="button"
                  onClick={updateBranchManager}
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
