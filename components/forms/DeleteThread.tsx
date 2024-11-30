"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { deleteThread } from "@/lib/actions/thread.actions";

interface Props {
  threadId: string;
  currentUserId: string;
  authorId: string;
  parentId: string | null;
  isComment?: boolean;
}

function DeleteThread({
  threadId,
  currentUserId,
  authorId,
  parentId,
  isComment,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  if (currentUserId !== authorId || pathname === "/") return null;

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this thread?")) {
      try {
        await deleteThread(JSON.parse(threadId), pathname);
        if (!parentId || !isComment) {
          router.push("/");
        }
      } catch (error) {
        console.error("Error deleting thread:", error);
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Image
        src='/assets/delete.svg'
        alt='delete'
        width={18}
        height={18}
        className='cursor-pointer object-contain hover:opacity-75'
        onClick={handleDelete}
      />
      <span 
        className="text-small-regular text-gray-1 cursor-pointer hover:text-red-500"
        onClick={handleDelete}
      >
        Delete
      </span>
    </div>
  );
}

export default DeleteThread;