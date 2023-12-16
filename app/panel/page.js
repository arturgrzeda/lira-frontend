import axios from 'axios';
import CompetitionCard from '@/Components/Competitions/CompetitionCard';
import { cookies } from "next/headers";

async function getData() {
  const jwt = cookies().get("jwt").value;
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };
  try {
    const response = await axios.get(`${process.env.api_endpoint}/competitions?populate=*`, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}

export default async function ManagementPanel() {
  const data = await getData();
    return (
      <>
        <div className="mb-12">
              <h2>Panel głosowania jurora</h2>
          </div>
        <div className="grid grid-cols-2 gap-12">
            {data.data.map((competition) => (
              <CompetitionCard key={competition.id} data={competition}/>
            ))}
        </div>
      </>
    )
  }
