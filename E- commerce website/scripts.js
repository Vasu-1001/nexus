/* E-Learn frontend demo (vanilla JS)
   - Hash routing: #home, #courses, #course-<id>, #dashboard, #contact
   - mock data below
   - Enrollment saved to localStorage
*/

const app = document.getElementById('app');
const yearSpan = document.getElementById('year');
yearSpan.textContent = new Date().getFullYear();

/* ---------- Mock Data ---------- */
const instructors = [
  { id: 1, name: "Anita Raj", bio: "Frontend dev & designer", avatar: "" },
  { id: 2, name: "Ramesh Kumar", bio: "Data scientist & ML engineer", avatar: "" },
  { id: 3, name: "Sofia Das", bio: "Fullstack developer", avatar: "" }
];

const courses = [
  {
    id: "c-html-css-js",
    title: "Web Fundamentals: HTML, CSS & JS",
    slug: "web-fundamentals",
    description: "Start building websites using plain HTML, CSS and JavaScript. Project based.",
    category: "Programming",
    level: "Beginner",
    duration: "6h",
    price: 0,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=54c3f8c2b30f47c1b5a7f0f87fb883b0",
    instructorId: 1,
    lessons: [
      { id: "l1", title: "Intro & Setup", type: "video", duration: "10m", contentUrl: "" },
      { id: "l2", title: "HTML Basics", type: "video", duration: "40m", contentUrl: "" },
      { id: "l3", title: "CSS Layouts", type: "video", duration: "60m", contentUrl: "" }
    ],
    reviews: [{ name: "Vasu", text: "Great intro!", rating: 5 }]
  },
  {
    id: "c-js-advance",
    title: "JavaScript: From Zero to Advanced",
    slug: "js-advanced",
    description: "Deep dive into modern JavaScript: ES6+, async, DOM and patterns.",
    category: "Programming",
    level: "Intermediate",
    duration: "12h",
    price: 499,
    rating: 4.8,
    image: "data:image/jpeg;base64,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",
    instructorId: 3,
    lessons: [
      { id: "l1", title: "Advanced Functions", type: "video", duration: "40m", contentUrl: "" },
      { id: "l2", title: "Async & Promises", type: "video", duration: "50m", contentUrl: "" }
    ],
    reviews: [{ name: "Karthi", text: "Very detailed", rating: 5 }]
  },
  {
    id: "c-python-data",
    title: "Data Science Basics with Python",
    slug: "data-python",
    description: "Learn data cleaning, visualizations and basic ML concepts using Python (theory front-end demo).",
    category: "Data Science",
    level: "Beginner",
    duration: "10h",
    price: 299,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=7a2f3f9b9a2f4bd8e2a0f90a1b2a3b44",
    instructorId: 2,
    lessons: [
      { id: "l1", title: "Intro to Data", type: "video", duration: "30m", contentUrl: "" }
    ],
    reviews: []
  },
  {
    id: "c-react-basics",
    title: "React Basics (concepts without framework)",
    slug: "react-basics",
    description: "Learn component thinking and how a UI library works under the hood — implemented demo using plain JS.",
    category: "Programming",
    level: "Intermediate",
    duration: "8h",
    price: 399,
    rating: 4.5,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_wvCyVaYe-HA7hviOFVWt7mc_lfHNDeUmRiqTKd3JaEwqUM0Ikxez4KY&s",
    instructorId: 3,
    lessons: [
      { id: "l1", title: "Virtual DOM concept", type: "video", duration: "35m", contentUrl: "" }
    ],
    reviews: []
  },
  {
    id: "c-uiux",
    title: "UI/UX Design Essentials",
    slug: "uiux",
    description: "Design principles and practical tips to make interfaces that users love.",
    category: "Design",
    level: "Beginner",
    duration: "5h",
    price: 199,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=0bfc3a7c0f5a8f9d1b2f3b7d8f9e6a4f",
    instructorId: 1,
    lessons: [
      { id: "l1", title: "Design basics", type: "video", duration: "30m", contentUrl: "" }
    ],
    reviews: []
  },
  {
    id: "c-ml-intro",
    title: "Machine Learning Intro (theory)",
    slug: "ml-intro",
    description: "High level concepts of ML for beginners. (frontend demo content)",
    category: "Data Science",
    level: "Advanced",
    duration: "14h",
    price: 599,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=33d9f4ad7c2a1c3b3d4f5e6a7b8c9d0e",
    instructorId: 2,
    lessons: [
      { id: "l1", title: "ML Concepts", type: "video", duration: "1h", contentUrl: "" }
    ],
    reviews: []
  }
];

