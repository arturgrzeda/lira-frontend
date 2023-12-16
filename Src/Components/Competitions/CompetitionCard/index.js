import Link from 'next/link'

export default function CompetitionCard({data}) {
  return (
    <Link href={`/panel/${data.id}/lista-uczestnikow`} className="flex flex-col gap-6 p-8 font-sans text-white no-underline border border-gray-500">
      <span className="ml-auto font-mono uppercase bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-green-400">{data.attributes.status}</span>
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{data.attributes.name}</h5>
      <p className="mb-3 font-mono font-normal text-white">I Międzynarodowy Konkurs PIanistyczny "Gabriela Weiss in Memoriam" jest organizowany przez Fundację „LIRA” przy współpracy miasta Mińsk Mazowiecki oraz Fundacji Second Life Foundation.</p>
      <button className="ml-auto no-underline font-mono uppercase inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#BF0C10] rounded-lg hover:bg-[#BF0C10] focus:ring-1 focus:outline-none focus:ring-[#BF0C10]">
          Lista uczestników ({data.attributes.participants.data.filter((participant) => participant.attributes.status === "verified").length})
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
      </button>
    </Link>
  )};

