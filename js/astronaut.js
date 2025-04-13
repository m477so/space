class Astronaut {
    constructor() {
        this.createAstronaut();
        this.createCustomizer();
        this.isDragging = false;
        this.currentX = 100;
        this.currentY = 100;
        this.xOffset = 0;
        this.yOffset = 0;
        this.setupEventListeners();
    }

    createAstronaut() {
        const astronaut = document.createElement('div');
        astronaut.className = 'astronaut';
        astronaut.innerHTML = `
            <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
                <!-- Backpack -->
                <rect id="backpack" x="35" y="40" width="30" height="40" rx="5" fill="#444444"/>
                
                <!-- Main Suit Body -->
                <g id="suit" fill="#ffffff">
                    <!-- Lower Body -->
                    <path d="M45,80 Q50,85 55,80 L55,100 Q50,105 45,100 Z"/>
                    
                    <!-- Main Torso -->
                    <path d="M40,40 C40,30 60,30 60,40 L60,80 C60,90 40,90 40,80 Z"/>
                    
                    <!-- Arms -->
                    <path d="M40,45 C30,45 25,55 30,65 C32,70 38,70 40,65 Z"/>
                    <path d="M60,45 C70,45 75,55 70,65 C68,70 62,70 60,65 Z"/>
                </g>

                <!-- Helmet -->
                <g id="helmet">
                    <!-- Helmet Base -->
                    <ellipse cx="50" cy="30" rx="15" ry="17" fill="#ffffff"/>
                    
                    <!-- Helmet Visor -->
                    <path id="visor" d="M40,30 C40,20 60,20 60,30 C60,40 40,40 40,30" 
                          fill="#00fff2" fill-opacity="0.3"/>
                    
                    <!-- Helmet Details -->
                    <path d="M35,30 C35,15 65,15 65,30" fill="none" 
                          stroke="#ffffff" stroke-width="2"/>
                </g>

                <!-- Life Support Details -->
                <circle cx="45" cy="50" r="2" fill="#00fff2"/>
                <circle cx="55" cy="50" r="2" fill="#00fff2"/>
                
                <!-- Suit Details -->
                <path d="M45,60 L55,60" stroke="#00fff2" stroke-width="1"/>
                <path d="M45,65 L55,65" stroke="#00fff2" stroke-width="1"/>
            </svg>
        `;
        document.body.appendChild(astronaut);
        this.astronaut = astronaut;
        this.setPosition(100, 100);
        this.initializeColors();
    }

    createCustomizer() {
        const customizer = document.createElement('div');
        customizer.className = 'astronaut-customizer';
        customizer.innerHTML = `
            <h3>Customize Astronaut</h3>
            <div class="customizer-options">
                <div class="color-option">
                    <label>Suit Color</label>
                    <input type="color" class="color-picker" id="suit-color" value="#ffffff">
                </div>
                <div class="color-option">
                    <label>Visor Color</label>
                    <input type="color" class="color-picker" id="visor-color" value="#00fff2">
                </div>
                <div class="color-option">
                    <label>Backpack Color</label>
                    <input type="color" class="color-picker" id="backpack-color" value="#444444">
                </div>
            </div>
        `;
        document.body.appendChild(customizer);
        this.customizer = customizer;
        this.setupCustomizerEvents();
    }

    initializeColors() {
        const suit = this.astronaut.querySelector('#suit');
        const visor = this.astronaut.querySelector('#visor');
        const backpack = this.astronaut.querySelector('#backpack');
        
        suit.style.fill = '#ffffff';
        visor.style.fill = '#00fff2';
        backpack.style.fill = '#444444';
    }

    setupCustomizerEvents() {
        document.getElementById('suit-color').addEventListener('input', (e) => {
            this.astronaut.querySelector('#suit').style.fill = e.target.value;
        });

        document.getElementById('visor-color').addEventListener('input', (e) => {
            const visor = this.astronaut.querySelector('#visor');
            visor.style.fill = e.target.value;
            visor.style.fillOpacity = '0.3';
        });

        document.getElementById('backpack-color').addEventListener('input', (e) => {
            this.astronaut.querySelector('#backpack').style.fill = e.target.value;
        });
    }

    setupEventListeners() {
        this.astronaut.addEventListener('mousedown', (e) => this.startDragging(e));
        document.addEventListener('mousemove', (e) => this.drag(e));
        document.addEventListener('mouseup', () => this.stopDragging());

        // Touch events for mobile
        this.astronaut.addEventListener('touchstart', (e) => this.startDragging(e));
        document.addEventListener('touchmove', (e) => this.drag(e));
        document.addEventListener('touchend', () => this.stopDragging());

        // Double click/tap to toggle walking animation
        this.astronaut.addEventListener('dblclick', () => this.toggleWalking());
        this.astronaut.addEventListener('touchend', (e) => {
            if (e.timeStamp - this.lastTap < 300) {
                this.toggleWalking();
            }
            this.lastTap = e.timeStamp;
        });
    }

    startDragging(e) {
        this.isDragging = true;
        const pos = this.getEventPosition(e);
        this.xOffset = pos.x - this.currentX;
        this.yOffset = pos.y - this.currentY;
        this.astronaut.style.transition = 'none';
    }

    drag(e) {
        if (!this.isDragging) return;
        e.preventDefault();
        const pos = this.getEventPosition(e);
        this.setPosition(pos.x - this.xOffset, pos.y - this.yOffset);
    }

    stopDragging() {
        this.isDragging = false;
        this.astronaut.style.transition = 'transform 0.3s ease';
    }

    setPosition(x, y) {
        this.currentX = x;
        this.currentY = y;
        this.astronaut.style.left = `${x}px`;
        this.astronaut.style.top = `${y}px`;
    }

    getEventPosition(e) {
        if (e.touches) {
            return {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            };
        }
        return {
            x: e.clientX,
            y: e.clientY
        };
    }

    toggleWalking() {
        this.astronaut.classList.toggle('walking');
    }
}

// Initialize astronaut when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.spaceExplorer = window.spaceExplorer || {};
    window.spaceExplorer.astronaut = new Astronaut();
});