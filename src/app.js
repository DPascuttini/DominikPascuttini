document.addEventListener('DOMContentLoaded', function () {
  const typewriterText = 'Budi izvrstan u onom što voliš!';
  const orangeText = 'Zaiskri!';
  const typingSpeed = 50;
  const delayBeforeDeleting = 1000;

  const typewriter = document.querySelector('.typewriter h1');
  const orangeHeader = document.querySelector('.typewriter h2');

  function typeText(element, text, index = 0) {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      setTimeout(() => typeText(element, text, index + 1), typingSpeed);
    } else {
      if (text === typewriterText) {
        setTimeout(() => deleteText(typewriter), delayBeforeDeleting);
      } else {
        typeOrangeText(orangeHeader, orangeText);
      }
    }
  }

  function deleteText(element, index = element.textContent.length - 1) {
    if (index >= 0) {
      element.textContent = element.textContent.substring(0, index);
      setTimeout(() => deleteText(element, index - 1), typingSpeed);
    } else {
      setTimeout(() => typeText(typewriter, typewriterText), typingSpeed);
    }
  }

  function typeOrangeText(element, text, index = 0) {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      setTimeout(() => typeOrangeText(element, text, index + 1), typingSpeed);
    }
  }

  // Start the typing animation
  typeText(typewriter, typewriterText);
});
