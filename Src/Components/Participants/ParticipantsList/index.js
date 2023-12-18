'use client';
import { useState } from 'react';
import ParticipantsCard from '@/Components/Participants/ParticipantsCard';

function ParticipantsList({ participants, votes, params, juror }) {
  const [showVoted, setShowVoted] = useState(false);

  const filteredParticipants = showVoted
    ? participants.data.filter((participant) =>
        votes.data.some((vote) => vote.attributes.participant.data.id === participant.id)
      )
    : participants.data.filter((participant) => participant.attributes.status === 'verified');

  return (
    <div className="grid grid-cols-2 gap-12">
      {filteredParticipants.map((participant, index) => {
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
  );
}

export default ParticipantsList;
