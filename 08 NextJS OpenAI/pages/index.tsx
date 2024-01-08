import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

// import { Logo } from '../components/Logo';
import HeroImage from "../public/hero.webp";

export default function Home(): JSX.Element {
  const { user } = useUser();
  // console.log("user:", user);

  return (
    <React.Fragment>
      <div className="w-screen h-screen overflow-hidden flex justify-center items-center relative">
        <Image src={HeroImage} alt="Hero" fill className="absolute" />
        <div className="relative z-10 text-white px-10 py-5 text-center max-w-screen-sm bg-slate-900/90 rounded-md backdrop-blur-sm">
          {/* <Logo /> */}
          <p>
            The AI-powered SAAS solution to generate SEO-optimized blog posts in minutes. Get high-quality content, without
            sacrificing your time.
          </p>
          {user ? (
            <React.Fragment>
              <Link href="/api/auth/logout" className="btn text-left">
                Logout
              </Link>
              <Image src={user.picture!} alt={user.name!} width={50} height={50} />
              {user.name}
              <br />
              {user.email}
            </React.Fragment>
          ) : (
            <Link href="/api/auth/login" className="btn text-left">
              Login
            </Link>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
