'use client';

import VoteForm from "@/Components/Votes/VoteForm";
import React, { useState } from 'react';

function getEliminacjeLabel(index) {
    switch (index) {
      case 0:
        return "ELIMINACJE";
      case 1:
        return "I ETAP";
      case 2:
        return "II ETAP";
      case 3:
        return "FINAŁ";
      default:
        return `ELIMINACJE ${index + 1}`;
    }
  }

function ParticipantsCard({data, index, voted, competitionId, jurorId}) {
  const [hasVoted, setHasVoted] = useState(!!voted);
  const [votedScore, setVotedScore] = useState(voted?.attributes.score || 0);
  const handleVoteSubmit = async (score) => {
    console.log('score', score)
    try {
      setHasVoted(true);
      setVotedScore(score.score);
    } catch (error) {
      console.error('Failed to submit vote:', error);
    }
  };
    return (
        <div className="flex flex-col font-mono text-white no-underline border border-gray-500">
          <div className="flex items-center justify-center w-full p-8 h-[120px]">
            {/* <video controls className="w-full">
                <source src={data.attributes.recording.data.attributes.url}></source>
            </video> */}
            <audio controls className="w-full" controlsList="nodownload">
              <source src={data.attributes.recording.data.attributes.url}></source>
            </audio>
          </div>
          <div className="bg-gray-500 w-full h-[1px] my-2"></div>
          <div className="px-4 pb-4">
              <div className="flex flex-row items-center justify-between my-4">
                <div>
                  <h5>Uczestnik #{index}</h5>
                </div>
                <div>
                  {!hasVoted && (
                    <VoteForm
                      jurorId={jurorId}
                      competitionId={competitionId}
                      participantId={data.id}
                      index={index}
                      onVoteSubmit={handleVoteSubmit} // Pass the callback function
                    />
                  )}
                  {hasVoted && (
                    <>
                      <div className="inline-flex items-center px-3 py-2 ml-auto font-mono text-sm font-medium text-center text-white no-underline uppercase bg-green-700 rounded-lg hover:bg-green-700 focus:ring-1 focus:outline-none focus:ring-green-700">
                        Udzieliłeś: {votedScore} Pkt
                      </div>
                    </>
                  )}
                </div>
              </div>
              <table border="1" className="table-fixed">
                  <thead className="text-xs">
                      <tr className="p-4">
                      <th className="p-4 text-left">REPERTUAR</th>
                      <th className="p-4 text-left">Kompozytor, nazwa utworu oraz czas trwania</th>
                      <th className="p-4 text-left">Kompozytor, nazwa utworu oraz czas trwania</th>
                      <th className="p-4 text-left">Kompozytor, nazwa utworu oraz czas trwania</th>
                      </tr>
                  </thead>
                  <tbody className="text-xs">
                      {data.attributes.repertoire.map(({ id, ...rest }) => rest).map((rep, index) => (
                          <tr key={index}>
                              <td className="p-4">{getEliminacjeLabel(index)}</td>
                              {Object.keys(rep).map((key) => (
                                  <td className="p-4" key={key}>{rep[key]}</td>
                              ))}
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>

        </div>
    );
}

export default ParticipantsCard;