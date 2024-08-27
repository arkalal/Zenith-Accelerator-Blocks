import React, { useState, useImperativeHandle, forwardRef } from "react";
import styles from "./EntityExtraction.module.scss";
import { FaPlus, FaTrash, FaChevronDown } from "react-icons/fa";
import axios from "../../../axios/api";
import { PuffLoader } from "react-spinners";

const EntityExtraction = forwardRef((props, ref) => {
  const [fields, setFields] = useState([
    { id: 1, fieldName: "", type: "", required: false },
  ]);
  const [document, setDocument] = useState("");
  const [response, setResponse] = useState();
  const [DropdownUsed, setDropdownUsed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddField = () => {
    setFields([
      ...fields,
      { id: fields.length + 1, fieldName: "", type: "string", required: false },
    ]);
  };

  const handleRemoveField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const handleInputChange = (id, event) => {
    const newFields = fields.map((field) => {
      if (field.id === id) {
        return { ...field, [event.target.name]: event.target.value };
      }
      return field;
    });
    setFields(newFields);
  };

  const handleCheckboxChange = (id) => {
    const newFields = fields.map((field) => {
      if (field.id === id) {
        return { ...field, required: !field.required };
      }
      return field;
    });
    setFields(newFields);
  };

  const handleSubmit = async () => {
    const entity_schema = {};
    fields.forEach((field) => {
      entity_schema[field.fieldName] = {
        required: field.required,
        type: field.type,
      };
    });

    const body = {
      document,
      entity_schema,
      model: "gpt-3.5-turbo",
    };

    setLoading(true);

    try {
      const res = await axios.post("blocks/extract", body);
      setResponse(res.data);
      console.log("response", res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  return (
    <div className={styles.EntityExtraction}>
      <div className={styles.EntityExtractionBox}>
        <div
          className={`${styles.formGroup} ${styles.EntityExtractionDocument}`}
        >
          <label>Document Context</label>
          <textarea
            placeholder="Enter here"
            value={document}
            onChange={(e) => setDocument(e.target.value)}
          ></textarea>
        </div>

        <div className={styles.EntityExtractionFormActions}>
          {fields.map((field, index) => (
            <div key={field.id} className={styles.EntityExtractionPanel}>
              <div className={styles.EntityExtractionField}>
                <label>Field</label>

                <input
                  type="text"
                  name="fieldName"
                  placeholder="name"
                  value={field.fieldName}
                  onChange={(e) => handleInputChange(field.id, e)}
                />
              </div>

              <div className={styles.EntityExtractionType}>
                <select
                  name="type"
                  value={field.type}
                  onChange={(e) => {
                    handleInputChange(field.id, e);
                    setDropdownUsed(true);
                  }}
                >
                  <option value=""></option>
                  <option value="string">string</option>
                  <option value="number">number</option>
                  <option value="boolean">boolean</option>
                </select>

                {!DropdownUsed && (
                  <span className={styles.placeholder}>type</span>
                )}

                <FaChevronDown className={styles.dropdownIcon} />
              </div>

              <div className={styles.EntityExtractionRequired}>
                <label>Required</label>

                <input
                  type="radio"
                  checked={field.required}
                  onChange={() => handleCheckboxChange(field.id)}
                />
              </div>

              {index > 0 && (
                <FaTrash
                  onClick={() => handleRemoveField(field.id)}
                  className={styles.entityTrash}
                />
              )}
            </div>
          ))}

          <div className={styles.EntityExtractionAddEntity}>
            <button onClick={handleAddField}>
              <FaPlus /> add
            </button>
          </div>
        </div>
      </div>

      <div className={`${styles.formGroup} ${styles.EntityExtractionResponse}`}>
        <div className={styles.responseBox}>
          {loading ? (
            <div className={styles.loaderContainer}>
              <PuffLoader color="lightBlue" loading />
            </div>
          ) : response ? (
            <pre>{JSON.stringify(response, null, 2)}</pre>
          ) : (
            <span className={styles.placeholder}>Response</span>
          )}
        </div>
      </div>
    </div>
  );
});

export default EntityExtraction;
