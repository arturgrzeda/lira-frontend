import '@/Styles/webflow.css'
import Link from 'next/link'

export const metadata = {
  title: 'Międzynarodowy Konkurs Pianistyczny Gabriela Weiss in Memoriam - Panel jurora',
  description: 'Międzynarodowy Konkurs Pianistyczny Gabriela Weiss in Memoriam - Panel jurora',
}

export default async function RootLayout({ children }) {
  return (
    <div className="flex flex-col items-center h-screen overflow-auto bg-black">
        <main className="container flex flex-col items-center justify-center h-full max-w-lg mx-auto font-mono text-white py-44">
            <div className="mb-2 font-sans text-4xl font-semibold text-center">
                <div className="max-w-[250px] mb-8">
                  <img src="./../logo.jpeg" />
                </div>
                <h2>Panel jurora</h2>
            </div>
            {children}
        </main>
    </div>
  )
}
