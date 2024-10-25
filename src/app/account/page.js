import AccountInfo from "@/components/account-info";
import { getProfileInfo } from "@/actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const AccountPage = async () => {
  const user = await currentUser();
  const profileInfo = await getProfileInfo(user?.id);
  if (!profileInfo) redirect("/onboard");
  return (
    <>
      <AccountInfo profileInfo={profileInfo} />
    </>
  );
};

export default AccountPage;
