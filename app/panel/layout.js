import Link from 'next/link'
import Logout from '@/Components/Auth/LogoutForm'

export const metadata = {
  title: 'Międzynarodowy Konkurs Pianistyczny Gabriela Weiss in Memoriam - Panel jurora',
  description: 'Międzynarodowy Konkurs Pianistyczny Gabriela Weiss in Memoriam - Panel jurora',
}

export default async function RootLayout({ children }) {
  return (
    <div className="h-screen overflow-auto text-white bg-black">
      <div className="flex items-center h-20 border-b border-gray-500 ">
        <div className="container flex flex-row items-center justify-between px-4 mx-auto container-lg">
          <div className="flex flex-row items-center gap-6">
            <Link href="/panel" className="font-mono text-white no-underline max-w-[150px]"><img src="./logo.jpeg" alt=""/></Link>
            <Link href="/panel" className="ml-10 font-mono text-white no-underline">Konkursy</Link>
          </div>
          <div>
            <Logout/>
          </div>
        </div>
      </div>
      <div className="container px-4 py-16 mx-auto container-lg">
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}
