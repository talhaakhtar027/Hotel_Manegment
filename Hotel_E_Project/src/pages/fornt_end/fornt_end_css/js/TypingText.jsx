import React, { useState, useEffect } from "react";

const TypingText = () => {
  const texts = [
    " Honeymoon. ",
    " Vacation. ",
    " Trip. "
  ];
  
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);  // Index for tracking the current text
  const [charIndex, setCharIndex] = useState(0);  // Index for tracking the character being typed
  const [isDeleting, setIsDeleting] = useState(false);  // Flag to track if we're deleting text

  useEffect(() => {
    if (isDeleting) {
      // Delete characters
      if (charIndex > 0) {
        setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
          setCharIndex(charIndex - 1);
        }, 100);  // Adjust speed of deletion
      } else {
        // When deletion is done, move to the next text
        setIsDeleting(false);
        setIndex((prevIndex) => (prevIndex + 1) % texts.length);  // Move to next text
      }
    } else {
      // Type characters
      if (charIndex < texts[index].length) {
        setTimeout(() => {
          setDisplayText((prev) => prev + texts[index].charAt(charIndex));
          setCharIndex(charIndex + 1);
        }, 150);  // Adjust speed as needed
      } else {
        // After typing, wait before starting to delete
        setTimeout(() => {
          setIsDeleting(true);  // Start deleting after typing
        }, 1000);  // Wait for 1 second before deleting
      }
    }
  }, [charIndex, index, displayText, isDeleting, texts]);

  return <>{'Enjoy Your Dream ' + displayText}</>;
};

export default TypingText;
