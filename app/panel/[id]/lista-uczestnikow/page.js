import axios from 'axios';
import ParticipantsCard from '@/Components/Participants/ParticipantsCard';
import { cookies } from "next/headers";

async function getParticipants() {
    const jwt = cookies().get("jwt").value;
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    try {
        const response = await axios.get(`${process.env.api_endpoint}/participants?populate=*`, {
            headers,
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
}
async function getJurorVotes() {
    const jwt = cookies().get("jwt").value;
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    try {
        const response = await axios.get(`${process.env.api_endpoint}/votes?populate=*`, {
         headers,
        });
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch data');
    }
}

async function getJurorData() {
    const jwt = cookies().get("jwt").value;
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    try {
        const response = await axios.get(`${process.env.api_endpoint}/users/me`, {
            headers,
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
}
export default async function ListaUczestnikow(props) {
    const { params } = props;
    const participants = await getParticipants();
    const votes = await getJurorVotes();
    const juror = await getJurorData();
    return (
        <div className="container py-48 mx-auto">
            <div className="mb-12">
                <h2>Uczestnicy konkursu ({participants.data.filter((participant) => participant.attributes.status === "verified").length})</h2>
            </div>
            <div className="grid grid-cols-3 gap-12">
                {participants.data.filter((participant) => participant.attributes.status === "verified").map((participant, index) => {
                    const voted = votes.data.find((vote) => vote.attributes.participant.data.id === participant.id);
                    return (
                        <ParticipantsCard
                            key={participant.id}
                            data={participant}
                            index={index + 1}
                            voted={voted}
                            competitionId={params.id}
                            jurorId={juror.id}
                        />
                    );
                })}
            </div>
        </div>
      )
}