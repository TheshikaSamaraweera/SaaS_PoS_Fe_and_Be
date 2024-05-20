"use client";
import { v4 as uuidv4 } from 'uuid';
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
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import PageTitle from "@/components/PageTitle";
import { CardContent } from "@/components/Card";
import axios from "axios";

// Enhanced validation schema
const formSchema = z.object({
  branchManagerId: z.string(),
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
      branchManagerGender: undefined,
      branchManagerBranch: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post('http://localhost:3000/branch-manager', values);
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
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Branch Manager Id</FormLabel>
                      <FormControl>
                        <Input placeholder="Branch Manager Id" {...field} />
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
                      <FormLabel className="font-bold">Branch Manager First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-600" />
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
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="branchManagerEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Branch Manager Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="branchManagerAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Branch Manager Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Address" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="branchManagerPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Branch Manager Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone Number" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="branchManagerDoB"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Branch Manager Date of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" placeholder="Date of Birth" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="branchManagerGender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Branch Manager Gender</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <Input placeholder="Gender" value={field.value} readOnly />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="branchManagerBranch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Branch Manager Branch</FormLabel>
                      <FormControl>
                        <Input placeholder="Branch" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-600" />
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
