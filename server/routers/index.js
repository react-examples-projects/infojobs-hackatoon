const express = require("express");
const router = express.Router();
const openai = require("../config/openai");
const Test = require("../models/Test");
const { error, success } = require("../helpers/httpResponses");
const { extractJSONS } = require("../helpers/utils");

const content = `Eres ChatGPT, un gran modelo de lenguaje entrenado por OpenAI. Responde de la forma más concisa posible. 
                 Límite de conocimientos: {límite de conocimientos} Fecha actual: {fecha_actual}`;

router.post("/", async (req = express.Request, res = express.response) => {
  const { title, skillsList, description, id } = req.body;
  let flag = true,
    tries = 0,
    errorObj = null;
  let skills = "";
  if (skillsList && skillsList?.length > 0) {
    skills += " El test debe contener temas relacionados a: ";
    skills += skillsList.map((sk) => sk.skill).join(", ") + ". ";
    console.log(skills);
  }

  while (flag && tries <= 3) {
    try {
      const result = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0.6,
        messages: [
          {
            role: "system",
            content,
          },
          {
            role: "user",
            content: `Crea un test de evaluación técnica para un puesto de "${title}".${skills}
                      Crea la prueba solamente de los conocimientos o habiladades que requiere el puesto segun la descripción. 
                      Debe ser conciso y sin errores. No quiero que escribas textos demás, solo quiero que me respondas directamente con el formato JSON especificado. 
                      Quiero que el test de evaluación tenga un formato JSON, que empiece con '---' y termine con '---' con la siguiente estructura:
                    ---
                    [{
                      "question" : "titulo de la pregunta...",
                      "options" : ["opcion 1", "opcion 2"],
                      "validOptionIndex": [0, 2, 1]
                    }, 
                    {
                      ...
                    }] ---`,
          },
        ],
      });

      const data = result.data.choices[0].message.content;
      const jsons = extractJSONS(data);

      console.log(jsons.map((json) => json));
      flag = false;
      tries++;

      const test = Array.isArray(jsons?.[0]) ? jsons.flat() : jsons;
      console.log(test);
      
      const basicTest = await Test.create({
        job_id: id,
        questions: test,
      });
      success(res, basicTest);
    } catch (err) {
      console.error(err);
      errorObj = err;
    }

    if ((tries >= 3 || flag) && errorObj !== null) {
      error(res, errorObj.message);
    }
  }
});

module.exports = router;
