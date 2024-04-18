import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

export default function UserProfilePage() {
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();

  if (isGetLoading) {
    return <div className="text-center text-4xl font-bold mt-5 ">Loading...</div>;
  }
  if (!currentUser) {
    return <div>Unable to load profile</div>;
  }

  return (
    <UserProfileForm
      onSave={updateUser}
      isLoading={isUpdateLoading}
      currentUser={currentUser}
    />
  );
}
