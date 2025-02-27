import Link from "next/link";
import { Button } from "../ui/button";

export function Layout({ children }: { children: React.ReactNode }) {
  return <div className="flex p-5 flex-col gap-9">{children}</div>;
};

export function LayoutHeader({ children, addUrl }: { children: React.ReactNode, addUrl: string }) {
  return (
    <div className="text-3xl flex w-full">
      <div>
        {children}
      </div>
      <Link href={addUrl} className="ml-auto">
        <Button>Add</Button>
      </Link>
    </div>
  )
}

export function LayoutContent({ children }: { children: React.ReactNode }) {

  return (
    <>
      {children}
    </>
  )
}


