import throttle from 'lodash.throttle';

const FORM_STATE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

let localValue = {};

if (localStorage.hasOwnProperty(FORM_STATE_KEY)) {
  localValue = JSON.parse(localStorage.getItem(FORM_STATE_KEY));

  for (let f in localValue) {
    form[f].value = localValue[f];
  }
}

form.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(e) {
  const formData = new FormData(form);

  formData.forEach((a, b) => (localValue[b] = a));

  localStorage.setItem(FORM_STATE_KEY, JSON.stringify(localValue));
}

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  if (!form.email.value || !form.message.value) {
    console.log('empty');
    return;
  }
  form.reset();

  console.log(localValue);

  localValue = {};

  localStorage.removeItem(FORM_STATE_KEY);
}
