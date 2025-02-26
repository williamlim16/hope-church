export function Layout({ children }: { children: React.ReactNode }) {
  return <div className="flex p-5 flex-col">{children}</div>;
};

export function LayoutHeader({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-3xl pb-3">
      {children}
    </h3>
  )
}
