var datePretty = (time) => {
  //make time pretty
  var pTime = new Date(time);
  var pastTime;
  var timeDiff = Date.now() - pTime.getTime();
  timeDiff = Math.floor(timeDiff / 1000);
  if (timeDiff >= 0 && timeDiff < 60) {
    //seconds
    if (timeDiff === 0 || timeDiff === 1) {
      pastTime = `${timeDiff} sec`;
    } else {
      pastTime = `${timeDiff} secs`;
    }
  } else {
    //minutes
    timeDiff = Math.floor(timeDiff / 60);
    if (timeDiff >= 0 && timeDiff < 60) {
      pastTime = `${timeDiff} mins`;
    } else {
      //hours
      timeDiff = Math.floor(timeDiff / 60);
      if (timeDiff >= 0 && timeDiff < 60) {
        pastTime = `${timeDiff} hrs`;
      } else {
        //days
        timeDiff = Math.floor(timeDiff / 24);
        if (timeDiff >= 0 && timeDiff < 60) {
          pastTime = `${timeDiff} days`;
        } else {
          //years
          timeDiff = Math.floor(timeDiff / 365);
          pastTime = `${timeDiff} years`;
        }
      }
    }
  }
  return pastTime;
};
export default datePretty;
