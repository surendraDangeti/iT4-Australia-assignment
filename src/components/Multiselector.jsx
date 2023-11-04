import React, { useState, useEffect, useRef } from "react";
import colourOptions from './colourOptions.json'

export function Multiselector() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showError, setShowError] = useState(false)
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const handleOptionClick = (option) => {
     if(showError){
       setShowError(false)
     }
    if (selectedOptions.includes(option)) {
      const updatedOptions = selectedOptions.filter(
        (selectedOption) => selectedOption !== option
      );
      setSelectedOptions(updatedOptions);
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
    setFilterText("");
  };

  const handleRemoveOption = (option) => {
    const updatedOptions = selectedOptions.filter(
      (selectedOption) => selectedOption !== option
    );
    setSelectedOptions(updatedOptions);
  };

  const filteredOptions = colourOptions.filter((option) =>
    option.label.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleContainerClick = () => {
    inputRef.current.focus();
  };


  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const submitHandler = ()=>{
     if(selectedOptions && selectedOptions.length > 0){
     if(showError){
      setShowError(false)
     }
      console.log("data", selectedOptions)
      alert("Your data is added successfully")
      setSelectedOptions([])
     }
     else{
      setShowError(true)
      console.log("options are not selected")
     }
  }

  const removeSelectedDataHandler=() =>{
     setSelectedOptions([])
     setFilterText("")

  }

  return (
    <div className="container">
      <h3>Multi input selector</h3>
      <div className="sub-container" ref={containerRef}>
        <div className={showError ? "selected-options-input dangerboarder":"selected-options-input"} onClick={handleContainerClick}>
          {selectedOptions.map((option) => (
            <div  key={option.value} className="seleted-items">
            <span>{option.value}</span>
            <span
              key={option.value}
              className="selected-option cross-icon"
              onClick={() => handleRemoveOption(option)}
            >
               ×
            </span>
            </div>
          ))}
          <input
            type="text"
            value={filterText}
            onChange={(e) => {
              setFilterText(e.target.value);
              setShowSuggestions(true);
            }}
            onClick={() => setFilterText("")}
            ref={inputRef}
          />
          <span className="arrow" onClick={removeSelectedDataHandler}>
            x
          </span>
          
        </div>
        {showSuggestions && (
          <ul className="options-list">
            {filteredOptions.map((option) => (
              <li key={option.value} onClick={() => handleOptionClick(option)}>
                <label
                  className={`option-label ${
                    selectedOptions.includes(option) ? "selected" : ""
                  }`}
                >
                  {option.label}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
      {showError && <div className="error-text">Please add at least one option</div>}
      <button disabled={selectedOptions.length < 1} className={selectedOptions.length < 1 ? "btn-submit disabled": "btn-submit" }onClick={()=> submitHandler()}>Submit</button>
    </div>
  );
}
