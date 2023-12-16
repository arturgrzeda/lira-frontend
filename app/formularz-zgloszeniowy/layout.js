import '@/Styles/webflow.css'
import Link from 'next/link'

export const metadata = {
  title: 'Międzynarodowy Konkurs Pianistyczny Gabriela Weiss in Memoriam - Panel jurora',
  description: 'Międzynarodowy Konkurs Pianistyczny Gabriela Weiss in Memoriam - Panel jurora',
}

export default async function RootLayout({ children }) {
  return (
    <div className="h-screen overflow-auto bg-black">
        {children}
    </div>
  )
}
