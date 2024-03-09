import { masterData } from "./api";

const countRecommender = async (userSelected, initialData) => {
  const elementCount = {};
  let mostFrequentElement = null;
  let maxOccurrences = 0;

  // Iterate through each sub-array in arrayA
  for (let i = 0; i < userSelected.length; i++) {
    const subArrayA = userSelected[i]["추천인"];

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

  const mostRecommender = await masterData(mostFrequentElement, initialData);

  return [mostRecommender, maxOccurrences];
};

export default countRecommender;
