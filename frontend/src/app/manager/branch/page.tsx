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

const formSchema = z.object({
  name: z.string(),
  address: z.string(),
  // dob: z.number(),
  phoneNumber: z.string(),
  
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      // dob: 0,
      address: "",
      phoneNumber: "",
      
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch('/api/branches/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Handle success
      console.log('Branch created successfully');
    } catch (error) {
      // Handle errors
      console.error('Failed to create branch', error);
    }
  };
  

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Add Branch Manager" />
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
                  name="name"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-bold" >Name</FormLabel>
                        <FormControl>
                          <Input placeholder="your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                {/* <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-bold" >DoB</FormLabel>
                        <FormControl>
                          <Input placeholder="Date of Birth" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                /> */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-bold" >Address</FormLabel>
                        <FormControl>
                          <Input placeholder="your Address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-bold" >Phone number</FormLabel>
                        <FormControl>
                          <Input placeholder="your phone number" {...field} />
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
