var Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey:
    "patjsGIL52hHPKxD5.268979266606704c4d789fee776c9503b39b43c66b88becfd9176004c30de73c",
});
var base = Airtable.base("app0SLgEfalGyJkfH");

const fetchData = async () => {
  try {
    const response = await base("booklist").select().firstPage();
    const shuffledData = shuffle(response.map((record) => record.fields));
    const selectedData = shuffledData.slice(0, 24);
    console.log(selectedData);
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

export const masterData = async (id) => {
  try {
    const response = await base("booklist").find(id);
    const field = response.fields;
    console.log(field["이름(한글)"]);
    return [field["이름(한글)"], field[""]];
  } catch (err) {
    console.log(err, "err");
    return [];
  }
};

export default fetchData;
