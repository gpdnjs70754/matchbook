var Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey:
    "patjsGIL52hHPKxD5.268979266606704c4d789fee776c9503b39b43c66b88becfd9176004c30de73c",
});
var base = Airtable.base("app0SLgEfalGyJkfH");

const fetchData = async () => {
  try {
    const response = await base("booklist").select().all();
    const responseArr = response.map((record) => record.fields);
    const keyToCheck = "추천인";
    const dataHasRecommender = responseArr.filter((obj) => keyToCheck in obj);

    const shuffledData = shuffle(dataHasRecommender);
    const selectedData = shuffledData.slice(0, 24);

    return selectedData;
  } catch (error) {
    console.error("Error fetching data from Airtable:", error);
    return [];
  }
};

// Function to shuffle an array randomly
const shuffle = (array) => {
  let currentIndex = array.length;
  let randomIndex, tempValue;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap the elements
    tempValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tempValue;
  }

  return array;
};

export const masterData = async (id, initialData) => {
  try {
    const response = await base("booklist").find(id);
    const field = response.fields;
    const myArray = initialData.map((item) => item["추천인"]);
    console.log(myArray);
    const count = myArray.filter((subArray) => subArray.includes(id)).length;

    return [field["이름(한글)"], field["프로필이미지"], count];
  } catch (err) {
    console.log(err, "err");
    return [];
  }
};

export default fetchData;
