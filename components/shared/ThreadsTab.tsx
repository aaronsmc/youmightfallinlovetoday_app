import { fetchUserPosts } from "@/lib/actions/user.actions";
import ThreadCard from "../cards/ThreadCard";
import { redirect } from "next/navigation";

interface Props {
    currentUserId: string;
    accountId: string;
    accountType: string;
    threads: any[];
}

const ThreadsTab = async ({ currentUserId, accountId, accountType, threads }: Props ) => {
    if (!threads) {
        console.error("Threads data is undefined");
        return null;
    }

    return (
  <section className="mt-9 flex flex-col gap-10">
    {threads.map((thread: any) => (
      <ThreadCard
        key={thread._id}
        id={thread._id}
        currentUserId={currentUserId}
        parentId={thread.parentId}
        content={thread.text}
        author={thread.author}
        community={thread.community} // TODO
        createdAt={thread.createdAt}
        comments={thread.children}
      />
    ))}
  </section>
);
}

export default ThreadsTab;
