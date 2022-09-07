import type { NextPage } from "next";
import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useValidation from "@libs/client/useValidation";
import { CustomerProfilesEntityAssignmentsPage } from "twilio/lib/rest/trusthub/v1/customerProfiles/customerProfilesEntityAssignments";

interface EditProfileForm {
  email?: string;
  phone?: string;
  name?: string;
  avatar?: FileList;
  formErrors?: string;
}

interface EditProfileResponse {
  success: boolean;
  error?: string;
}

const EditProfile: NextPage = () => {
  // TODO: do the useUser on app and then take parameter to avoid useUser on login page...
  const { user } = useUser();
  const {register, setValue, handleSubmit, setError, formState: {errors}, watch} = useForm<EditProfileForm>();

  useEffect(() => {
    if (user?.name) setValue("name", user.name);
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", user.phone);
    if (user?.avatar) setAvatarPreview(`https://imagedelivery.net/Qb7PA1G1cVeln13aN4KZiQ/${user?.avatar}/avatar`); //TODO: make this into a function
  }, [user]);

  const [editProfile, {data, loading}] = useValidation<EditProfileResponse>(`/api/users/me`);
  const onValid = async ({email, phone, name, avatar}: EditProfileForm) => {
    if(loading) return;
    if (email === "" && phone === "" && name === "") {
      return setError("formErrors", {message: "Email OR Phone number required. You need to provide at least one information."});
    }
    if (avatar && avatar.length > 0 && user) {
      const {  uploadURL } = await (await fetch(`/api/files`)).json();
      const form = new FormData();
      form.append("file", avatar[0], user.id + "");
      const {result: {id}} = await (
        await fetch(uploadURL, {
          method: "POST",
          body: form,
      })).json();      

      editProfile({
        email, 
        phone,
        name,
        avatarId: id,
      });

    } else {
      editProfile({
        email, 
        phone,
        name,
      });
    }
  }

  useEffect(() => {
    if(data && !data.success && data.error) {
      return setError("formErrors", {message: data.error});
    }
  }, [data, setError]);

  const [avatarPreview, setAvatarPreview] = useState("");

  const avatar = watch("avatar");
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0]; // the image is in the browser memory
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);

  return (
    <Layout canGoBack title="Edit Profile">
      <form onSubmit={handleSubmit(onValid)} className="py-10 px-4 space-y-4">
        {/* change profile image */}
        <div className="flex items-center space-x-3">
          {avatarPreview ? 
            <img src={avatarPreview} className="w-14 h-14 rounded-full bg-slate-500" />
           : <div className="w-14 h-14 rounded-full bg-slate-500" />
          }
          <label
            htmlFor="picture"
            className="cursor-pointer py-2 px-3 border hover:bg-gray-50 border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
          >
            Change profile image
            <input
            {...register("avatar")}
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        {/* name */}
        <Input
          register={register("name")}
          required={false}
          label="Name"
          name="name"
          type="text"
          kind="text"
        />
        {/* email address */}
        <Input register={register("email")} required={false} label="Email address" name="email" type="email" />
        {/* phone number */}
        <Input
          register={register("phone")}
          required={false}
          label="Phone number"
          name="phone"
          type="number"
          kind="phone"
        />
        { errors.formErrors ? <span className="my-2 text-red-500 font-bold text-center block">{errors.formErrors.message}</span> : null }
        {/* submit */}
        <Button text={loading ? "Loading..." : "Update profile"} />
      </form>
    </Layout>
  );
};

export default EditProfile;