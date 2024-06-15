import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useFormContext } from "react-hook-form";

export default function ImageSection() {
  const { control, setValue, watch } = useFormContext();
  const existingImageUrl = watch("imageUrl");
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setValue("imageFile", e.target.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Image</h2>
        <FormDescription>Upload an image for your restaurant</FormDescription>
      </div>
      <div className="flex flex-col gap-8 md:w-[50%]">
        {existingImageUrl ? (
          <AspectRatio ratio={16 / 9} className="w-full rounded-lg">
            <img
              src={existingImageUrl}
              alt="restaurant image"
              className="w-full rounded-lg object-cover h-full"
            />
          </AspectRatio>
        ) : (
          <img src={""} alt="restaurant image" className="w-full rounded-lg" />
        )}
        <FormField
          control={control}
          name="imageFile"
          render={() => (
            <FormItem>
              <FormControl>
                <Input
                  type="file"
                  className="bg-white"
                  accept=".jpeg, .jpg, .png"
                  onChange={handleFileChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
