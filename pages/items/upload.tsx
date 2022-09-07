import type { NextPage } from "next";
import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import { useForm } from "react-hook-form";
import useValidation from "@libs/client/useValidation";
import { useEffect, useState } from "react";
import { Item } from "@prisma/client";
import { useRouter } from "next/router";

interface UploadItemForm {
  name: string;
  price: string;
  description: string;
  image: FileList;
}

interface UploadItemValidation {
  success: boolean;
  item: Item;
}

const Upload: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm<UploadItemForm>();
  const [ uploadItem, {loading, data}] = useValidation<UploadItemValidation>("/api/items");
  const onValid = async ({name, price, description, image}: UploadItemForm) => {
    if(loading) return;
    if (image && image.length > 0) {
      const { uploadURL } = await (await fetch(`/api/files`)).json();
      const form = new FormData();
      form.append("file", image[0], name);
      const {
        result: { id },
      } = await (await fetch(uploadURL, { method: "POST", body: form })).json();
      uploadItem({ name, price, description, photoId: id });
    } else {
      uploadItem({ name, price, description });
    }
  }

  useEffect(()=> {
    if (data?.success) {
      router.push(`/items/${data.item.id}`);
    }
  }, [data]);

  const image = watch("image");
  const [imagePreview, setImagePreview] = useState("");
  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      setImagePreview(URL.createObjectURL(file));
    }
  }, [image]);

  return (
    <Layout canGoBack title="Upload Product">
      <form className="p-4 space-y-4" onSubmit={handleSubmit(onValid)}>
        {/* upload picture */}
        <div>
        {imagePreview ? (
            <img
              src={imagePreview}
              className="w-full text-gray-600  h-46 rounded-md"
            />
          ) : (
            <label className="w-full cursor-pointer text-gray-600 hover:border-orange-500 hover:text-orange-500 flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md">
              <svg
                className="h-12 w-12"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                {...register("image")}
                accept="image/*"
                className="hidden"
                type="file"
              />
            </label>
          )}
        </div>
        {/* name */}
        <Input register={register("name", {required: true})} required label="Name" name="name" type="text" />
        {/* price */}
        <Input
          register={register("price", {required: true})}
          required
          label="Price"
          placeholder="0.00"
          name="price"
          type="text"
          kind="price"
        />
        {/* description */}
        <TextArea register={register("description", {required: true})} name="description" label="Description" required />
        {/* submit */}
        <Button text={loading ? "Loading..." : "Upload item"} />
      </form>
    </Layout>
  );
};

export default Upload;