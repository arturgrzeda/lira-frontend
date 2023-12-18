import React, { useState, useEffect } from 'react';
import axios from 'axios';

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

function VoteForm({ jurorId, competitionId, participantId, index, onVoteSubmit, initialVotedData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedScore, setSelectedScore] = useState('');

  useEffect(() => {
    if (initialVotedData) {
      // Set initial voted data if available
      setSelectedScore(initialVotedData.attributes.score || '');
    }
  }, [initialVotedData]);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleScoreSelect = (score) => {
    setSelectedScore(score);
  };

  const handleVoteSubmit = async () => {
    try {
      const jwt = getCookie("jwt");
      const headers = {
        Authorization: `Bearer ${jwt}`,
      };

      // Send a POST request to the API
      const response = await axios.post(
        `${process.env.api_endpoint}/votes`,
        {
          data: {
            participantIDvoterID: `${participantId}${jurorId}`,
            participant: participantId,
            score: selectedScore,
            voter: jurorId,
          },
        },
        { headers }
      );

      // Handle the response as needed
      // console.log('Vote submitted successfully:', response.data);

      // Pass vote information back to the parent component
      onVoteSubmit({
        participantId,
        jurorId,
        score: selectedScore,
      });

      // Close the modal after submitting the vote
      handleCloseModal();
    } catch (error) {
      console.error('Failed to submit vote:', error);
    }
  };

  const ScoreSelection = () => {
    const scores = Array.from({ length: 26 }, (_, index) => index);

    return (
      <div id="choose-score" className="grid flex-row flex-wrap w-full grid-cols-9 gap-2 ">
        {scores.map((score) => (
          <div
            key={score}
            onClick={() => handleScoreSelect(score)}
            className={`cursor-pointer aspect-square flex items-center justify-center text-center border border-gray-300 rounded font-mono text-2xl ${
              selectedScore === score ? 'bg-[#BF0C10] text-white' : ''
            }`}
          >
            {score}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <button
        onClick={handleButtonClick}
        className="ml-auto no-underline font-mono uppercase inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#BF0C10] rounded-lg hover:bg-[#BF0C10] focus:ring-1 focus:outline-none focus:ring-[#BF0C10]"
      >
        Oddaj głos
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>

      {isModalOpen && (
        <div className="fixed top-0 left-0 z-30 flex items-center justify-center w-full h-full bg-black bg-opacity-75">
          <div className="relative flex flex-col items-center justify-center w-2/3 gap-6 text-black bg-white p-14">
            <h5 className="text-center">Oddajesz głos na Uczestnika #{index}</h5>
            <p>Wybierz liczbę</p>
            <ScoreSelection />
            <button
              onClick={handleVoteSubmit}
              className="no-underline font-mono uppercase inline-flex items-center px-6 py-4 text-sm font-medium text-center text-white bg-[#BF0C10] rounded-lg hover:bg-[#BF0C10] focus:ring-1 focus:outline-none focus:ring-[#BF0C10]"
            >
              Oddaję głos
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
            <button className="absolute top-5 right-5" onClick={handleCloseModal}>
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default VoteForm;
