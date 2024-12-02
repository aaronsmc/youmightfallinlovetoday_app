import Image from 'next/image';
import Link from 'next/link';
import '../globals.css'

export default function Welcome() {
  return (
    <div className="container" style={{ textAlign: 'center' }}>
      <Image
        src="/assets/WelcomeAnimation.gif"
        alt="Welcome Animation"
        width={1000}
        height={1000}
        priority
        unoptimized
        className="image"
        style={{ display: 'block', margin: '0 auto' }}
      />
      <h1>Welcome to Our Site!</h1>
      <p>Experience the best we have to offer.</p>
      <Link 
        href="/sign-in"
        className="signInButton"
      >
        Sign In
      </Link>
    </div>
  );
}