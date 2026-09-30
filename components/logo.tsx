import { Link2 } from "lucide-react";
import clsx from "clsx";

export function Logo({ compact = false, inverse = false }: { compact?: boolean; inverse?: boolean }) {
  return <div className="flex items-center gap-2.5"><div className={clsx("grid h-9 w-9 place-items-center rounded-md", inverse ? "bg-white text-blue-800" : "bg-blue-700 text-white")}><Link2 className="h-[19px] w-[19px]" strokeWidth={2.5} /></div>{!compact && <div><p className={clsx("text-[13px] font-extrabold leading-none", inverse ? "text-white" : "text-slate-900")}>NEXO</p><p className={clsx("mt-1 text-[9px] font-bold leading-none tracking-[.17em]", inverse ? "text-blue-200" : "text-blue-700")}>ESCOLAR</p></div>}</div>;
}
