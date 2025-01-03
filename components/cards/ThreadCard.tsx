import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import DeleteThread from "../forms/DeleteThread";

interface Props {
    id: string;
    currentUserId: string;
    parentId: string | null;
    content: string;
    author: {
      name: string;
      image: string;
      id: string;
      username: string;
    };
    community: {
      id: string;
      name: string;
      image: string;
    } | null;
    createdAt: string;
    comments: {
      author: {
        image: string;
      };
    }[];
    isComment?: boolean;
  }

const ThreadCard = ({
    id,
    currentUserId,
    parentId,
    content,
    author,
    community,
    createdAt,
    comments,
    isComment,
  }: Props) => {
    if (!author) {
      console.error("No author data provided to ThreadCard");
      return null;
    }

    return (
        <article
          className={`flex w-full flex-col rounded-xl ${
            isComment ? "px-0 xs:px-5 py-2 pb-1" : "bg-dark-2 p-7"
          }`}
        >
          <div className='flex items-start justify-between'>
            <div className='flex w-full flex-1 flex-row gap-4'>
              <div className='flex flex-col items-center'>
                <Link href={`/profile/${author.id}`} className='relative h-11 w-11'>
                  <Image
                    src={author.image}
                    alt='user_community_image'
                    fill
                    className='cursor-pointer rounded-full'
                  />
                </Link>
    
                <div className='thread-card_bar' />
              </div>
    
              <div className='flex w-full flex-col'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <Link href={`/profile/${author.id}`} className='w-fit'>
                      <h4 className='cursor-pointer text-base-semibold text-light-1'>
                        {author.name}
                      </h4>
                    </Link>
                    <span className='text-[#d91a1a] ml-3'>
                      @{author.username}
                    </span>
                  </div>

                  {isComment ? (
                    <div className='flex items-center gap-2'>
                      <p className="text-subtle-medium text-gray-1">
                        {formatDateString(createdAt)}
                      </p>
                      <DeleteThread
                        threadId={JSON.stringify(id)}
                        currentUserId={currentUserId}
                        authorId={author.id}
                        parentId={parentId}
                        isComment={isComment}
                      />
                    </div>
                  ) : (
                    <DeleteThread
                      threadId={JSON.stringify(id)}
                      currentUserId={currentUserId}
                      authorId={author.id}
                      parentId={parentId}
                      isComment={isComment}
                    />
                  )}
                </div>
    
                <p className='mt-2 text-small-regular text-light-2'>{content}</p>

                <div className={`${isComment && "mb-1"} mt-5 flex flex-col gap-3`}>
                  <div className='flex gap-3.5'>
                    <Image
                      src='/assets/heart-gray.svg'
                      alt='heart'
                      width={24}
                      height={24}
                      className='cursor-pointer object-contain'
                    />
                    <Link href={`/thread/${id}`}>
                      <Image
                        src='/assets/reply.svg'
                        alt='heart'
                        width={24}
                        height={24}
                        className='cursor-pointer object-contain'
                      />
                    </Link>
                    <Image
                      src='/assets/repost.svg'
                      alt='heart'
                      width={24}
                      height={24}
                      className='cursor-pointer object-contain'
                    />
                    <Image
                      src='/assets/share.svg'
                      alt='heart'
                      width={24}
                      height={24}
                      className='cursor-pointer object-contain'
                    />
                  </div>

    
                  {comments.length > 0 && (
                    <Link href={`/thread/${id}`}>
                      <p className='mt-1 text-subtle-medium text-gray-1'>
                        {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                      </p>
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* {console.log("COMMTMUTNTUTITY", community)} */}
            
            {!isComment && community && (
              <Link href={`/communities/${community.id}`} className="mt-5 flex items-center">
                <p className="text-subtle-medium text-gray-1">
                  {formatDateString(createdAt)} - {community.name} Community
                </p>
              <Image
                src={community.image}
                alt={community.name}
                width={14}
                height={14}
                className="ml-1 rounded-full object-cover"
              />
              </Link>
            )}
            </div>
            {!isComment && (
              <p className="text-subtle-medium text-gray-1 mt-4">
                {formatDateString(createdAt)}
              </p>
            )}
            </article>
    )}

    export default ThreadCard;