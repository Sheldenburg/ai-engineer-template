import Image from "next/image";
import {ModeToggle} from "@/components/dark-mode-toggle";
import {PlusIcon} from "@heroicons/react/20/solid";
import {buttonVariants} from "@/components/ui/button";
import {FaGithub} from "react-icons/fa";
import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils";
import Link from "next/link";
import GitHubStars from "@/components/github-star";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        {/* <Badge variant="outline" className="text-sm gap-2">
          <FaGithub className="w-6 h-6 text-black dark:text-white" />
          <Link href="https://github.com/Sheldenburg/nextjs-fastapi-template">
             Get started
          </Link>
        </Badge> */}
        <GitHubStars />
        {/* <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-100 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by&nbsp;
          <code className="font-mono font-bold">
            git clone https://github.com/Sheldenburg/nextjs-fastapi-template.git
          </code>
        </p> */}
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-center justify-center gap-3 bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://euclideanai.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-base">By </p>
            <Image
              src="/euclideanai-logo-black-transparent.svg"
              alt="EuclideanAI Logo"
              className="dark:invert"
              width={130}
              height={30}
              priority
            />
          </a>
          <ModeToggle />
        </div>
      </div>

      <div className="relative flex flex-col items-center">
        <div className="flex h-[200px] place-items-center gap-6">
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/next.svg"
            alt="Next.js Logo"
            width={130}
            height={37}
            priority
          />
          <PlusIcon className="w-8 h-8 text-black dark:text-white" />
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/fastapi.svg"
            alt="FastAPI Logo"
            width={60}
            height={30}
            priority
          />
        </div>
        <Link href="/dashboard" className={cn(buttonVariants())}>
          Get Started
        </Link>
      </div>
      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-3 lg:text-left">
        <a
          href="https://github.com/Sheldenburg/ai-engineer-template"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Github Repo{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Light-weight template to get started with AI full-stack development.
          </p>
        </a>

        <a
          href="https://fastapi.tiangolo.com/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            FastAPI{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            One of the most popular Python backend framework with native async support.
          </p>
        </a>

        <a
          href="https://nextjs.org/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Nextjs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            One of the most popular React framework with many built-in supports.
          </p>
        </a>

        {/* <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
            Flexible deployment options to minimise devOps overhang.
          </p>
        </a> */}
      </div>
    </main>
  );
}
