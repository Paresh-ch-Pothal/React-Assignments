const express = require('express')
const app = express()
const cors = require('cors')
const translator = require("open-google-translator");

app.use(cors())
app.use(express.json())

app.get('/api/getLanguages',async (req,res) =>{
    const languages = translator.supportedLanguages();
    return  res.status(200).json({languages : languages,success: true})
})

app.post("/api/translate", async (req, res) => {
  const { text, fromLanguage, toLanguage } = req.body;

  try {
    const result = await translator.TranslateLanguageData({
      listOfWordsToTranslate: [text],
      fromLanguage,
      toLanguage,
    });
    return res.status(200).json({ translated: result[0],success: true });
  } catch (err) {
    res.status(500).json({ error: "Translation failed." });
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));