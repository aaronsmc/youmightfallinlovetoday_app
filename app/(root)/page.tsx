import { redirect } from 'next/navigation';
import { fetchPosts } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs/server";
import ThreadCard from "@/components/cards/ThreadCard";

export default async function Home() {
  console.log("Starting Home page load...");
  const user = await currentUser();
  console.log("User status:", user ? "Logged in" : "Not logged in");
  
  if (!user) {
    console.log("No user found, attempting redirect to /welcome");
    redirect('/welcome');
  }
  
  console.log("User found, continuing to load posts...");
  // If user is logged in, show the posts
  const result = await fetchPosts(1,30);
  console.log(result);

  return (
    <>
      <h1 className='head-text text-left'>Everyone's Page</h1>

      <section className='mt-9 flex flex-col gap-10'>
        {result.posts.length === 0 ? (
          <p className='no-result'>No threads found</p>
        ) : (
          <>
            {result.posts.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user?.id || ""}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section> 
      </>
     )}