import ApplicationComponent from '@/Components/ApplicationForm';

export default function Home() {
  return (
    <div className="container max-w-4xl mx-auto font-mono text-white py-44">
        <div className="mb-2 font-sans text-4xl font-semibold text-center">
          <h2>Formularz zgłoszeniowy</h2>
        </div>
        <div className="mb-12 font-mono text-center">
          <p>Przed wypełnieniem formularza zapoznaj się z regulaminem konkursu</p>
        </div>
        <ApplicationComponent/>
    </div>
  )
}
