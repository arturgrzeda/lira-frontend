import ApplicationComponent from '@/Components/ApplicationForm';

export default function Home() {
  return (
    <div className="container mx-auto font-mono text-white py-44">
        <div className="mb-2 font-sans text-4xl font-semibold text-center">
          <h2>Dziekujemy za zgłoszenie się do konkursu</h2>
        </div>
        <div className="mb-12 font-mono text-center">
          <p>Twoje zgłoszenie jest weryfikowane.</p>
        </div>
        <div className="flex items-center w-full">
            <a href={process.env.contest_website_url} className="mx-auto ml-auto no-underline font-mono uppercase inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#BF0C10] rounded-lg hover:bg-[#BF0C10] focus:ring-1 focus:outline-none focus:ring-[#BF0C10]">
                Wróć na stronę główną konkursu
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </a>
        </div>
    </div>
  )
}
