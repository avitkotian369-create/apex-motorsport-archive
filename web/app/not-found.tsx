import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#06080d] text-slate-200 flex flex-col items-center justify-center p-6 text-center font-mono">
      <div className="text-xs uppercase tracking-widest text-amber-500 mb-2">[ CAD ARCHIVE - 404 ]</div>
      <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">SPECIFICATION NOT FOUND</h1>
      <p className="text-sm text-slate-400 max-w-md mb-8">
        The requested chassis or engineering telemetry file does not exist in the active archive database.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 bg-amber-500/10 border border-amber-500/40 text-amber-400 hover:bg-amber-500/20 text-xs tracking-wider uppercase font-bold transition-colors"
      >
        &larr; Return to Garage Hub
      </Link>
    </div>
  );
}
