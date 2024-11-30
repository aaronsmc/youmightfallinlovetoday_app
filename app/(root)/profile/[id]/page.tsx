import Link from 'next/link';
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { profileTabs } from "@/constants";
import { fetchUser } from "@/lib/actions/user.actions";

async function Page({ params }: { params: { id: string } }) {
  console.log("1. Incoming params:", params);
  
  const user = await currentUser();
  console.log("2. Current user:", user?.id);
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  console.log("3. User info:", userInfo?.id);

  // Extract id and handle undefined case
  const profileId = params?.id === 'undefined' ? user.id : params?.id;
  console.log("4. Profile ID we're trying to fetch:", profileId);
  // If no valid ID, redirect to user's own profile
  if (!profileId) {
    redirect(`/profile/${user.id}`);
  }

  const profileUser = await fetchUser(profileId);
  console.log("5. Profile user found:", profileUser?.id);
  if (!profileUser) {
    redirect(`/profile/${user.id}`);
  }

  return (
    <section>
      <ProfileHeader
        accountId={profileUser.id}
        authUserId={user.id}
        name={profileUser.name}
        username={profileUser.username}
        imgUrl={profileUser.image}
        bio={profileUser.bio}
      />

      <div className='mt-9'>
        <Tabs defaultValue='threads' className='w-full'>
          <TabsList className='tab'>
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className='tab'>
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className='object-contain'
                />
                <p className='max-sm:hidden'>{tab.label}</p>

                {tab.label === "Threads" && (
                  <p className='ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
                    {userInfo.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className='w-full text-light-1'
            >
              {/* @ts-ignore */}
              <ThreadsTab
                currentUserId={user.id}
                accountId={profileUser.id}
                accountType='User'
                threads={profileUser.threads || []}
              />
            </TabsContent>
          ))}
        </Tabs>

        <Link href={`/profile/${user.id}`} className="text-blue-500 hover:underline">
          Go to My Profile
        </Link>
      </div>
    </section>
  );
}

export default Page;