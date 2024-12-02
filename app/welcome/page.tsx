import Image from 'next/image';
import Link from 'next/link';
import '../globals.css';
import { Fuzzy_Bubbles } from 'next/font/google';

const fuzzyBubbles = Fuzzy_Bubbles({
  subsets: ['latin'],
  weight: ['400', '700'],  // Available weights for Fuzzy Bubbles
});

export default function Welcome() {
  return (
    <div className="welcome-container">
      <div className="flex flex-col items-center text-center max-w-3xl lg:max-w-5xl mx-auto px-6 relative z-10 pt-12 md:pt-16">
        <div className="flex flex-col md:flex-row items-center justify-between w-full mb-6 gap-4">
          <h1 className={`welcome-title ${fuzzyBubbles.className}`}>
            You might fall in love <span className="text-primary-500">today</span>!
          </h1>
          <Link href="/sign-in" className={`welcome-button inline-block ${fuzzyBubbles.className}`}>
            Come On In!
          </Link>
        </div>
        
        <div className={`text-gray-700 space-y-6 ${fuzzyBubbles.className} text-lg`}>
          <p>
            This is a phrase that really stuck with me for a really long time. It's not necessarily referring to a person, it could be anything; a new book, new song, sunsets, milestones, new friends, beautiful moments with your family - you never know what today has in store for you. This is a platform to just share and express those moments.
          </p>
          <p>
            I've lost friends and known people who passed from suicide, and I'm also no stranger to depression. Even the small things you share can inspire love in another person's day - and it really makes a difference.
          </p>
          <p>
            I just hope more and more people can see and be reminded of all the love there is to feel and experience in our lives, and for everyone to just be happy.  <p> (Huge thank you to my sister for her amazing designs and creative direction). </p>
          </p>
        </div>
      </div>

      <Image
        src="/assets/WelcomeAnimation.gif"
        alt="Welcome Animation"
        width={800}
        height={800}
        priority
        unoptimized
        className="welcome-image mb-8"
        style={{ transform: 'translateX(80px)' }}
      />
    </div>
  );
}