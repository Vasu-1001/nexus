// Sample course data
const courses = [
  {
    title: "Web Fundamentals: HTML, CSS & JS",
    instructor: "Anita Raj",
    duration: "6h",
    level: "Beginner",
    price: "Free",
    rating: "4.7★",
    image: "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg",
  },
  {
    title: "JavaScript: From Zero to Advanced",
    instructor: "Sofia Das",
    duration: "12h",
    level: "Intermediate",
    price: "₹499",
    rating: "4.8★",
    image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg",
  },
  {
    title: "Data Science Basics with Python",
    instructor: "Ramesh Kumar",
    duration: "10h",
    level: "Beginner",
    price: "₹299",
    rating: "4.6★",
    image: "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg",
  },
  {
    title: "React Basics (Concepts without Framework)",
    instructor: "Sofia Das",
    duration: "8h",
    level: "Intermediate",
    price: "₹399",
    rating: "4.5★",
    image: "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg",
  },
];

// Display courses dynamically
const container = document.getElementById("course-list");

courses.forEach((course) => {
  const card = document.createElement("div");
  card.classList.add("course-card");
  card.innerHTML = `
    <div class="course-img">
      <img src="${course.image}" alt="${course.title}">
    </div>
    <div class="course-content">
      <h3>${course.title}</h3>
      <p>${course.instructor} • ${course.rating}</p>
      <p>${course.duration} • ${course.level}</p>
      <p class="price">${course.price}</p>
      <a href="#" class="view-btn">View</a>
    </div>
  `;
  container.appendChild(card);
});

// Handle “View” button click
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("view-btn")) {
    e.preventDefault();
    const title =
      e.target.parentElement.querySelector("h3").textContent;
    alert(`You selected: ${title}`);
  }
});
