const App = () => {
  const [breakLength, setBreakLength] = React.useState(5);
  const [sessionLength, setSessionLength] = React.useState(25);
  const [timeLeft, seTtimeLeft] = React.useState(1500);
  const [timingType, setTimingtype] = React.useState("SESSION");

  const [play, setPlay] = React.useState(false);

  const timeout = setTimeout(() => {
    if (timeLeft && play) {
      seTtimeLeft(timeLeft - 1);
    }
  }, 1000);

  const handleBreakIncrease = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const handleBreakDecrease = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const handleSessionIncrease = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      seTtimeLeft(timeLeft + 60);
    }
  };

  const handleSessionDecrease = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      seTtimeLeft(timeLeft - 60);
    }
  };

  const handleReset = () => {
    clearTimeout(timeout);
    setPlay(false);
    seTtimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingtype("SESSION");
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  };

  const handlePlay = () => {
    clearTimeout(timeout);
    setPlay(!play);
  };

  const resetTimer = () => {
    const audio = document.getElementById("beep");
    if (!timeLeft && timingType === "SESSION") {
      seTtimeLeft(breakLength * 60);
      setTimingtype("BREAK");
      audio.play();
    }
    if (!timeLeft && timingType === "BREAK") {
      seTtimeLeft(sessionLength * 60);
      setTimingtype("SESSION");
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const clock = () => {
    if (play) {
      timeout;
      resetTimer();
    } else {
      clearTimeout(timeout);
    }
  };

  React.useEffect(() => {
    clock();
  }, [play, timeLeft, timeout]);

  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const title = timingType === "SESSION" ? "Session" : "Break";

  return (
    <div>
      <div className="wrapper center">
        <h2 className="center-align">25 + 5 Clock</h2>
        <div className="break-session-length dual-container">
          <div>
            <h3 id="break-label">Break Length</h3>
            <div className="">
              <div
                className="btn-large deep-purple lighten-2"
                disabled={play}
                onClick={handleBreakIncrease}
                id="break-increment"
              >
                <i className="material-icons ">arrow_upward</i>
              </div>
              <strong id="break-length" className="btn-large cyan m-4">
                {breakLength}
              </strong>
              <div
                className="btn-large deep-purple lighten-2"
                disabled={play}
                onClick={handleBreakDecrease}
                id="break-decrement"
              >
                <i className="material-icons ">arrow_downward</i>
              </div>
            </div>
          </div>
          <div>
            <h3 id="session-label">Session Length</h3>
            <div>
              <div
                className="btn-large deep-purple lighten-2"
                disabled={play}
                onClick={handleSessionIncrease}
                id="session-increment"
              >
                <i className="material-icons ">arrow_upward</i>
              </div>
              <strong id="session-length" className="btn-large cyan m-4">
                {sessionLength}
              </strong>
              <div
                className="btn-large deep-purple lighten-2"
                disabled={play}
                onClick={handleSessionDecrease}
                id="session-decrement"
              >
                <i className="material-icons ">arrow_downward</i>
              </div>
            </div>
          </div>
        </div>
        <div className="timer-wrapper">
          <div className="timer">
            <h2 id="timer-label">{title}</h2>
            <h3 id="time-left">{timeFormatter()}</h3>
          </div>
          <div 
            className="btn-large deep-purple lighten-2"
            onClick={handlePlay}
            id="start_stop"
          >
            <i className="material-icons ">play_circle_filled</i>


          </div>
          <div
            className="btn-large deep-purple lighten-2"
            onClick={handleReset}
            id="reset"
          >
            <i className="material-icons  ">autorenew</i>


          </div>
        </div>
      </div>
      <audio
        id="beep"
        preload="auto"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
