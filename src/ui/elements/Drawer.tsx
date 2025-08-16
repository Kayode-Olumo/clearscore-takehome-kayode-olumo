type DrawerProps = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    maxWidth?: number; 
  };
  
  export default function Drawer({ open, onClose, children, maxWidth = 480 }: DrawerProps) {
    if (!open) return null;
    return (
      <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
        <div className="absolute inset-0 bg-black/40" />
        <aside
          className="relative h-full w-full bg-white p-cs-16 overflow-auto animate-slide-in-right"
          style={{ maxWidth }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </aside>
      </div>
    );
  }