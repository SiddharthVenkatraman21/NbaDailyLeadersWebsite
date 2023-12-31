import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import DateSelector from './components/Datepicker';
import GameCard from './components/GameCard';
import PlayerCard from './components/PlayerStats';

function App() {
  const [games, setGames] = useState([]);
  const [dailyStats, setDailyStats] = useState([]);



  const getGames = async (selectedDate) => {
    try {
      console.log("Date: " + selectedDate)
      const response = await axios.get(
        `https://www.balldontlie.io/api/v1/games?start_date=${selectedDate}&end_date=${selectedDate}`
      );
      setGames(response.data.data || []);
      // await combineGameStats(response.data.data || []);
      await getDailyData(selectedDate, selectedDate)
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  function convertDateFormat(inputDate) {
    // Parse the input date string
    const parsedDate = new Date(inputDate);
  
    // Check if the parsed date is valid
    if (isNaN(parsedDate.getTime())) {
      console.error('Invalid date format');
      return null; // Return null or handle the error as needed
    }
  
    // Format the date as "YYYY-MM-DD"
    const formattedDate = `${parsedDate.getFullYear()}-${(parsedDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${parsedDate.getDate().toString().padStart(2, '0')}`;
  
    return formattedDate;
  }

  useEffect(() => {
    // Fetch games for the current date when the component mounts
    const date = new Date().toLocaleDateString('en-US');
    const newDate = convertDateFormat(date)
    
    getGames(newDate);
  }, []);

  const getDailyData = async (startDate, endDate) => {
    let page = 1;
    let allData = [];
  
    while (true) {
      try {
        const response = await axios.get(
          `https://www.balldontlie.io/api/v1/stats?start_date=${startDate}&end_date=${endDate}&per_page=100&page=${page}`
        );
  
        const newData = response.data.data;
        allData = [...allData, ...newData];
  
        // If the number of elements in the response is less than 100, there are no more pages
        if (newData.length < 100) {
          break;
        }
  
        // Increment page for the next request
        page++;
      } catch (error) {
        console.error('Error fetching data:', error);
        break;
      }
    }
    setDailyStats(allData)
  
  };



  const compare = (el1, el2, index) => {
    if (el1[index] === el2[index]) {
      return 0;
    } else if (el1[index] < el2[index]) {
      return -1;
    } else {
      return 1;
    }
  };

  const compareGames = (el1, el2) => {
    if (el1["period"] === el2["period"]) {
      return compare(el1,el2,"status");
    } else if (el1["period"] > el2["period"]) {
      return -1;
    } else {
      return 1;
    }
  };

  games.sort((el1, el2) => compareGames(el1, el2));
  
  dailyStats.sort((el1, el2) => compare(el1, el2, "pts"));
  dailyStats.reverse();



  

 

  return (
    <div className="Body">
      <div>
        <DateSelector  getGames={getGames} />
      </div>

      {/* <div className ="Headings"> 
        <div className = "Game-Heading">
          <h1> GAMES </h1>
        </div>
        <div className = "Daily-Leaders-Heading">
          <h1> DAILY LEADERS </h1>
        </div>
      </div> */}

      <div className="Info-Content">
        <div className="card-container">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
        <div className="StatLeaders">
          {dailyStats.slice(0, 10).map((stat, index) => (
            <PlayerCard key={stat.player.id} player={stat} cardNumber={index+1}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
