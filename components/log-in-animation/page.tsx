"use client";

import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Animation = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/sign-in'); // Redirect to sign-in page
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-dark-1">
      <Image
        src="/Users/aaronchoi/Desktop/threads/public/assets/YMFILT_Animation1.GIF"  // Add your GIF file to the public folder
        alt="Loading..."
        width={300}
        height={300}
        className="object-contain mb-4"
      />
      <button
        onClick={handleButtonClick}
        className="px-4 py-2 bg-primary-500 text-white rounded-md"
      >
        Share with Us
      </button>
    </div>
  );
};

export default Animation;