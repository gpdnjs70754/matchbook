var Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey:
    "patjsGIL52hHPKxD5.268979266606704c4d789fee776c9503b39b43c66b88becfd9176004c30de73c",
});
var base = Airtable.base("app0SLgEfalGyJkfH");

export const getMasterlist = async (id) => {
  try {
    console.log(id);
    const masterlist = await base("masterlist").find(id);
    console.log(masterlist);
    // const masterName = masterlist.field["이름(한글)"];
    // console.log(masterName);
    return { id: "" };
  } catch (error) {
    console.error("Error fetching data from Airtable:", error);
    return [];
  }
};
export const fetchImgData = async () => {
  try {
    const booklist = await base("booklist").select().firstPage();

    const booklistArr = booklist.map((record) => record.fields);

    const shuffledData = shuffle(booklistArr);
    const selectedData = shuffledData.slice(0, 24);
    console.log(selectedData);

    return selectedData;
  } catch (error) {
    console.error("Error fetching data from Airtable:", error);
    return [];
  }
};

const fetchData = async () => {
  try {
    const booklist = await base("booklist").select().all();
    const masterlist = await base("masterlist").select().all();
    const masterlistArr = masterlist.map((record) => record.id);

    const booklistArr = booklist.map((record) => record.fields);
    const keyToCheck = "추천인";
    const dataHasRecommender = booklistArr.filter((obj) => keyToCheck in obj);

    const filteredData = getBooksByRecommender(
      dataHasRecommender,
      masterlistArr
    );
    const finalBooklist = Array.from(
      new Set(Object.values(filteredData).flat())
    );

    const shuffledData = shuffle(finalBooklist);
    const selectedData = shuffledData.slice(0, 45);
    console.log(selectedData);

    return selectedData;
  } catch (error) {
    console.error("Error fetching data from Airtable:", error);
    return [];
  }
};
// 추천인 별로 3권의 책 랜덤으로 가져오기
const getBooksByRecommender = (data, recommenders) => {
  const result = {};

  recommenders.forEach((recommender) => {
    const books = data.filter((book) => book["추천인"].includes(recommender));
    const shuffleBook = shuffle(books);
    result[recommender] = shuffleBook.slice(0, 3);
  });

  return result;
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

export const getMasterName = async (id) => {
  try {
    const response = await base("masterlist").find(id);
    const field = response.fields;

    return field["이름(한글)"];
  } catch (err) {
    console.log(err, "err");
    return [];
  }
};

export const masterData = async (id, initialData) => {
  try {
    const response = await base("booklist").find(id);

    const field = response.fields;
    const myArray = initialData.map((item) => item["추천인"]);

    const count = myArray.filter((subArray) => subArray.includes(id)).length;

    return [field["이름(한글)"], field["프로필이미지"], count];
  } catch (err) {
    console.log(err, "err");
    return [];
  }
};

export default fetchData;
