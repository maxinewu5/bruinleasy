//function to calculate similarity between two strings
export function jaroWinklerDistance(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const maxDistance = Math.floor(Math.max(m, n) / 2) - 1;
  
    //array to store matches
    const matches1 = new Array(m).fill(false);
    const matches2 = new Array(n).fill(false);
  
    let matches = 0; //count of matching characters
    let transpositions = 0; //count of transpositions
  
    //calculate matches
    for (let i = 0; i < m; i++) {
      const start = Math.max(0, i - maxDistance);
      const end = Math.min(i + maxDistance + 1, n);
      for (let j = start; j < end; j++) {
        if (!matches2[j] && str1[i] === str2[j]) {
          matches1[i] = true;
          matches2[j] = true;
          matches++;
          break;
        }
      }
    }
  
    //no matches found
    if (matches === 0) {
      return 0;
    }
  
    // Calculate transpositions
    let k = 0;
    for (let i = 0; i < m; i++) {
      if (matches1[i]) {
        while (!matches2[k]) {
          k++;
        }
        if (str1[i] !== str2[k]) {
          transpositions++;
        }
        k++;
      }
    }
  
    //calculate similarity
    const similarity = (matches / m + matches / n + (matches - transpositions / 2) / matches) / 3;
  
    //calculate common prefix length (up to 4 characters)
    const prefix = str1.substring(0, 4) === str2.substring(0, 4) ? 1 : 0;
  
    //calculate Jaro-Winkler distance
    const jaroWinklerDistance = similarity + prefix * 0.1 * (1 - similarity);
  
    return jaroWinklerDistance;
}