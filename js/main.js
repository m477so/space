document.addEventListener('DOMContentLoaded', () => {
    const infoCard = document.querySelector('.info-card');
    let currentPlanet = 'earth';
    const planetOrder = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
    
    // Add smooth scrolling to navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add click event listeners to all interactive planet elements
    document.querySelectorAll('[data-planet]').forEach(element => {
        const planetName = element.getAttribute('data-planet');
        
        // Set background images for planet cards
        if (element.classList.contains('planet-card')) {
            const planetData = planetsData[planetName];
            element.style.backgroundImage = `url(${planetData.imageUrl})`;
            element.style.backgroundSize = 'cover';
            element.style.backgroundPosition = 'center';
            
            // Add type and a brief description
            element.innerHTML = `
                <h3>${planetData.name}</h3>
                <p class="planet-type">${planetData.type}</p>
            `;
        }

        element.addEventListener('click', () => {
            showPlanetInfo(planetName);
        });

        // Add hover effect with tooltip for orbital planets
        if (element.classList.contains('planet')) {
            element.addEventListener('mouseover', (e) => {
                showTooltip(e, planetsData[planetName].name);
            });
            element.addEventListener('mouseout', hideTooltip);
        }
    });

    // Add Saturn's rings
    const saturn = document.querySelector('.saturn');
    if (saturn) {
        const rings = document.createElement('div');
        rings.className = 'saturn-rings';
        saturn.appendChild(rings);
    }

    // Add planet navigation handlers
    document.querySelector('.prev-planet').addEventListener('click', () => {
        navigatePlanet('prev');
    });

    document.querySelector('.next-planet').addEventListener('click', () => {
        navigatePlanet('next');
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            navigatePlanet('prev');
        } else if (e.key === 'ArrowRight') {
            navigatePlanet('next');
        }
    });

    function navigatePlanet(direction) {
        const currentIndex = planetOrder.indexOf(currentPlanet);
        let nextIndex;
        
        if (direction === 'prev') {
            nextIndex = currentIndex - 1;
            if (nextIndex < 0) nextIndex = planetOrder.length - 1;
        } else {
            nextIndex = currentIndex + 1;
            if (nextIndex >= planetOrder.length) nextIndex = 0;
        }
        
        const nextPlanet = planetOrder[nextIndex];
        showPlanetInfo(nextPlanet);
    }

    function showPlanetInfo(planetName) {
        const planet = planetsData[planetName];
        if (!planet) return;

        currentPlanet = planetName;

        // Create the content for the info card with a modern design
        const content = `
            <div class="planet-nav">
                <button class="nav-arrow prev-planet">
                    <i class="fas fa-chevron-left fa-2x"></i>
                </button>
                <div class="planet-info-content">
                    <h2 class="text-4xl font-bold mb-4 gradient-text">${planet.name}</h2>
                    
                    <img src="${planet.imageUrl}" alt="${planet.name}" class="planet-image">
                    
                    <div class="planet-type-badge">${planet.type}</div>
                    
                    <p class="text-lg mb-6">${planet.description}</p>
                    
                    <div class="grid md:grid-cols-2 gap-6 mb-6">
                        <div class="info-section">
                            <h3 class="text-xl font-semibold mb-3 text-blue-400">Physical Characteristics</h3>
                            <ul class="space-y-2">
                                ${Object.entries(planet.physicalCharacteristics)
                                    .map(([key, value]) => `
                                        <li>
                                            <span class="font-medium capitalize">${key}:</span> 
                                            <span class="text-cyan-300">${value}</span>
                                        </li>
                                    `).join('')}
                            </ul>
                        </div>
                        
                        <div class="info-section">
                            <h3 class="text-xl font-semibold mb-3 text-blue-400">Key Features</h3>
                            <ul class="space-y-2">
                                ${planet.keyFeatures
                                    .map(feature => `
                                        <li class="flex items-center">
                                            <span class="text-cyan-300">•</span>
                                            <span class="ml-2">${feature}</span>
                                        </li>
                                    `).join('')}
                            </ul>
                        </div>
                    </div>
                    
                    <div class="fun-facts-section">
                        <h3 class="text-xl font-semibold mb-3 text-blue-400">Fun Facts</h3>
                        <div class="grid md:grid-cols-2 gap-4">
                            ${planet.funFacts
                                .map(fact => `
                                    <div class="fact-card bg-opacity-20 bg-blue-500 p-4 rounded-lg">
                                        <p>${fact}</p>
                                    </div>
                                `).join('')}
                        </div>
                    </div>
                </div>
                <button class="nav-arrow next-planet">
                    <i class="fas fa-chevron-right fa-2x"></i>
                </button>
            </div>
        `;

        // Update the info card with animation
        infoCard.style.opacity = '0';
        setTimeout(() => {
            infoCard.innerHTML = content;
            infoCard.style.opacity = '1';
            
            // Reattach event listeners to new navigation buttons
            document.querySelector('.prev-planet').addEventListener('click', () => {
                navigatePlanet('prev');
            });
            document.querySelector('.next-planet').addEventListener('click', () => {
                navigatePlanet('next');
            });
        }, 300);

        // Smooth scroll to info card
        infoCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Tooltip functionality
    function showTooltip(event, text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        tooltip.style.cssText = `
            position: fixed;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 14px;
            pointer-events: none;
            z-index: 1000;
            transform: translate(-50%, -100%);
            transition: opacity 0.2s ease;
        `;
        
        document.body.appendChild(tooltip);
        
        // Position the tooltip
        positionTooltip(event, tooltip);
        
        // Store the tooltip reference
        event.target.tooltip = tooltip;
    }

    function hideTooltip(event) {
        if (event.target.tooltip) {
            event.target.tooltip.remove();
            event.target.tooltip = null;
        }
    }

    function positionTooltip(event, tooltip) {
        const padding = 10;
        const x = event.clientX;
        const y = event.clientY - padding;
        
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
    }

    // Add mousemove event for tooltip repositioning
    document.addEventListener('mousemove', (e) => {
        const activeTooltip = e.target.tooltip;
        if (activeTooltip) {
            positionTooltip(e, activeTooltip);
        }
    });

    // Add parallax effect for stars
    const stars = document.querySelector('.stars');
    const stars2 = document.querySelector('.stars2');
    const stars3 = document.querySelector('.stars3');

    // Mouse parallax
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        requestAnimationFrame(() => {
            stars.style.transform = `translate(${x * -20}px, ${y * -20}px)`;
            stars2.style.transform = `translate(${x * -40}px, ${y * -40}px)`;
            stars3.style.transform = `translate(${x * -60}px, ${y * -60}px)`;
        });
    });

    // Scroll parallax
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        requestAnimationFrame(() => {
            stars.style.transform = `translateY(${scrolled * 0.1}px)`;
            stars2.style.transform = `translateY(${scrolled * 0.2}px)`;
            stars3.style.transform = `translateY(${scrolled * 0.3}px)`;
        });
    });

    // Initialize with Earth information
    showPlanetInfo('earth');
});