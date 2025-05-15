export const processTextWithLinks = (text) => {
  console.log(text);
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  const emailPattern = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g;

  const parts = text?.split(/(\s+)/).map((part, index) => {
    console.log(parts);
    if (urlPattern.test(part)) {
      return (
        <a
          key={index}
          href={part.startsWith("http") ? part : `http://${part}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "blue" }}
        >
          {part}
        </a>
      );
    } else if (emailPattern.test(part)) {
      return (
        <a key={index} href={`mailto:${part}`} style={{ color: "blue" }}>
          {part}
        </a>
      );
    } else {
      return part;
    }
  });

  return parts;
};

export const formatLink = (text) => {
  const urlPattern = /^(https?:\/\/[^\s]+)/;
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+$/;
  const websitePattern = /^[^\s]+$/;

  if (urlPattern.test(text)) {
    // If text already starts with http:// or https://
    return (
      <a
        href={text}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "blue" }}
      >
        {text}
      </a>
    );
  } else if (emailPattern.test(text)) {
    // If text is an email address
    return (
      <a href={`mailto:${text}`} style={{ color: "blue" }}>
        {text}
      </a>
    );
  } else if (websitePattern.test(text)) {
    // If text looks like a website but without http:// or https://
    return (
      <a
        href={`http://${text}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "blue" }}
      >
        {text}
      </a>
    );
  } else {
    // If text is neither a URL nor an email, just return the text
    return text;
  }
};

export const processTextWithLinksCombined = (text) => {
  if (!text) return text;

  const urlPattern = /(https?:\/\/[^\s]+)/g;
  const emailPattern = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g;
  const websitePattern = /([^\s]+\.[a-zA-Z]{2,6})(\/[^\s]*)?/g;

  // Split the text by spaces to handle individual parts
  const parts = text.split(/(\s+)/).map((part, index) => {
    if (urlPattern.test(part)) {
      // Match URLs starting with http:// or https://
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "blue" }}
        >
          {part}
        </a>
      );
    } else if (emailPattern.test(part)) {
      // Match email addresses
      return (
        <a key={index} href={`mailto:${part}`} style={{ color: "blue" }}>
          {part}
        </a>
      );
    } else if (websitePattern.test(part) && !part.startsWith("http")) {
      // Match websites without http:// or https:// and add http://
      return (
        <a
          key={index}
          href={`http://${part}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "blue" }}
        >
          {part}
        </a>
      );
    } else {
      // Return the part as is if it's not a URL or email
      return part;
    }
  });

  return parts;
};
