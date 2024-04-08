'use client'
 
import { usePathname } from 'next/navigation'
 
export default function PathName() {
  const pathname = usePathname()
  const dryPathName = pathname.replace("/", "").replace("-", " ");
  const pageTitle = dryPathName.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');

  return <h2 className="text-2xl font-semibold">{pageTitle}</h2>
}