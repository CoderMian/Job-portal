import { currentUser } from "@clerk/nextjs/server";
import Header from "../Header";
import { getProfileInfo } from "@/actions";

export default async function CommonLayout({ children }) {
  const user = await currentUser();
  const profileInfo = await getProfileInfo(user?.id);
  return (
    <>
      <div className="mx-auto max-w-7xl p-6 lg:px-8">
        <Header
          user={JSON.parse(JSON.stringify(user))}
          profileInfo={profileInfo}
        />
        <main>{children}</main>
      </div>
    </>
  );
}