/* ---------- Utilities & State ---------- */
const state = {
  user: null,
  enrollments: JSON.parse(localStorage.getItem('enrollments') || '[]')
};

function saveEnrollments() {
  localStorage.setItem('enrollments', JSON.stringify(state.enrollments));
}

/* ---------- Basic Router ---------- */
function router() {
  const hash = location.hash || '#home';
  const main = hash.split('#')[1] || 'home';
  if (main.startsWith('course-')) {
    const id = main.split('course-')[1];
    renderCourseDetail(id);
  } else {
    switch (main) {
      case 'home': renderHome(); break;
      case 'courses': renderCourses(); break;
      case 'dashboard': renderDashboard(); break;
      case 'contact': renderContact(); break;
      default: renderHome();
    }
  }
}

/* ---------- Renderers ---------- */
function renderHome() {
  const tpl = document.getElementById('home-template').content.cloneNode(true);
  const featured = tpl.getElementById('featured-list');
  // show first 4 courses as featured
  courses.slice(0, 4).forEach(c => {
    const card = createCourseCard(c);
    featured.appendChild(card);
  });
  app.innerHTML = ''; app.appendChild(tpl);
  // attach hero sign up
  const hs = document.getElementById('hero-signup');
  if (hs) hs.addEventListener('click', () => openAuth('signup'));
}

function renderCourses() {
  const tpl = document.getElementById('courses-template').content.cloneNode(true);
  app.innerHTML = ''; app.appendChild(tpl);

  const grid = document.getElementById('courses-grid');
  const search = document.getElementById('search-input');
  const catSel = document.getElementById('category-filter');
  const levelSel = document.getElementById('level-filter');
  const clearBtn = document.getElementById('clear-filters');

  // populate categories
  const cats = [...new Set(courses.map(c => c.category))];
  cats.forEach(cat => {
    const opt = document.createElement('option'); opt.value = cat; opt.textContent = cat;
    catSel.appendChild(opt);
  });

  function show(list) {
    grid.innerHTML = '';
    if (list.length === 0) {
      grid.innerHTML = '<p>No courses found.</p>'; return;
    }
    list.forEach(c => grid.appendChild(createCourseCard(c)));
  }

  show(courses);

  function filterAndSearch() {
    const q = search.value.trim().toLowerCase();
    const cat = catSel.value;
    const level = levelSel.value;
    const filtered = courses.filter(c => {
      if (cat && c.category !== cat) return false;
      if (level && c.level !== level) return false;
      if (q && !(c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q))) return false;
      return true;
    });
    show(filtered);
  }

  search.addEventListener('input', filterAndSearch);
  catSel.addEventListener('change', filterAndSearch);
  levelSel.addEventListener('change', filterAndSearch);
  clearBtn.addEventListener('click', () => {
    search.value = ''; catSel.value = ''; levelSel.value = ''; show(courses);
  });
}

