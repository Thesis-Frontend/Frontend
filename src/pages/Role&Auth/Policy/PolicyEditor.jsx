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
  const [snackbar, setSnackbar] = useState({
    show: false,
    message: "",
    severity: "info",
  });
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
      setSnackbar({
        show: true,
        message: "The JSON is invalid. Please fix the errors and try again.",
        severity: "error",
      });
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
        setSnackbar({
          show: true,
          message: "Policy saved successfully",
          severity: "success",
        });
      } else {
        setSnackbar({
          show: true,
          message: "Failed to save policy",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error saving policy:", error);
      setSnackbar({
        show: true,
        message: "Failed to save policy",
        severity: "error",
      });
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
      setSnackbar({
        show: true,
        message: "The JSON is invalid. Please fix the errors and try again.",
        severity: "error",
      });
    }
  };

  const minifyJson = () => {
    try {
      const minified = JSON.stringify(JSON.parse(policyString));
      setPolicyString(minified);
    } catch (error) {
      setSnackbar({
        show: true,
        message: "The JSON is invalid. Please fix the errors and try again.",
        severity: "error",
      });
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
        setSnackbar({
          show: true,
          message: "Handbook downloaded successfully",
          severity: "success",
        });
      } else {
        setSnackbar({
          show: true,
          message: "Failed to download handbook",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error downloading handbook:", error);
      setSnackbar({
        show: true,
        message: "Failed to download handbook",
        severity: "error",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, show: false });
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
          <svg
            className="h-8 w-8 animate-spin self-end"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M304 48a48 48 0 1 0 -96 0 48 48 a 1 0 0 0 96 0zM304 416 a 48 48 0 1 0 -96 0 48 48 a 1 0 0 0 96 0zM48 304a48 48 a 1 0 0 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
          </svg>
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
        message={snackbar.message}
        show={snackbar.show}
        severity={snackbar.severity}
        onClose={closeSnackbar}
      />
    </div>
  );
};

export default PolicyEditor;
