// JavaScript for dynamic content loading and last visit message
        document.addEventListener('DOMContentLoaded', () => {
            // Set current year and last modified date in footer
            document.getElementById('currentYear').textContent = new Date().getFullYear();
            document.getElementById('lastModified').textContent = document.lastModified;

            // --- Last Visit Message Logic ---
            const lastVisitMessageElement = document.getElementById('lastVisitMessage');
            const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000; // Milliseconds in one day

            let lastVisit = localStorage.getItem('lastVisit');
            const now = Date.now();

            if (!lastVisit) {
                // First visit
                lastVisitMessageElement.textContent = "Welcome! Let us know if you have any questions.";
            } else {
                lastVisit = parseFloat(lastVisit); // Convert stored string back to number
                const timeDifference = now - lastVisit;
                const daysDifference = Math.floor(timeDifference / ONE_DAY_IN_MS);

                if (daysDifference < 1) {
                    lastVisitMessageElement.textContent = "Back so soon! Awesome!";
                } else if (daysDifference === 1) {
                    lastVisitMessageElement.textContent = "You last visited 1 day ago.";
                } else {
                    lastVisitMessageElement.textContent = `You last visited ${daysDifference} days ago.`;
                }
            }
            // Update last visit to current time
            localStorage.setItem('lastVisit', now.toString());

            // --- Dynamic Card Loading Logic ---
            const interestCardsContainer = document.getElementById('interestCards');

            fetch('./data/discover.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    data.forEach(item => {
                        const card = document.createElement('div');
                        card.classList.add('interest-card');

                        card.innerHTML = `
                            <h2>${item.name}</h2>
                            <figure>
                                <img src="${item.image}" alt="${item.name}" loading="lazy" width="300" height="200">
                                <figcaption>${item.name}</figcaption>
                            </figure>
                            <address>${item.address}</address>
                            <p>${item.description}</p>
                            <button class="learn-more-btn">Learn More</button>
                        `;
                        interestCardsContainer.appendChild(card);
                    });
                })
                .catch(error => console.error('Error fetching data:', error));
        });