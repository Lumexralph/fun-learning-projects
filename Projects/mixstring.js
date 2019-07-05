function mix(s1, s2) {
  //remove any non-lowercase character
  let str1 = s1.replace(/[^a-z]/g, "");
  let str2 = s2.replace(/[^a-z]/g, "");
  let obj = {};
  
  //helper function to count 
  //character occurence in the strings an populate obj
  function stringCount(str, type) {
    let uniqueStr = [...new Set(str.split(""))];

    uniqueStr.forEach(function(char) {
      let regExp = new RegExp(`${char}`, "g");
      let matchArray = str.match(regExp).join("");
    
      if(!(obj.hasOwnProperty(char))) {
         if(matchArray.length > 1) {
          obj[char] = [`${type}`, matchArray];
         }
      }
      else {
        if(obj[char][1].length < matchArray.length) {
          obj[char] = [`${type}`, matchArray];
        }
        else if(obj[char][1].length === matchArray.length) {
          //3 for easier sorting but will be replaced later
          obj[char] = [`3`, matchArray];
        }
      }
   });
    
  }
  //populate the obj
  stringCount(str1, 1);
  stringCount(str2, 2);
  
  //get the data of the char from obj
  let objectKeys = Object.keys(obj);
  let objValues = objectKeys.map(function(key) {
    return obj[key];
  })

 objValues.sort(function(a, b) {
   let keyA = Number(a[0]);
   let keyB = Number(b[0]);
   let firstCharA = a[1][0];
   let firstCharB = b[1][0];
   let lengthA = a[1].length;
   let lengthB = b[1].length;
   
   //compare by keys, length and unicode order
   if(lengthA < lengthB) return 1;
   if(lengthA > lengthB) return -1;
   if(keyA < keyB) return -1;
   if(keyA > keyB) return 1;
   if(firstCharA < firstCharB) return -1;
   if(firstCharA > firstCharB) return 1;
   return 0;
   
 });
 
//join the array and make final pattern
return objValues.reduce(function(acc, nextValue) {
        //console.log(acc);
        if(nextValue[0] === "3") nextValue[0] = "=";
        return acc.concat(nextValue.join(":"));
}, []).join("/");
 
  
}
   
mix("A generation must confront the looming ", "codewarrs");




