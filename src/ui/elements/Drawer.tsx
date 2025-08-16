type DrawerProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Drawer({ open, onClose, children }: DrawerProps) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40" />
      <aside
        className="relative h-full w-full drawer-content bg-white p-cs-16 overflow-auto animate-slide-in-right"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </aside>
    </div>
  );
}