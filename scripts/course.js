document.getElementById('menu').addEventListener('click', () => {
    document.querySelector('.navigation').classList.toggle('open');
    document.getElementById('menu').classList.toggle('open');
});

document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Update: ${document.lastModified}`;

const coursesArray = [
    { code: "CSE 110", title: "Fundamentals of Programming", credits: 3, type: "cse", completed: true },
    { code: "WDD 130", title: "Web Fundamentals", credits: 3, type: "wdd", completed: true },
    { code: "CSE 111", title: "Programming with Functions", credits: 3, type: "cse", completed: false },
    { code: "CSE 210", title: "Software Development", credits: 3, type: "cse", completed: false },
    { code: "WDD 131", title: "Web Technologies", credits: 3, type: "wdd", completed: false },
    { code: "WDD 231", title: "Web Frontend Development I", credits: 3, type: "wdd", completed: false }
];

function displayCourses(courses) {
    const coursesGrid = document.getElementById('courses-grid');
    coursesGrid.innerHTML = '';
    courses.forEach(course => {
        const courseDiv = document.createElement('div');
        courseDiv.classList.add('course-card');
        if (course.completed) {
            courseDiv.classList.add('completed');
        }
        courseDiv.innerHTML = `
            <h3>${course.code}</h3>
            <p>${course.title}</p>
            <p>Credits: ${course.credits}</p>
        `;
        coursesGrid.appendChild(courseDiv);
    });
    updateTotalCredits(courses);
}

function filterCourses(type) {
    let filteredCourses;
    if (type === 'all') {
        filteredCourses = coursesArray;
    } else {
        filteredCourses = coursesArray.filter(course => course.type === type);
    }
    displayCourses(filteredCourses);
}

function updateTotalCredits(courses) {
    const totalCreditsElement = document.getElementById('total-credits');
    const total = courses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsElement.textContent = total;
}

document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        const filterType = this.getAttribute('data-filter');
        filterCourses(filterType);
    });
});

displayCourses(coursesArray); // Initial display of all courses
