export const animateChars = (node, options) => {
  const text = node.innerText.trim();
  const chars = text.split(``);
  const animatedText = chars.reduce((fragment, char, index) => {
    const span = document.createElement(`span`);
    span.innerText = char;
    span.style.display = `inline-block`;
    span.style.animation = options[index] || ``;
    span.style.transformOrigin = `center bottom`;
    if (/\s/.test(char)) {
      span.style.marginRight = `2.5rem`;
    }
    fragment.appendChild(span);

    return fragment;
  }, document.createDocumentFragment());

  node.innerHTML = ``;
  node.appendChild(animatedText);
};

export const getCharAnimation = (options = {}) => {
  const duration = options.duration || 0.5;
  const delay = options.delay;

  return `${duration}s cubic-bezier(.14,.38,.34,1.06) ${delay}s 1 both slideInVerticalUp`;
};

