import { getProfileInfo } from "@/actions";
import OnBoard from "@/components/on-board";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
export default async function OnBoardPage() {
  const user = await currentUser();
  const profileInfo = await getProfileInfo(user?.id);
  if (profileInfo?._id) {
    if (profileInfo?.role === "recruiter" && !profileInfo.isPremiumUser) {
      redirect("/membership");
    } else {
      redirect("/");
    }
  } else return <OnBoard />;
}
