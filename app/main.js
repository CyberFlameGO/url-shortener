import './styles/index.scss';

const modal = document.querySelector('.modal');
const modalClose = modal.querySelector('.modal__close');
const modalOverlay = modal.querySelector('.modal__overlay');
const modalUrl = modal.querySelector('.modal__url');
const modalCopy = modal.querySelector('.modal__copy-btn');
const errorBar = document.querySelector('.error-bar');

document.querySelector('.form').onsubmit = (e) => {
  e.preventDefault();
  const val = document.querySelector('.inp').value;

  fetch('api/submit', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      url: val,
    }),
  }).then(res => res.json()).then((json) => {
    if (json.error) {
      errorBar.classList.add('is-active');
    } else {
      errorBar.classList.remove('is-active');
      modalUrl.value = window.location.href + json.short;
      modalUrl.select();
      modal.classList.add('is-active');
    }
  });
};

function closeModal() {
  modal.classList.remove('is-active');
}
modalClose.onclick = () => { closeModal(); };
modalOverlay.onclick = () => { closeModal(); };
document.onkeydown = (e) => {
  if (e.keyCode === 27) {
    closeModal();
  }
};

modalCopy.onclick = () => {
  modalUrl.select();
  document.execCommand('copy');
};
