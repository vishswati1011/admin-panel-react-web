export const splitUserName = (name) => {
  if (!name || name.trim() === "") {
    // Handle the case where name is blank
    return ""; // You can return a default value or handle it as per your requirements
  }
  name = name.trim();
  if (name.includes(" ")) {
    let words = name.split(" ");
    return words[0][0] + words[words.length - 1][0];
  } else {
    return name[0];
  }
};
