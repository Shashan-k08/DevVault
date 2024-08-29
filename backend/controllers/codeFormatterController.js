const prettier = require("prettier");

const formatCode = async(req, res) => {
  const { code, language } = req.body;

  let formattedCode;
  try {
    formattedCode = await prettier.format(code, { parser: language });
    console.log(formattedCode)
    res.json({ formattedCode });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = { formatCode };
