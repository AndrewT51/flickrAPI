myApp.filter('truncate', ()=>{ 
  return (str, length) => {
    if (str.length <= length +3) {
      return str;
    }
    else {
      return `${String(str).substring(0, length-3)}...`;
    }
  };
});