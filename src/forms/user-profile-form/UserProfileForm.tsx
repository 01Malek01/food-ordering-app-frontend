import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "@auth0/auth0-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"; //it's a library that helps us with validation

const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  addressLine1: z.string().min(1, "Name is required"),
  city: z.string().min(1, "Name is required"),
  country: z.string().min(1, "Name is required"),
});

export type UserFormData = z.infer<typeof formSchema>; //let the zod library detect the properties and types of the object

type Props = {
  currentUser: User;
  onSave: (userProfileData: UserFormData) => void;
  isLoading: boolean;
  title?: string;
  buttonText?: string;
};
function UserProfileForm({
  isLoading,
  onSave,
  currentUser,
  title = "User Profile",
  buttonText = "Submit",
}: Props) {
  const form = useForm<UserFormData>({
    //resolver to handle stuff like validation
    resolver: zodResolver(formSchema),
    defaultValues: currentUser, //auto populate the form with the current user
  });
  const { handleSubmit, control } = form;
  useEffect(() => {
    form.reset(currentUser); //rerender the form when the user changes
  }, [currentUser, form]);
  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSave)}
        className="space-y-4 bg-gray-50 rounded-lg md:p-10"
      >
        <h2 className="text-2xl font-bold">{title}</h2>
        <FormDescription>Update your user profile</FormDescription>
        <FormField
          //tell it that it's controlled by react hook form
          control={control}
          name="email"
          //render the form field with a callback function that takes a destructured field prop
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              {/* form control  to display errors */}
              <FormControl>
                {/* input field that's controlled by react hook form so we pass ...field as it contains info and properties about this field state like err messages or if the user accessed the field   */}
                <Input {...field} disabled className="bg-white" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={control}
            name="addressLine1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Line 1</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="city"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit">{buttonText}</Button>
        )}
      </form>
    </Form>
  );
}

export default UserProfileForm;
