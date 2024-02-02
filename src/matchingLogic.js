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
