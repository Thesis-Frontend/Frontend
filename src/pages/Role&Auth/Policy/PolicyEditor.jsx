import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Snackbar from "../../../components/Snackbar";

const PolicyEditor = () => {
  const { id } = useParams();
  const [policy, setPolicy] = useState({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: ["lambda:InvokeFunction"],
        Resource: [],
      },
    ],
  });
  const [policyString, setPolicyString] = useState(
    JSON.stringify(policy, null, 2)
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [errors, setErrors] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const response = await fetch(`/api/policies/${id}`);
        if (response.status === 200) {
          const data = await response.json();
          setPolicy(data);
          setPolicyString(JSON.stringify(data, null, 2));
        }
      } catch (error) {
        console.error("Error fetching policy:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id !== "new") {
      fetchPolicy();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setPolicyString(value);
    try {
      const parsedPolicy = JSON.parse(value);
      setPolicy(parsedPolicy);
      setIsValid(true);
      setErrors([]);
    } catch (error) {
      const errorMessage = error.message;
      const lineNumber = errorMessage.match(/line (\d+)/);
      const accurateLineNumbers = lineNumber
        ? [parseInt(lineNumber[1])]
        : findErrorLines(value);
      setErrors(accurateLineNumbers);
      setIsValid(false);
    }
  };

  const handleSubmit = async () => {
    if (!isValid) {
      setSnackbarMessage(
        `The JSON is invalid. Please fix the errors and try again.`
      );
      setShowSnackbar(true);
      setSeverity("error");

      return;
    }
    try {
      const response = await fetch(`/api/policies/${id}`, {
        method: id === "new" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(policy),
      });
      if (response.status === 200) {
        setSnackbarMessage(`Policy saved successfully`);
        setShowSnackbar(true);
        setSeverity("success");
      } else {
        setSnackbarMessage(`Failed to save policy`);
        setShowSnackbar(true);
        setSeverity("error");
      }
    } catch (error) {
      console.error("Error saving policy:", error);
      setSnackbarMessage(`Failed to save policy`);
      setShowSnackbar(true);
      setSeverity("error");
    }
  };

  const findErrorLines = (value) => {
    const lines = value.split("\n");
    const errorLines = [];
    for (let i = 0; i < lines.length; i++) {
      try {
        JSON.parse(lines.slice(0, i + 1).join("\n"));
      } catch (error) {
        errorLines.push(i + 1);
      }
    }
    return errorLines.length > 0 ? errorLines : [1];
  };

  const generateLineNumbers = () => {
    const lines = policyString.split("\n").length;
    return Array.from({ length: lines }, (_, i) => i + 1).join("\n");
  };

  const highlightErrors = (lineNumber) => {
    return errors.includes(lineNumber) ? "bg-red-500/20" : "";
  };

  const formatJson = () => {
    try {
      const formatted = JSON.stringify(JSON.parse(policyString), null, 2);
      setPolicyString(formatted);
    } catch (error) {
      ssetSnackbarMessage(
        `The JSON is invalid. Please fix the errors and try again.`
      );
      setShowSnackbar(true);
      setSeverity("error");
    }
  };

  const minifyJson = () => {
    try {
      const minified = JSON.stringify(JSON.parse(policyString));
      setPolicyString(minified);
    } catch (error) {
      setSnackbarMessage(
        `The JSON is invalid. Please fix the errors and try again.`
      );
      setShowSnackbar(true);
      setSeverity("error");
    }
  };

  const downloadHandbook = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch("/api/download-handbook");
      if (response.status === 200) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "handbook.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setSnackbarMessage(`Handbook downloaded successfully`);
        setShowSnackbar(true);
        setSeverity("success");
      } else {
        setSnackbarMessage(`Failed to download handbook`);
        setShowSnackbar(true);
        setSeverity("error");
      }
    } catch (error) {
      console.error("Error downloading handbook:", error);
      setSnackbarMessage(`Failed to download handbook`);
      setShowSnackbar(true);
      set;
    } finally {
      setIsDownloading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-8 bg-white shadow-md h-full flex flex-col rounded-lg max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Policy Editor</h2>
        {isValid ? (
          <div className="text-green-500">
            <i className="fas fa-check-circle"></i> Correct
          </div>
        ) : (
          <div className="text-red-500">
            <i className="fas fa-times-circle"></i> Invalid JSON format
          </div>
        )}
      </div>
      <div className="relative flex mb-4" style={{ height: "80%" }}>
        <div
          className="bg-gray-200 text-center pr-2 z-10"
          style={{ lineHeight: "1.5rem" }}
        >
          <pre className="text-gray-500 z-10">{generateLineNumbers()}</pre>
        </div>
        <textarea
          ref={textareaRef}
          className={`w-full overflow-hidden min-h-80 border text-lg ${
            isValid ? "border-gray-300" : "border-red-500"
          } rounded border-l-0 rounded-l-none font-mono`}
          value={policyString}
          onChange={handleInputChange}
          style={{ fontFamily: "monospace", lineHeight: "1.5rem" }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <pre className="text-transparent whitespace-pre-wrap">
            {policyString.split("\n").map((line, index) => (
              <div key={index} className={highlightErrors(index + 1)}>
                {line}
              </div>
            ))}
          </pre>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        {isDownloading ? (
          <div className="loader"></div>
        ) : (
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
            onClick={downloadHandbook}
            disabled={isDownloading}
          >
            Download Handbook
          </button>
        )}
        <div className="flex gap-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            onClick={minifyJson}
          >
            Minify
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            onClick={formatJson}
          >
            Format
          </button>
        </div>
      </div>
      <button
        className="save-button self-end bg-blue-500 w-1/4 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
        onClick={handleSubmit}
      >
        Save
      </button>
      <Snackbar
        message={snackbarMessage}
        show={showSnackbar}
        setShow={setShowSnackbar}
        severity={severity}
      />
    </div>
  );
};

export default PolicyEditor;
