import React, { useState, useEffect } from "react";
import styles from "./QuestionAnswer.module.scss";
// import axios from "../../../axios/api";
import { BsChevronDown } from "react-icons/bs";
import { FaArrowUp } from "react-icons/fa6";
import { PuffLoader } from "react-spinners";
import axios from "axios";

const QuestionAnswer = () => {
  const [question, setQuestion] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [knowledgeBases, setKnowledgeBases] = useState([]);
  const [selectedKnowledgeBase, setSelectedKnowledgeBase] = useState("");
  const [loading, setLoading] = useState(false);
  const [AiContent, setAiContent] = useState(null);

  useEffect(() => {
    const fetchKnowledgeBases = async () => {
      try {
        const res = await axios.get("list-knowledge-bases");
        setKnowledgeBases(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchKnowledgeBases();
  }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   const body = {
  //     messages: [
  //       {
  //         role: "user",
  //         content: question,
  //       },
  //     ],
  //     stream: false,
  //     knowledge_base_id: selectedKnowledgeBase,
  //     use_context: true,
  //     context_filter: {
  //       doc_ids: [],
  //     },
  //     include_sources: true,
  //     max_tokens: 500,
  //     temperature: 0.9,
  //     limit: 10,
  //   };

  //   try {
  //     const res = await axios.post("chat_completions", body);
  //     setResponseData(res.data.choices[0].message.content);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // open ai alternative

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          temperature: 0.9,
          max_tokens: 90,
          messages: [
            {
              role: "user",
              content: question,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer sk-proj-B7pojX96daPpJzLsQUlKT3BlbkFJrDZDgo9crdWVfFT7CW5y`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      const assistantMessage = {
        role: "assistant",
        content: response.data.choices[0].message.content,
      };

      setAiContent(assistantMessage.content);
    } catch (error) {
      console.error("Error generating response:", error);
    }

    setLoading(false);
  };

  return (
    <div className={styles.QuestionAnswer}>
      <div className={`${styles.formGroup} ${styles.ragCollection}`}>
        <label>Choose RAG Collection</label>
        <div className={styles.customSelect}>
          <select
            value={selectedKnowledgeBase}
            onChange={(e) => setSelectedKnowledgeBase(e.target.value)}
          >
            <option value=""></option>
            {/* {knowledgeBases.map((kb) => (
              <option key={kb.id} value={kb.id}>
                {kb.name}
              </option>
            ))} */}
            <option value="Tejesh">Tejesh</option>
            <option value="Arkalal">Arkalal</option>
          </select>
          <BsChevronDown className={styles.icon} />
        </div>
      </div>

      <div className={`${styles.formGroup} ${styles.QAQuestion}`}>
        <input
          className={styles.QuestionAnswerInput}
          type="text"
          placeholder="Type your question..."
          onChange={(e) => setQuestion(e.target.value)}
        />
        <FaArrowUp onClick={handleSubmit} className={styles.arrowIcon} />
      </div>

      <div className={`${styles.formGroup} ${styles.QAResponse}`}>
        <div className={styles.responseBox}>
          {loading ? (
            <div className={styles.loaderContainer}>
              <PuffLoader color="lightBlue" loading />
            </div>
          ) : AiContent ? (
            <pre>{AiContent}</pre>
          ) : (
            <span className={styles.placeholder}>Response</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionAnswer;
