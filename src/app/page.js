import { getProfileInfo } from "@/actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
export default async function Home() {
  const user = await currentUser();
  const userProfile = await getProfileInfo(user?.id);
  if (user && !userProfile?._id) redirect("/onboard");

  return (
    <>
      <section className="home">
        <h1>Hello</h1>
      </section>
    </>
  );
}
