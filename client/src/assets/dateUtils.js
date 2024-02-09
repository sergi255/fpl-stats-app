
function formatISODate(isoTimeString) {
    const date = new Date(isoTimeString);
  
    const options = {
    year: "numeric",
     month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
    };
  
    return date.toLocaleTimeString("en-US", options);
  }

    export { formatISODate };