function renderCourseDetail(id) {
  const course = courses.find(c => c.id === id);
  if (!course) { location.hash = '#courses'; return; }
  const tpl = document.getElementById('course-detail-template').content.cloneNode(true);
  app.innerHTML = ''; app.appendChild(tpl);

  document.getElementById('course-title').textContent = course.title;
  document.getElementById('course-desc').textContent = course.description;
  document.getElementById('course-meta').textContent = `${course.category} • ${course.level} • ${course.duration} • ${course.price === 0 ? 'Free' : '₹' + course.price}`;
  const instr = instructors.find(i => i.id === course.instructorId);
  const instrCard = document.getElementById('instructor-card');
  instrCard.innerHTML = `<strong>${instr.name}</strong><p class="meta">${instr.bio}</p>`;

  // video: use placeholder sample video (small base64 or empty). We'll leave src blank; show controls only if available.
  const v = document.getElementById('sample-video');
  v.src = ""; // no real video; user will see controls but blank. Good placeholder.

  // lessons
  const lessonsList = document.getElementById('lessons');
  course.lessons.forEach((l, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${idx + 1}. ${l.title}</strong> <div class="meta">${l.duration} • ${l.type}</div>`;
    lessonsList.appendChild(li);
  });

  // reviews
  const reviews = document.getElementById('reviews');
  if (course.reviews && course.reviews.length) {
    course.reviews.forEach(r => {
      const d = document.createElement('div');
      d.className = 'card';
      d.style.padding = '8px';
      d.innerHTML = `<strong>${r.name}</strong><p class="meta">${r.rating}★</p><p>${r.text}</p>`;
      reviews.appendChild(d);
    });
  } else {
    reviews.innerHTML = '<p>No reviews yet.</p>';
  }

  // enroll button
  const enrollBtn = document.getElementById('enroll-btn');
  enrollBtn.addEventListener('click', () => {
    if (!state.user) {
      openAuth('login'); return;
    }
    if (!state.enrollments.includes(course.id)) {
      state.enrollments.push(course.id);
      saveEnrollments();
      alert('Enrolled successfully! See your Dashboard.');
    } else {
      alert('Already enrolled. Go to Dashboard.');
    }
  });

  // start quiz
  const quizBtn = document.getElementById('start-quiz');
  quizBtn.addEventListener('click', () => openQuiz(sampleQuizFor(course)));
}

function renderDashboard() {
  const tpl = document.getElementById('dashboard-template').content.cloneNode(true);
  app.innerHTML = ''; app.appendChild(tpl);
  // profile
  document.getElementById('profile-name').textContent = state.user ? state.user.name : 'Guest';
  document.getElementById('profile-email').textContent = state.user ? state.user.email : 'Not logged in';

  const enrolledList = document.getElementById('enrolled-list');
  if (state.enrollments.length === 0) {
    enrolledList.innerHTML = '<p>You have not enrolled in any course yet. Browse <a href="#courses">courses</a>.</p>';
    return;
  }
  state.enrollments.forEach(id => {
    const course = courses.find(c => c.id === id);
    if (!course) return;
    const card = document.createElement('div'); card.className = 'card';
    card.innerHTML = `
      <img src="${course.image}" alt="${course.title}" />
      <h4>${course.title}</h4>
      <p class="meta">${course.duration} • ${course.level}</p>
      <div style="margin-top:auto">
        <div class="meta">Progress</div>
        <progress value="${Math.floor(Math.random() * 80) + 10}" max="100" style="width:100%"></progress>
        <a href="#course-${course.id}" class="btn" style="display:block;margin-top:8px">Open Course</a>
      </div>
    `;
    enrolledList.appendChild(card);
  });
}

function renderContact() {
  const tpl = document.getElementById('contact-template').content.cloneNode(true);
  app.innerHTML = ''; app.appendChild(tpl);
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thanks! Your message is received (frontend demo).');
    form.reset();
  });
}

/* ---------- Helpers ---------- */
function createCourseCard(c) {
  const card = document.createElement('article');
  card.className = 'card';
  card.innerHTML = `
    <img src="${c.image}" alt="${c.title}" />
    <h4>${c.title}</h4>
    <p class="meta">${c.instructorId ? instructors.find(i => i.id === c.instructorId).name : ''} • ${c.rating}★</p>
    <p class="meta">${c.duration} • ${c.level}</p>
    <div style="margin-top:8px;display:flex;gap:8px;justify-content:space-between;align-items:center">
      <a href="#course-${c.id}" class="btn btn-small">View</a>
      <div class="meta">${c.price === 0 ? 'Free' : '₹' + c.price}</div>
    </div>
  `;
  return card;
}

/* ---------- Auth Modal ---------- */
const authModal = document.getElementById('auth-modal');
document.getElementById('open-login').addEventListener('click', () => openAuth('login'));
document.getElementById('close-auth').addEventListener('click', closeAuth);
document.getElementById('auth-form').addEventListener('submit', handleAuth);
document.getElementById('switch-auth').addEventListener('click', switchAuth);

function openAuth(mode = 'login') {
  authModal.setAttribute('aria-hidden', 'false');
  document.getElementById('auth-title').textContent = mode === 'login' ? 'Login' : 'Sign up';
  document.getElementById('auth-name').style.display = mode === 'login' ? 'none' : 'block';
  authModal.dataset.mode = mode;
}
function closeAuth() { authModal.setAttribute('aria-hidden', 'true'); }
function switchAuth() {
  const mode = authModal.dataset.mode === 'login' ? 'signup' : 'login';
  openAuth(mode);
}
function handleAuth(e) {
  e.preventDefault();
  const mode = authModal.dataset.mode || 'login';
  const name = document.getElementById('auth-name').value.trim();
  const email = document.getElementById('auth-email').value.trim();
  const pw = document.getElementById('auth-password').value.trim();
  if (!email || !pw) { alert('Please complete the form.'); return; }
  // simple frontend-only "auth"
  state.user = { name: name || email.split('@')[0], email };
  closeAuth();
  alert(`${mode === 'login' ? 'Logged in' : 'Signed up'} as ${state.user.name}`);
  // update nav
  document.getElementById('nav-dashboard').classList.add('has-user');
}

/* ---------- Quiz Modal ---------- */
const quizModal = document.getElementById('quiz-modal');
document.getElementById('close-quiz').addEventListener('click', closeQuiz);

function openQuiz(quiz) {
  quizModal.setAttribute('aria-hidden', 'false');
  const body = document.getElementById('quiz-body');
  body.innerHTML = '';
  const form = document.createElement('form');
  quiz.questions.forEach((q, idx) => {
    const field = document.createElement('fieldset');
    field.innerHTML = `<legend>${idx + 1}. ${q.q}</legend>`;
    q.choices.forEach((ch, cidx) => {
      const id = `q${idx}_c${cidx}`;
      const label = document.createElement('label');
      label.style.display = 'block';
      label.innerHTML = `<input type="radio" name="q${idx}" value="${cidx}" id="${id}" /> ${ch}`;
      field.appendChild(label);
    });
    form.appendChild(field);
  });
  const submit = document.createElement('button'); submit.className = 'btn'; submit.textContent = 'Submit';
  form.appendChild(submit);
  form.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(form);
    let score = 0;
    quiz.questions.forEach((q, idx) => {
      const val = fd.get(`q${idx}`);
      if (val !== null && parseInt(val, 10) === q.answer) score++;
    });
    body.innerHTML = `<p>You scored ${score} out of ${quiz.questions.length}</p>`;
  });
  body.appendChild(form);
}
function closeQuiz() { quizModal.setAttribute('aria-hidden', 'true'); }

/* sample quiz generator */
function sampleQuizFor(course) {
  return {
    id: 'q-' + course.id,
    title: 'Sample Quiz: ' + course.title,
    questions: [
      { q: 'This is a demo question about the course. Choose A.', choices: ['A', 'B', 'C', 'D'], answer: 0 },
      { q: 'The course is in which category?', choices: [...new Set(courses.map(c => c.category))].slice(0, 4), answer: 0 }
    ]
  };
}

/* ---------- Theme toggle ---------- */
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') document.body.classList.add('dark');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

/* ---------- Hash change handling ---------- */
window.addEventListener('hashchange', router);
window.addEventListener('load', () => {
  // attach nav open/close for small screens if needed
  router();
  // accessibility: focus main on navigation
  document.getElementById('logo').addEventListener('click', () => document.getElementById('main').focus());
  // hero login button target
  document.getElementById('open-login').addEventListener('keydown', (e) => { if (e.key === 'Enter') openAuth('login') });
});

/* ---------- Keyboard & Accessibility ---------- */
// Close modals on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (authModal.getAttribute('aria-hidden') === 'false') closeAuth();
    if (quizModal.getAttribute('aria-hidden') === 'false') closeQuiz();
  }
});

// Click outside modal to close
document.querySelectorAll('.modal').forEach(m => {
  m.addEventListener('click', (ev) => {
    if (ev.target === m) {
      m.setAttribute('aria-hidden', 'true');
    }
  });
});
