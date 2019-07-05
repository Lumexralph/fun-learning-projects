function mix(s1, s2) {
  //remove any non-lowercase character
  let str1 = s1.replace(/[^a-z]/g, "");//.split("").sort().join("");
  let str2 = s2.replace(/[^a-z]/g, "");//split("").sort().join("");

  //count the strings and give their values
  function stringCount(str) {
    let obj = {};
    
    Array.prototype.forEach.call(str, function(char) {
    let regExp = new RegExp(`${char}`, "g");
    
    if(!(char in obj)) {
      let matchArray = str.match(regExp);
      
       if(matchArray.length > 1) {
        obj[char] = [char, matchArray.length];
      
       }
    }
  });
  
  return Object.values(obj).sort(function(a, b) {
    return b[1] - a[1];
  });
    
  }
  
  //sort if same length
  function sortSameLength(a, b) {
    if(a[1] == b[1]){
      if(a[0] > b[0]) {
        return 1;
      }
      return -1;
    }
  }
  let result1 = stringCount(str1);
  let result2 = stringCount(str2);
  
  result1.sort(sortSameLength);
  result2.sort(sortSameLength);
  
 
  console.log(result1);
  console.log("=================");
  console.log(result2);
}
   
mix("looping is fun but dangerous", "less dangerous than coding");




