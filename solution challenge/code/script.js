document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initializeAuth();
    initializeCalculator();
    initializeProjects();
    initializeCommunity();
});

// Authentication System
function initializeAuth() {
    const modal = document.getElementById('loginModal');
    const loginBtn = document.getElementById('loginBtn');
    const closeBtn = document.querySelector('.close');
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    
    loginBtn.onclick = () => modal.style.display = 'block';
    closeBtn.onclick = () => modal.style.display = 'none';
    
    window.onclick = (e) => {
        if (e.target == modal) modal.style.display = 'none';
    }
    
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(`${tab.dataset.tab}Form`).classList.add('active');
        });
    });

    // Handle form submissions
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('signupForm').addEventListener('submit', handleSignup);
}

// Carbon Calculator
function initializeCalculator() {
    const calculator = {
        form: document.getElementById('carbonCalculator'),
        results: document.getElementById('results'),
        
        calculate: function(data) {
            const factors = {
                car: 0.404,
                transit: 0.14,
                electricity: 0.92,
                naturalGas: 5.3
            };
            
            const total = (
                data.carMiles * factors.car * 52 +
                data.publicTransit * factors.transit * 52 +
                data.electricity * factors.electricity * 12 +
                data.naturalGas * factors.naturalGas * 12
            ) / 1000; // Convert to metric tons
            
            return total;
        },
        
        updateResults: function(footprint) {
            document.getElementById('totalFootprint').textContent = footprint.toFixed(1);
            this.results.classList.add('active');
            this.updateChart(footprint);
        },
        
        updateChart: function(footprint) {
            const ctx = document.getElementById('comparisonChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Your Footprint', 'National Average', 'Sustainable Target'],
                    datasets: [{
                        label: 'Carbon Footprint (tons CO2/year)',
                        data: [footprint, 16.5, 2],
                        backgroundColor: ['#4CAF50', '#666', '#81C784']
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: { beginAtZero: true }
                    }
                }
            });
        }
    };
    
    calculator.form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
            carMiles: parseFloat(document.getElementById('carMiles').value) || 0,
            publicTransit: parseFloat(document.getElementById('publicTransit').value) || 0,
            electricity: parseFloat(document.getElementById('electricity').value) || 0,
            naturalGas: parseFloat(document.getElementById('naturalGas').value) || 0
        };
        const footprint = calculator.calculate(data);
        calculator.updateResults(footprint);
    });
}

// Projects System
function initializeProjects() {
    const projects = [
        {
            title: "Urban Garden Initiative",
            description: "Community gardens in urban spaces",
            image: "assets/project1.jpg"
        },
        // Add more projects here
    ];
    
    const projectsGrid = document.getElementById('projectsGrid');
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

// Community System
function initializeCommunity() {
    // Initialize forum posts
    const posts = [
        {
            title: "Tips for Reducing Plastic Usage",
            author: "EcoWarrior",
            date: "2024-02-14"
        },
        // Add more posts here
    ];
    
    const forumPosts = document.getElementById('forumPosts');
    posts.forEach(post => {
        const postElement = createForumPost(post);
        forumPosts.appendChild(postElement);
    });
}

// Helper Functions
function handleLogin(e) {
    e.preventDefault();
    // Add login logic here
    console.log('Login attempted');
}

function handleSignup(e) {
    e.preventDefault();
    // Add signup logic here
    console.log('Signup attempted');
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
    `;
    return card;
}

function createForumPost(post) {
    const postElement = document.createElement('div');
    postElement.className = 'forum-post';
    postElement.innerHTML = `
        <h4>${post.title}</h4>
        <p>Posted by ${post.author} on ${post.date}</p>
    `;
    return postElement;
}