export default () => {
  let emailFieldPlaceholders = document.querySelectorAll(`.form__field-placeholder--email`);
  let adaptPlaceholder = function (el) {
    if ((window.innerWidth / window.innerHeight < 1) || (window.innerWidth < 769)) {
      el.innerText = `e-mail`;
    } else {
      el.innerText = `e-mail для регистации результата и получения приза`;
    }
  };
  for (let i = 0; i < emailFieldPlaceholders.length; i++) {
    adaptPlaceholder(emailFieldPlaceholders[i]);
    window.addEventListener(`resize`, function () {
      adaptPlaceholder(emailFieldPlaceholders[i]);
    });
  }
};
