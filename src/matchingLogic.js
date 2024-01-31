// const calculateMatchRate = (userSelectedData, initialData) => {
//   const totalSelected = userSelectedData.length;
//   const initialCoverLinks = initialData.map((item) => item["표지 링크"]);

//   const matchCount = userSelectedData.reduce((count, userSelection) => {
//     const hasMatch = initialCoverLinks.includes(userSelection);
//     return hasMatch ? count + 1 : count;
//   }, 0);

//   const matchRate = (matchCount / totalSelected) * 100;
//   return matchRate;
// };

import { masterData } from "./api";

const countRecommender = async (arrayA) => {
  const elementCount = {};
  let mostFrequentElement = null;
  let maxOccurrences = 0;

  // Iterate through each sub-array in arrayA
  for (let i = 0; i < arrayA.length; i++) {
    const subArrayA = arrayA[i];

    // Iterate through each element in the sub-array
    for (let j = 0; j < subArrayA.length; j++) {
      const elementA = subArrayA[j];

      // Increment the count for the current elementA
      elementCount[elementA] = (elementCount[elementA] || 0) + 1;

      // Update the mostFrequentElement if needed
      if (elementCount[elementA] > maxOccurrences) {
        mostFrequentElement = elementA;
        maxOccurrences = elementCount[elementA];
      }
    }
  }
  console.log(mostFrequentElement);
  const mostRecommender = await masterData(mostFrequentElement);
  console.log(mostRecommender);

  return mostRecommender;
};

export default countRecommender;
