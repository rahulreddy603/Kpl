import React, { useState, useEffect } from 'react';
import { Trophy,  Calendar,  Play, Award, TrendingUp } from 'lucide-react';

const CricketTournamentApp = () => {
  const [activeTab, setActiveTab] = useState('matches');
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [showScoreModal, setShowScoreModal] = useState(false);

  // Initial teams data
  const initialTeams = {
    'Kalpavruksha A': { group: 'A', played: 0, won: 0, lost: 0, points: 0, runRate: 0, totalRuns: 0, totalOvers: 0, runsAgainst: 0, oversAgainst: 0 },
    'Doni Huli': { group: 'A', played: 0, won: 0, lost: 0, points: 0, runRate: 0, totalRuns: 0, totalOvers: 0, runsAgainst: 0, oversAgainst: 0 },
    'Royal Boys': { group: 'A', played: 0, won: 0, lost: 0, points: 0, runRate: 0, totalRuns: 0, totalOvers: 0, runsAgainst: 0, oversAgainst: 0 },
    'Lakshmi Nagar': { group: 'A', played: 0, won: 0, lost: 0, points: 0, runRate: 0, totalRuns: 0, totalOvers: 0, runsAgainst: 0, oversAgainst: 0 },
    'Kalpavruksha B': { group: 'B', played: 0, won: 0, lost: 0, points: 0, runRate: 0, totalRuns: 0, totalOvers: 0, runsAgainst: 0, oversAgainst: 0 },
    'Basaveshwar': { group: 'B', played: 0, won: 0, lost: 0, points: 0, runRate: 0, totalRuns: 0, totalOvers: 0, runsAgainst: 0, oversAgainst: 0 },
    'Shriram': { group: 'B', played: 0, won: 0, lost: 0, points: 0, runRate: 0, totalRuns: 0, totalOvers: 0, runsAgainst: 0, oversAgainst: 0 },
    'Gajanan': { group: 'B', played: 0, won: 0, lost: 0, points: 0, runRate: 0, totalRuns: 0, totalOvers: 0, runsAgainst: 0, oversAgainst: 0 }
  };

  // Initial matches data
  const initialMatches = [
    { id: 1, team1: "Shriram", team2: "Basaveshwar", status: "scheduled", winner: null, team1Score: null, team2Score: null, completed: false },
    { id: 2, team1: "Kalpavruksha A", team2: "Royal Boys", status: "scheduled", winner: null, team1Score: null, team2Score: null, completed: false },
    { id: 3, team1: "Basaveshwar", team2: "Kalpavruksha B", status: "scheduled", winner: null, team1Score: null, team2Score: null, completed: false },
    { id: 4, team1: "Lakshmi Nagar", team2: "Kalpavruksha A", status: "scheduled", winner: null, team1Score: null, team2Score: null, completed: false },
    { id: 5, team1: "Shriram", team2: "Gajanan", status: "scheduled", winner: null, team1Score: null, team2Score: null, completed: false },
    { id: 6, team1: "Doni Huli", team2: "Royal Boys", status: "scheduled", winner: null, team1Score: null, team2Score: null, completed: false },
    { id: 7, team1: "Gajanan", team2: "Kalpavruksha B", status: "scheduled", winner: null, team1Score: null, team2Score: null, completed: false },
    { id: 8, team1: "Lakshmi Nagar", team2: "Doni Huli", status: "scheduled", winner: null, team1Score: null, team2Score: null, completed: false },
    { id: 9, team1: "Kalpavruksha B", team2: "Shriram", status: "scheduled", winner: null, team1Score: null, team2Score: null, completed: false },
    { id: 10, team1: "Kalpavruksha A", team2: "Doni Huli", status: "scheduled", winner: null, team1Score: null, team2Score: null, completed: false },
    { id: 11, team1: "Basaveshwar", team2: "Gajanan", status: "scheduled", winner: null, team1Score: null, team2Score: null, completed: false },
    { id: 12, team1: "Lakshmi Nagar", team2: "Royal Boys", status: "scheduled", winner: null, team1Score: null, team2Score: null, completed: false }
  ];

  const [teams, setTeams] = useState(initialTeams);
  const [matches, setMatches] = useState(initialMatches);
  const [finalMatch, setFinalMatch] = useState(null);

  // Calculate net run rate
  const calculateRunRate = (totalRuns, totalOvers, runsAgainst, oversAgainst) => {
    const runRateFor = totalOvers > 0 ? totalRuns / totalOvers : 0;
    const runRateAgainst = oversAgainst > 0 ? runsAgainst / oversAgainst : 0;
    return runRateFor - runRateAgainst;
  };

  // Update team stats after match completion
  const updateTeamStats = (team1, team2, team1Runs, team1Overs, team2Runs, team2Overs, winner) => {
    setTeams(prevTeams => {
      const updatedTeams = { ...prevTeams };
      
      // Update team1 stats
      updatedTeams[team1] = {
        ...updatedTeams[team1],
        played: updatedTeams[team1].played + 1,
        won: winner === team1 ? updatedTeams[team1].won + 1 : updatedTeams[team1].won,
        lost: winner === team2 ? updatedTeams[team1].lost + 1 : updatedTeams[team1].lost,
        points: winner === team1 ? updatedTeams[team1].points + 2 : updatedTeams[team1].points,
        totalRuns: updatedTeams[team1].totalRuns + team1Runs,
        totalOvers: updatedTeams[team1].totalOvers + team1Overs,
        runsAgainst: updatedTeams[team1].runsAgainst + team2Runs,
        oversAgainst: updatedTeams[team1].oversAgainst + team2Overs
      };
      
      // Update team2 stats
      updatedTeams[team2] = {
        ...updatedTeams[team2],
        played: updatedTeams[team2].played + 1,
        won: winner === team2 ? updatedTeams[team2].won + 1 : updatedTeams[team2].won,
        lost: winner === team1 ? updatedTeams[team2].lost + 1 : updatedTeams[team2].lost,
        points: winner === team2 ? updatedTeams[team2].points + 2 : updatedTeams[team2].points,
        totalRuns: updatedTeams[team2].totalRuns + team2Runs,
        totalOvers: updatedTeams[team2].totalOvers + team2Overs,
        runsAgainst: updatedTeams[team2].runsAgainst + team1Runs,
        oversAgainst: updatedTeams[team2].oversAgainst + team1Overs
      };

      // Calculate run rates
      updatedTeams[team1].runRate = calculateRunRate(
        updatedTeams[team1].totalRuns,
        updatedTeams[team1].totalOvers,
        updatedTeams[team1].runsAgainst,
        updatedTeams[team1].oversAgainst
      );
      
      updatedTeams[team2].runRate = calculateRunRate(
        updatedTeams[team2].totalRuns,
        updatedTeams[team2].totalOvers,
        updatedTeams[team2].runsAgainst,
        updatedTeams[team2].oversAgainst
      );

      return updatedTeams;
    });
  };

  // Check if all matches are completed and create final
  useEffect(() => {
    const allMatchesCompleted = matches.every(match => match.completed);
    if (allMatchesCompleted && matches.length === 12 && !finalMatch) {
      // Get top team from each group
      const groupATeams = Object.entries(teams).filter(([_, team]) => team.group === 'A');
      const groupBTeams = Object.entries(teams).filter(([_, team]) => team.group === 'B');
      
      const topGroupA = groupATeams.sort((a, b) => {
        if (b[1].points !== a[1].points) return b[1].points - a[1].points;
        return b[1].runRate - a[1].runRate;
      })[0];
      
      const topGroupB = groupBTeams.sort((a, b) => {
        if (b[1].points !== a[1].points) return b[1].points - a[1].points;
        return b[1].runRate - a[1].runRate;
      })[0];

      if (topGroupA && topGroupB) {
        setFinalMatch({
          id: 13,
          team1: topGroupA[0],
          team2: topGroupB[0],
          status: "scheduled",
          winner: null,
          team1Score: null,
          team2Score: null,
          completed: false,
          isFinal: true
        });
      }
    }
  }, [matches, teams, finalMatch]);

  const ScoreModal = ({ match, onClose, onSave }) => {
    const [team1Runs, setTeam1Runs] = useState('');
    const [team1Overs, setTeam1Overs] = useState('');
    const [team1Balls, setTeam1Balls] = useState('');
    const [team2Runs, setTeam2Runs] = useState('');
    const [team2Overs, setTeam2Overs] = useState('');
    const [team2Balls, setTeam2Balls] = useState('');

    // Convert overs.balls format to decimal for calculations
    const convertOversToDecimal = (overs, balls) => {
      const oversInt = parseInt(overs) || 0;
      const ballsInt = parseInt(balls) || 0;
      
      if (ballsInt >= 6) {
        alert('Balls cannot be 6 or more! Use overs instead.');
        return null;
      }
      
      return oversInt + (ballsInt / 6);
    };

    // Format overs for display
    const formatOvers = (overs, balls) => {
      const oversInt = parseInt(overs) || 0;
      const ballsInt = parseInt(balls) || 0;
      
      if (ballsInt === 0) {
        return `${oversInt}`;
      }
      return `${oversInt}.${ballsInt}`;
    };

    const handleSave = () => {
      const runs1 = parseInt(team1Runs) || 0;
      const runs2 = parseInt(team2Runs) || 0;
      
      const overs1Int = parseInt(team1Overs) || 0;
      const balls1Int = parseInt(team1Balls) || 0;
      const overs2Int = parseInt(team2Overs) || 0;
      const balls2Int = parseInt(team2Balls) || 0;

      // Validation
      if (overs1Int > 6 || overs2Int > 6) {
        alert('Overs cannot exceed 6!');
        return;
      }

      if (balls1Int >= 6 || balls2Int >= 6) {
        alert('Balls cannot be 6 or more! Maximum is 5 balls.');
        return;
      }

      if (overs1Int === 6 && balls1Int > 0) {
        alert('Cannot have balls after 6 complete overs!');
        return;
      }

      if (overs2Int === 6 && balls2Int > 0) {
        alert('Cannot have balls after 6 complete overs!');
        return;
      }

      const overs1Decimal = convertOversToDecimal(team1Overs, team1Balls);
      const overs2Decimal = convertOversToDecimal(team2Overs, team2Balls);
      
      if (overs1Decimal === null || overs2Decimal === null) {
        return;
      }

      const winner = runs1 > runs2 ? match.team1 : match.team2;
      const team1ScoreDisplay = formatOvers(team1Overs, team1Balls);
      const team2ScoreDisplay = formatOvers(team2Overs, team2Balls);
      
      onSave({
        ...match,
        team1Score: `${runs1}/${team1ScoreDisplay}`,
        team2Score: `${runs2}/${team2ScoreDisplay}`,
        winner,
        status: 'completed',
        completed: true
      }, runs1, overs1Decimal, runs2, overs2Decimal, winner);
      
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md">
          <h3 className="text-xl font-bold mb-4 text-center">Update Match Score</h3>
          <div className="text-center mb-4">
            <span className="text-lg font-semibold text-blue-600">{match.team1}</span>
            <span className="mx-3 text-gray-500">VS</span>
            <span className="text-lg font-semibold text-red-600">{match.team2}</span>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">{match.team1} Score</label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Runs</label>
                    <input
                      type="number"
                      value={team1Runs}
                      onChange={(e) => setTeam1Runs(e.target.value)}
                      className="w-full p-2 border rounded-lg text-center"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Overs</label>
                    <input
                      type="number"
                      value={team1Overs}
                      onChange={(e) => setTeam1Overs(e.target.value)}
                      className="w-full p-2 border rounded-lg text-center"
                      placeholder="0"
                      min="0"
                      max="6"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Balls</label>
                    <input
                      type="number"
                      value={team1Balls}
                      onChange={(e) => setTeam1Balls(e.target.value)}
                      className="w-full p-2 border rounded-lg text-center"
                      placeholder="0"
                      min="0"
                      max="5"
                    />
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Score: {team1Runs || 0}/{formatOvers(team1Overs, team1Balls)}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">{match.team2} Score</label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Runs</label>
                    <input
                      type="number"
                      value={team2Runs}
                      onChange={(e) => setTeam2Runs(e.target.value)}
                      className="w-full p-2 border rounded-lg text-center"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Overs</label>
                    <input
                      type="number"
                      value={team2Overs}
                      onChange={(e) => setTeam2Overs(e.target.value)}
                      className="w-full p-2 border rounded-lg text-center"
                      placeholder="0"
                      min="0"
                      max="6"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Balls</label>
                    <input
                      type="number"
                      value={team2Balls}
                      onChange={(e) => setTeam2Balls(e.target.value)}
                      className="w-full p-2 border rounded-lg text-center"
                      placeholder="0"
                      min="0"
                      max="5"
                    />
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Score: {team2Runs || 0}/{formatOvers(team2Overs, team2Balls)}
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-3 rounded-lg mt-4">
              <div className="text-xs text-blue-800 space-y-1">
                <div>• Maximum 6 overs per innings</div>
                <div>• Balls range: 0-5 (6 balls = 1 over)</div>
                <div>• Format: Runs/Overs.Balls (e.g., 45/3.4 = 45 runs in 3 overs 4 balls)</div>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Score
            </button>
          </div>
        </div>
      </div>
    );
  };

  const updateMatchScore = (updatedMatch, runs1, overs1, runs2, overs2, winner) => {
    if (updatedMatch.isFinal) {
      setFinalMatch(updatedMatch);
    } else {
      setMatches(prevMatches =>
        prevMatches.map(match =>
          match.id === updatedMatch.id ? updatedMatch : match
        )
      );
      updateTeamStats(updatedMatch.team1, updatedMatch.team2, runs1, overs1, runs2, overs2, winner);
    }
  };

  const MatchCard = ({ match, isFinal = false }) => (
    <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 mb-4">
      <div className="flex justify-between items-center mb-3">
        <span className={`text-xs px-3 py-1 rounded-full ${isFinal ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
          {isFinal ? 'FINAL' : `Match ${match.id}`}
        </span>
        <span className={`text-xs px-2 py-1 rounded-full ${
          match.completed ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
        }`}>
          {match.completed ? 'Completed' : 'Scheduled'}
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex-1 text-center">
          <div className={`font-semibold text-sm ${match.winner === match.team1 ? 'text-green-600' : 'text-gray-800'}`}>
            {match.team1}
          </div>
          {match.team1Score && (
            <div className="text-lg font-bold text-blue-600 mt-1">{match.team1Score}</div>
          )}
        </div>
        
        <div className="mx-4 text-gray-400 font-bold">VS</div>
        
        <div className="flex-1 text-center">
          <div className={`font-semibold text-sm ${match.winner === match.team2 ? 'text-green-600' : 'text-gray-800'}`}>
            {match.team2}
          </div>
          {match.team2Score && (
            <div className="text-lg font-bold text-red-600 mt-1">{match.team2Score}</div>
          )}
        </div>
      </div>
      
      {match.winner && (
        <div className="mt-3 text-center">
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
            🏆 {match.winner} Won
          </span>
        </div>
      )}
      
      {!match.completed && (
        <button
          onClick={() => {
            setSelectedMatch(match);
            setShowScoreModal(true);
          }}
          className="w-full mt-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
        >
          <Play className="inline w-4 h-4 mr-1" />
          Update Score
        </button>
      )}
    </div>
  );

  const StandingsTable = ({ groupName, groupTeams }) => (
    <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
      <h3 className="text-lg font-bold mb-4 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Group {groupName} Standings
      </h3>
      <div className="overflow-hidden">
        <div className="grid grid-cols-6 gap-2 text-xs font-medium text-gray-600 mb-2 px-2">
          <div>Team</div>
          <div className="text-center">P</div>
          <div className="text-center">W</div>
          <div className="text-center">L</div>
          <div className="text-center">Pts</div>
          <div className="text-center">NRR</div>
        </div>
        {groupTeams.map(([teamName, teamData], index) => (
          <div key={teamName} className={`grid grid-cols-6 gap-2 py-2 px-2 rounded-lg text-xs ${
            index === 0 ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
          }`}>
            <div className="font-medium truncate">{teamName}</div>
            <div className="text-center">{teamData.played}</div>
            <div className="text-center text-green-600">{teamData.won}</div>
            <div className="text-center text-red-600">{teamData.lost}</div>
            <div className="text-center font-bold">{teamData.points}</div>
            <div className="text-center">{teamData.runRate.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const groupATeams = Object.entries(teams)
    .filter(([_, team]) => team.group === 'A')
    .sort((a, b) => {
      if (b[1].points !== a[1].points) return b[1].points - a[1].points;
      return b[1].runRate - a[1].runRate;
    });

  const groupBTeams = Object.entries(teams)
    .filter(([_, team]) => team.group === 'B')
    .sort((a, b) => {
      if (b[1].points !== a[1].points) return b[1].points - a[1].points;
      return b[1].runRate - a[1].runRate;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2" />
            <h1 className="text-2xl font-bold">Cricket Tournament</h1>
            <p className="text-sm opacity-90">6-Over Championship 2025</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex bg-white border-b">
          <button
            onClick={() => setActiveTab('matches')}
            className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center ${
              activeTab === 'matches' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-600'
            }`}
          >
            <Calendar className="w-4 h-4 mr-1" />
            Matches
          </button>
          <button
            onClick={() => setActiveTab('standings')}
            className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center ${
              activeTab === 'standings' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-600'
            }`}
          >
            <TrendingUp className="w-4 h-4 mr-1" />
            Standings
          </button>
          {finalMatch && (
            <button
              onClick={() => setActiveTab('final')}
              className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center ${
                activeTab === 'final' ? 'text-yellow-600 border-b-2 border-yellow-600 bg-yellow-50' : 'text-gray-600'
              }`}
            >
              <Award className="w-4 h-4 mr-1" />
              Final
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-4 pb-20">
          {activeTab === 'matches' && (
            <div>
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Group Stage Matches</h2>
                <div className="flex justify-center space-x-4 text-sm">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                    Completed: {matches.filter(m => m.completed).length}/12
                  </span>
                </div>
              </div>
              {matches.map(match => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          )}

          {activeTab === 'standings' && (
            <div>
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Tournament Standings</h2>
                <p className="text-sm text-gray-600">Top team from each group qualifies for final</p>
              </div>
              <StandingsTable groupName="A" groupTeams={groupATeams} />
              <StandingsTable groupName="B" groupTeams={groupBTeams} />
            </div>
          )}

          {activeTab === 'final' && finalMatch && (
            <div>
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-yellow-600 mb-2">🏆 GRAND FINAL</h2>
                <p className="text-sm text-gray-600">Champions League Final</p>
              </div>
              <MatchCard match={finalMatch} isFinal={true} />
              
              {finalMatch.completed && (
                <div className="mt-6 text-center">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-2xl">
                    <Trophy className="w-12 h-12 mx-auto mb-2" />
                    <h3 className="text-2xl font-bold">TOURNAMENT CHAMPION</h3>
                    <h4 className="text-3xl font-bold mt-2">{finalMatch.winner}</h4>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Score Update Modal */}
        {showScoreModal && selectedMatch && (
          <ScoreModal
            match={selectedMatch}
            onClose={() => {
              setShowScoreModal(false);
              setSelectedMatch(null);
            }}
            onSave={updateMatchScore}
          />
        )}
      </div>
    </div>
  );
};

export default CricketTournamentApp;