import React, {useState, useEffect} from "react";
import {RiFireFill} from "react-icons/ri";

export const CountDown = ({date}) => {
  const countDownDate = new Date(date).getTime();
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    setInterval(() => {
      // Get today's date and time
      let now = new Date().getTime();
      
      // Find the distance between now and the count down date
      let distance = countDownDate - now;
      
      // Time calculations for days, hours, minutes and seconds
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
      
      // If the count down is over, write some text
      if (distance < 0) {
        // clearInterval(countdown);
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      }
    }, 1000);
  });
  return (
    <div className="count-down__container">
      <div className="count-down__icon">
        <RiFireFill/>
      </div>
      <div className="count-down__content d-flex justify-content-center align-items-center">
        <p className="count-down__time">
          {
            days > 1 && (
              <span>{days} :</span>
            )
          }
          <span> {hours < 10 ? `0${hours}` : hours} :</span>
          <span> {minutes < 10 ? `0${minutes}` : minutes} :</span>
          <span> {seconds < 10 ? `0${seconds}` : seconds}</span>
        </p>
      </div>
    </div>
  );
};