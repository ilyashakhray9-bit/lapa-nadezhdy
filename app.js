'use strict';

// Все анкеты — вымысел. Фотографии служат только иллюстрациями.
const dogs = [
  {id:'sunny', name:'Солнечный', age:'3 года', ageGroup:'adult', size:'large', sizeLabel:'Большой', sex:'Мальчик', traits:['affectionate','active'], image:1, alt:'Золотистая собака с добрым взглядом', tagline:'Собиратель палочек и солнечных дней.', story:'В нашей истории Солнечный первым встречает утро и последним заканчивает игру. Он любит длинные прогулки, мягкие игрушки и просто быть рядом со своим человеком.', home:'Активный дом, где найдётся время для прогулок, игр и спокойного обучения.'},
  {id:'bim', name:'Бим', age:'2 года', ageGroup:'adult', size:'medium', sizeLabel:'Средний', sex:'Мальчик', traits:['active','affectionate'], image:2, alt:'Собака по имени Бим на иллюстративной фотографии', tagline:'Каждая прогулка — маленькое приключение.', story:'Вымышленный Бим — любопытный исследователь. Он замечает каждую новую тропинку и с удовольствием разучивает трюки. А после насыщенного дня выбирает место поближе к вам.', home:'Человек, которому нравятся прогулки и совместные занятия. Новые впечатления лучше вводить постепенно.'},
  {id:'busya', name:'Буся', age:'5 лет', ageGroup:'adult', size:'small', sizeLabel:'Маленькая', sex:'Девочка', traits:['calm','affectionate'], image:3, alt:'Небольшая собака на иллюстративной фотографии Буси', tagline:'Мастер уютных вечеров и нежных объятий.', story:'В этой придуманной истории Буся не торопится. Она любит короткие прогулки, мягкую подстилку и спокойный голос. Её суперсила — превращать обычный вечер в уютный.', home:'Спокойный дом и внимательный человек, который уважает личное пространство собаки.'},
  {id:'luna', name:'Луна', age:'8 месяцев', ageGroup:'puppy', size:'small', sizeLabel:'Маленькая', sex:'Девочка', traits:['active'], image:4, alt:'Собака на иллюстративной фотографии Луны', tagline:'Маленькие лапы, большие открытия.', story:'Наша вымышленная Луна только знакомится с миром. Ей интересно всё: шуршащие листья, новые игрушки и ваши шнурки. За любопытством скрывается потребность в терпении и поддержке.', home:'Дом, где готовы уделять время воспитанию щенка и постепенно приучать его к повседневным делам. Указан нынешний размер.'},
  {id:'teddy', name:'Тедди', age:'8 лет', ageGroup:'senior', size:'large', sizeLabel:'Большой', sex:'Мальчик', traits:['calm'], image:5, alt:'Собака на иллюстративной фотографии Тедди', tagline:'Друг, с которым хорошо даже молчать.', story:'В нашем концепте Тедди — настоящий ценитель простых вещей. Прогулка без спешки, знакомый маршрут и отдых рядом с человеком — его идеальный день.', home:'Тихий дом с предсказуемым ритмом и комфортным местом для отдыха.'},
  {id:'molly', name:'Молли', age:'1 год', ageGroup:'adult', size:'medium', sizeLabel:'Средняя', sex:'Девочка', traits:['affectionate','calm'], image:6, alt:'Собака на иллюстративной фотографии Молли', tagline:'Сначала чуть робкая. Потом — ваша тень.', story:'Вымышленная Молли знакомится осторожно, зато со временем становится очень нежным компаньоном. Ей важно знать, что её никто не торопит и рядом можно быть собой.', home:'Терпеливый человек, готовый дать время на адаптацию и знакомить с новым в комфортном темпе.'}
];
const traitLabels = {calm:'Спокойный нрав', active:'Любит движение', affectionate:'Ласковый друг'};
const grid = document.querySelector('#dog-grid');
const filters = document.querySelector('#filters');
const dialog = document.querySelector('#dog-dialog');
const form = document.querySelector('#application-form');
const views = ['profile-view','application-view','success-view'];
let selectedDog = null;
let opener = null;

