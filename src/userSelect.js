import { getMasterName } from "./api";

export const userSelect = async (userSelectData) => {
  const masterNameObject = {};
  for (let i = 0; i < userSelectData.length; i++) {
    const subArrayA = userSelectData[i]["추천인"];

    // Iterate through each element in the sub-array
    for (let j = 0; j < subArrayA.length; j++) {
      const master = subArrayA[j].toString();
      const masterName = await getMasterName(master);

      //   masterNameList.push({ [master.toString()]: masterName });
      masterNameObject[master] = masterName;
    }
  }

  return masterNameObject;
};

export default userSelect;
