// Function to capitalize the first letter of each sentence
const capitalizeSentences = (text) => {
  return text.replace(/(?:^|\.\s+)(\w)/g, function (match, p1) {
    return match.toUpperCase();
  });
};

// Function to remove extra spaces
const removeExtraSpaces = (text) => {
  return text.replace(/\s+/g, " ").trim();
};

const formatText = (req, res) => {
  const { text, options } = req.body;

  if (!text) {
    return res
      .status(400)
      .json({ success: false, message: "No text provided" });
  }

  let formattedText = text;

  // Mandatory: Capitalize sentences and remove extra spaces
  formattedText = capitalizeSentences(formattedText);
  formattedText = removeExtraSpaces(formattedText);

  // Optional: Convert to lowercase or uppercase
  if (options.convertToLowercase) {
    formattedText = formattedText.toLowerCase();
  }

  if (options.convertToUppercase) {
    formattedText = formattedText.toUpperCase();
  }

  res.json({ success: true, formattedText });
};

module.exports = { formatText };