function tagMarkup(dog) { return dog.traits.map(trait => `<span class="tag">${traitLabels[trait]}</span>`).join(''); }
function renderDogs() {
  const age = filters.elements.age.value;
  const size = filters.elements.size.value;
  const temperament = filters.elements.temperament.value;
  const visible = dogs.filter(dog => (age === 'all' || dog.ageGroup === age) && (size === 'all' || dog.size === size) && (temperament === 'all' || dog.traits.includes(temperament)));
  // В HTML вставляются только статические данные этого файла, не пользовательский ввод.
  grid.innerHTML = visible.map(dog => `<article class="dog-card"><div class="dog-image-wrap"><img src="assets/dog-${dog.image}.jpg" alt="${dog.alt}" width="800" height="650" loading="lazy"><span class="card-badge">Вымышленная история</span></div><div class="dog-card-content"><div class="dog-card-heading"><h3>${dog.name}</h3><span>${dog.age} · ${dog.sex.toLowerCase()}</span></div><p class="dog-description">${dog.tagline}</p><div class="tags"><span class="tag">${dog.sizeLabel}</span>${tagMarkup(dog)}</div><button class="card-link" type="button" data-dog="${dog.id}" aria-label="Познакомиться: ${dog.name}">Познакомиться <span aria-hidden="true">↗</span></button></div></article>`).join('');
  document.querySelector('#result-count').textContent = `Показано анкет: ${visible.length} из ${dogs.length}`;
  document.querySelector('#empty-state').hidden = visible.length !== 0;
}
function setView(id) {
  views.forEach(view => { document.getElementById(view).hidden = view !== id; });
  dialog.setAttribute('aria-labelledby', id === 'profile-view' ? 'dialog-title' : id === 'application-view' ? 'application-title' : 'success-title');
  dialog.scrollTop = 0;
}
function openDog(id, trigger) {
  selectedDog = dogs.find(dog => dog.id === id);
  if (!selectedDog) return;
  opener = trigger;
  form.reset();
  document.querySelector('#dialog-title').textContent = selectedDog.name;
  document.querySelector('#profile-photo').src = `assets/dog-${selectedDog.image}.jpg`;
  document.querySelector('#profile-photo').alt = selectedDog.alt;
  document.querySelector('#profile-meta').textContent = `${selectedDog.age} · ${selectedDog.sizeLabel} · ${selectedDog.sex}`;
  document.querySelector('#profile-tags').innerHTML = tagMarkup(selectedDog);
  document.querySelector('#profile-story').textContent = selectedDog.story;
  document.querySelector('#profile-home').textContent = selectedDog.home;
  setView('profile-view');
  dialog.showModal();
  document.body.classList.add('modal-open');
  document.querySelector('#close-dialog').focus();
}
filters.addEventListener('submit', event => event.preventDefault());
filters.addEventListener('change', renderDogs);
filters.addEventListener('reset', () => { requestAnimationFrame(renderDogs); });
document.querySelector('#reset-empty').addEventListener('click', () => { filters.reset(); document.querySelector('#age').focus(); });
document.addEventListener('click', event => {
  const button = event.target.closest('[data-dog]');
  if (button) openDog(button.dataset.dog, button);
});
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
document.querySelector('#finish-demo').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  form.reset();
  if (opener && opener.isConnected) opener.focus();
});
document.querySelector('#open-application').addEventListener('click', () => {
  document.querySelector('#application-dog').textContent = `Герой вашей учебной заявки — ${selectedDog.name}.`;
  setView('application-view');
  document.querySelector('#fill-sample').focus();
});
document.querySelector('#back-profile').addEventListener('click', () => { form.reset(); setView('profile-view'); document.querySelector('#open-application').focus(); });
document.querySelector('#fill-sample').addEventListener('click', () => {
  form.elements.name.value = 'Саша';
  form.elements.email.value = 'sasha@example.com';
  form.elements.message.value = 'Мы бы прогулялись в парке, поиграли и отдохнули дома.';
  form.elements.demo.focus();
});
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  form.reset();
  setView('success-view');
  document.querySelector('#success-title').focus();
});
renderDogs();
