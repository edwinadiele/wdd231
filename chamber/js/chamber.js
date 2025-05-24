 // --- Navigation Toggle for Mobile ---
        const hamburger = document.querySelector('.hamburger');
        const nav = document.querySelector('nav');

        hamburger.addEventListener('click', () => {
            nav.classList.toggle('open');
        });

        // --- Last Modified Date in Footer ---
        document.getElementById('last-modified').textContent = document.lastModified;

        // --- Current Year in Footer ---
        document.getElementById('current-year').textContent = new Date().getFullYear();

        // --- Weather API Integration ---
        const WEATHER_API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your actual API key
        const CITY = 'Abuja';
        const COUNTRY_CODE = 'NG';
        const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY},${COUNTRY_CODE}&units=metric&appid=${WEATHER_API_KEY}`;
        const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY},${COUNTRY_CODE}&units=metric&appid=${WEATHER_API_KEY}`;

        async function getWeatherData() {
            try {
                // Fetch current weather
                const currentWeatherResponse = await fetch(WEATHER_URL);
                const currentWeatherData = await currentWeatherResponse.json();

                if (currentWeatherData.cod !== 200) {
                    console.error('Error fetching current weather:', currentWeatherData.message);
                    document.getElementById('current-temp').textContent = 'N/A';
                    document.getElementById('weather-desc').textContent = 'Failed to load';
                    document.getElementById('weather-icon').src = 'https://placehold.co/60x60/e0e0e0/333333?text=Err';
                    return;
                }

                const temp = currentWeatherData.main.temp.toFixed(0);
                const description = currentWeatherData.weather[0].description;
                const iconCode = currentWeatherData.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

                document.getElementById('current-temp').textContent = temp;
                document.getElementById('weather-desc').textContent = description.charAt(0).toUpperCase() + description.slice(1);
                document.getElementById('weather-icon').src = iconUrl;
                document.getElementById('weather-icon').alt = description;

                // Fetch 3-day forecast
                const forecastResponse = await fetch(FORECAST_URL);
                const forecastData = await forecastResponse.json();

                if (forecastData.cod !== '200') {
                    console.error('Error fetching forecast:', forecastData.message);
                    document.getElementById('forecast-container').innerHTML = '<p>Failed to load forecast data.</p>';
                    return;
                }

                displayForecast(forecastData);

            } catch (error) {
                console.error('Error fetching weather data:', error);
                document.getElementById('current-temp').textContent = 'Error';
                document.getElementById('weather-desc').textContent = 'Check API Key/Network';
                document.getElementById('weather-icon').src = 'https://placehold.co/60x60/e0e0e0/333333?text=Err';
                document.getElementById('forecast-container').innerHTML = '<p>Error loading forecast.</p>';
            }
        }

        function displayForecast(data) {
            const forecastContainer = document.getElementById('forecast-container');
            forecastContainer.innerHTML = ''; // Clear existing placeholders

            const dailyForecasts = {}; // To store one forecast per day

            // OpenWeatherMap forecast provides data every 3 hours.
            // We need to pick one entry per day for the next 3 days.
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Normalize to start of day

            for (let i = 0; i < data.list.length; i++) {
                const forecast = data.list[i];
                const forecastDate = new Date(forecast.dt * 1000); // Convert timestamp to Date object
                forecastDate.setHours(0, 0, 0, 0); // Normalize to start of day

                // Only consider future days, and only one entry per day (preferably around midday)
                if (forecastDate > today && !dailyForecasts[forecastDate.toDateString()]) {
                    // We'll try to pick the forecast closest to midday (12:00 PM) for each day
                    // Or just the first entry for that day if midday isn't available or we're iterating.
                    // For simplicity, let's just take the first entry we encounter for a new day.
                    dailyForecasts[forecastDate.toDateString()] = forecast;
                }
            }

            const sortedDates = Object.keys(dailyForecasts).sort((a, b) => new Date(a) - new Date(b));
            let count = 0;
            for (const dateString of sortedDates) {
                if (count >= 3) break; // Only display 3 days
                const forecast = dailyForecasts[dateString];

                const dayName = new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
                const temp = forecast.main.temp.toFixed(0);
                const iconCode = forecast.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
                const description = forecast.weather[0].description;

                const forecastDayDiv = document.createElement('div');
                forecastDayDiv.classList.add('forecast-day');
                forecastDayDiv.innerHTML = `
                    <p>${dayName}</p>
                    <img src="${iconUrl}" alt="${description}">
                    <p>Temp: ${temp}&deg;C</p>
                `;
                forecastContainer.appendChild(forecastDayDiv);
                count++;
            }
        }

        // --- Member Spotlights ---
        // Mock JSON data for members (in a real scenario, this would be fetched from a file like data/members.json)
        const membersData = [
            {
                "name": "Innovate Solutions Ltd.",
                "logo": "https://placehold.co/120x80/007bff/ffffff?text=Innovate",
                "address": "10 Tech Hub, Abuja",
                "phone": "+234 801 111 2222",
                "website": "https://www.innovatesolutions.com",
                "membershipLevel": "Gold",
                "description": "Leading the way in software development and IT consulting."
            },
            {
                "name": "Green Harvest Farms",
                "logo": "https://placehold.co/120x80/28a745/ffffff?text=Harvest",
                "address": "Farm Road, Abuja",
                "phone": "+234 802 333 4444",
                "website": "https://www.greenharvestfarms.com",
                "membershipLevel": "Silver",
                "description": "Sustainable agriculture and organic produce supplier."
            },
            {
                "name": "Abuja Hospitality Group",
                "logo": "https://placehold.co/120x80/ffc107/333333?text=Hospitality",
                "address": "5 Star Drive, Abuja",
                "phone": "+234 803 555 6666",
                "website": "https://www.abujahospitality.com",
                "membershipLevel": "Gold",
                "description": "Premium hotel and event management services."
            },
            {
                "name": "City Builders Inc.",
                "logo": "https://placehold.co/120x80/6c757d/ffffff?text=Builders",
                "address": "Construction Zone, Abuja",
                "phone": "+234 804 777 8888",
                "website": "https://www.citybuilders.com",
                "membershipLevel": "Bronze",
                "description": "Reliable construction and infrastructure development."
            },
            {
                "name": "Local Crafts Co.",
                "logo": "https://placehold.co/120x80/fd7e14/ffffff?text=Crafts",
                "address": "Artisan Market, Abuja",
                "phone": "+234 805 999 0000",
                "website": "https://www.localcrafts.com",
                "membershipLevel": "Silver",
                "description": "Handmade goods and traditional Nigerian crafts."
            },
            {
                "name": "Future Tech Solutions",
                "logo": "https://placehold.co/120x80/6f42c1/ffffff?text=FutureTech",
                "address": "Innovation Park, Abuja",
                "phone": "+234 806 123 7890",
                "website": "https://www.futuretech.com",
                "membershipLevel": "Gold",
                "description": "Cutting-edge AI and software development."
            }
        ];

        function displaySpotlights() {
            const spotlightsContainer = document.getElementById('spotlights-container');
            spotlightsContainer.innerHTML = ''; // Clear existing spotlights

            // Filter for Gold and Silver members
            const eligibleMembers = membersData.filter(member =>
                member.membershipLevel === 'Gold' || member.membershipLevel === 'Silver'
            );

            // Shuffle the eligible members array
            for (let i = eligibleMembers.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [eligibleMembers[i], eligibleMembers[j]] = [eligibleMembers[j], eligibleMembers[i]]; // Swap elements
            }

            // Select 2 or 3 random members
            const numberOfSpotlights = Math.min(eligibleMembers.length, Math.floor(Math.random() * 2) + 2); // Randomly 2 or 3
            const selectedSpotlights = eligibleMembers.slice(0, numberOfSpotlights);

            if (selectedSpotlights.length === 0) {
                spotlightsContainer.innerHTML = '<p>No eligible members to display in spotlights.</p>';
                return;
            }

            selectedSpotlights.forEach(member => {
                const card = document.createElement('div');
                card.classList.add('spotlight-card');
                card.innerHTML = `
                    <img src="${member.logo}" alt="${member.name} Logo" onerror="this.onerror=null;this.src='https://placehold.co/120x80/e0e0e0/333333?text=No+Logo';">
                    <h3>${member.name}</h3>
                    <p>${member.address}</p>
                    <p>Phone: ${member.phone}</p>
                    <p><a href="${member.website}" target="_blank" rel="noopener noreferrer">${member.website.replace(/(^\w+:|^)\/\//, '')}</a></p>
                    <p class="membership-level">Membership: ${member.membershipLevel}</p>
                `;
                spotlightsContainer.appendChild(card);
            });
        }

        // Initialize functions on page load
        document.addEventListener('DOMContentLoaded', () => {
            getWeatherData();
            displaySpotlights();
        });