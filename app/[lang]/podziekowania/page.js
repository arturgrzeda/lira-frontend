import ApplicationComponent from '@/Components/ApplicationForm';

export default function Home(data) {
  return (
    <div className="container mx-auto font-mono text-white py-44">
        <div className="mb-2 font-sans text-4xl font-semibold text-center">
          {data.params.lang === 'en' && <h2>Thank you for entering the competition</h2>}
          {data.params.lang === 'de' && <h2>Vielen Dank für Ihre Teilnahme am Wettbewerb</h2>}
        </div>
        <div className="mb-12 font-mono text-center">
          {data.params.lang === 'en' && <p>Your application is being verified.</p>}
          {data.params.lang === 'de' && <p>Ihr Antrag wird überprüft.</p>}
        </div>
        <div className="flex items-center w-full">
            <a href={`${process.env.contest_website_url}/${data.params.lang}`} className="mx-auto ml-auto no-underline font-mono uppercase inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#BF0C10] rounded-lg hover:bg-[#BF0C10] focus:ring-1 focus:outline-none focus:ring-[#BF0C10]">
              {data.params.lang === 'en' && 'Return to the main page of the competition'}
              {data.params.lang === 'de' && 'Zurück zur Hauptseite des Wettbewerbs'}

                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </a>
        </div>
    </div>
  )
}
