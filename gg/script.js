document.addEventListener('DOMContentLoaded', function() {
    const courses = [
        {
            title: "Introduction to Web Development",
            description: "Learn the fundamentals of HTML, CSS, and JavaScript.",
            image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTAwNXwwfDF8c2VhcmNofDN8fGNvZGluZ3xlbnwwfHx8fDE3MjczNzYyNDd8MA&ixlib=rb-4.0.3&q=80&w=400",
            progress: 60
        },
        {
            title: "Advanced CSS and Sass",
            description: "Master responsive design, animations, and CSS pre-processors.",
            image: "https://images.unsplash.com/photo-1507721999472-8ed4421b436a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTAwNXwwfDF8c2VhcmNofDF8fGNzc3xlbnwwfHx8fDE3MjczNzYyNTB8MA&ixlib=rb-4.0.3&q=80&w=400",
            progress: 35
        },
        {
            title: "JavaScript: The Hard Parts",
            description: "Deep dive into closures, prototypal inheritance, and async JS.",
            image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTAwNXwwfDF8c2VhcmNofDF8fGphdmFzY3JpcHR8ZW58MHx8fHwxNzI3Mzc2MjUzfDA&ixlib=rb-4.0.3&q=80&w=400",
            progress: 85
        },
        {
            title: "React for Beginners",
            description: "Build powerful single-page applications with the React library.",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTAwNXwwfDF8c2VhcmNofDF8fHJlYWN0JTIwanN8ZW58MHx8fHwxNzI3Mzc2MjU1fDA&ixlib=rb-4.0.3&q=80&w=400",
            progress: 10
        }
    ];

    const courseGrid = document.getElementById('course-grid');

    courses.forEach(course => {
        // Create the main card element
        const card = document.createElement('div');
        card.className = 'course-card';

        // Create the card's inner HTML
        card.innerHTML = `
            <img src="${course.image}" alt="${course.title}">
            <div class="course-card-content">
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <div class="progress-bar">
                    <div class="progress" style="width: ${course.progress}%;"></div>
                </div>
            </div>
        `;

        // Append the new card to the grid
        courseGrid.appendChild(card);
    });
});