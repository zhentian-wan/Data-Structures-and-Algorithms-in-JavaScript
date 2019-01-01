 /**
 * FIND THE LONGEST COMMON subsequence BY USING DYNAMICE PROGRAMMING
 *
 * @params:
 * str1: string
 * str2: string
 * i1: number
 * i2: number
 * memo: array []
 *
 * TC: O(L*M) << O(2^(L*M))
 */

function LCS(str1, str2) {
    const memo = [...Array(str1.length)].map(e => Array(str2.length));
  
    /**
     * @return longest common subsequence string
     */
    function helper(str1, str2, i1, i2, memo) {
      console.log(`str1, str2, ${i1}, ${i2}`);
      // if the input string is empty
      if (str1.length === i1 || str2.length === i2) {
        return "";
      }
      // check the memo, whether it contians the value
      if (memo[i1][i2] !== undefined) {
        return memo[i1][i2];
      }
      // if the first latter is the same
      // "A" + LCS(CDEB, EBC)
      if (str1[i1] === str2[i2]) {
        memo[i1][i2] = str1[i1] + helper(str1, str2, i1 + 1, i2 + 1, memo);
        return memo[i1][i2];
      }
  
      // Max { "C" + LCS(DEB, EBC), "E" + LCB(CDEB, BC) }
      let result;
      const resultA = helper(str1, str2, i1 + 1, i2, memo); // L
      const resultB = helper(str1, str2, i1, i2 + 1, memo); // M
  
      if (resultA.length > resultB.length) {
        result = resultA;
      } else {
        result = resultB;
      }
  
      memo[i1][i2] = result;
      return result;
    }
  
    return {
      result: helper(str1, str2, 0, 0, memo),
      memo
    };
  }
  
  //const str1 = "I am current working in Finland @Nordea",
  //str2 = "I am currently working in Finland at Nordea";
  
  const str1 = "ACDEB",
    str2 = "GAEBC";
  
  const { result, memo } = LCS(str1, str2);
  console.log(
    `
     ${str1}  
     ${str2}
     's longest common sequence is 
     "${result === "" ? "Empty!!!" : result}"
    `
  );
  
  console.log(memo);
  