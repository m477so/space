class GravitySimulator {
    constructor() {
        // Wait for the canvas element to be available
        document.addEventListener('DOMContentLoaded', () => {
            this.canvas = document.getElementById('gravity-canvas');
            if (this.canvas) {
                this.ctx = this.canvas.getContext('2d');
                this.init();
            }
        });
    }

    init() {
        // Physics constants
        this.gravityConstants = {
            mercury: 3.7,
            venus: 8.87,
            earth: 9.81,
            mars: 3.71,
            jupiter: 24.79,
            saturn: 10.44,
            uranus: 8.69,
            neptune: 11.15
        };

        // Simulation variables
        this.currentPlanet = 'earth';
        this.isSimulating = false;
        this.time = 0;
        this.height = 0;
        this.velocity = 0;
        this.initialHeight = 100; // meters
        this.pixelsPerMeter = 2;
        this.elasticity = 0.6; // bounce factor
        this.lastTimestamp = null;

        // Animation frame ID
        this.animationId = null;

        // Object properties
        this.objectRadius = 10;
        this.objectColor = '#00fff2';

        this.resizeCanvas();
        this.setupEventListeners();
        this.reset();
    }

    resizeCanvas() {
        if (!this.canvas) return;
        
        // Make canvas fill container while maintaining aspect ratio
        const container = this.canvas.parentElement;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        
        this.canvas.width = containerWidth;
        this.canvas.height = containerHeight;

        // Calculate ground position
        this.groundY = this.canvas.height - 50;
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resizeCanvas());
        
        document.getElementById('planet-select').addEventListener('change', (e) => {
            this.currentPlanet = e.target.value;
            this.reset();
        });

        document.getElementById('drop-object').addEventListener('click', () => {
            if (!this.isSimulating) {
                this.startSimulation();
            }
        });

        document.getElementById('reset-simulation').addEventListener('click', () => {
            this.reset();
        });
    }

    startSimulation() {
        this.isSimulating = true;
        this.time = 0;
        this.velocity = 0;
        this.lastTimestamp = null;
        this.animate(performance.now());
    }

    reset() {
        this.isSimulating = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.time = 0;
        this.height = this.initialHeight;
        this.velocity = 0;
        this.updateStats();
        this.draw();
    }

    updatePhysics(deltaTime) {
        const g = this.gravityConstants[this.currentPlanet];
        
        // Update velocity and position
        this.velocity += g * deltaTime;
        this.height -= this.velocity * deltaTime;

        // Check for ground collision
        if (this.height <= 0) {
            this.height = 0;
            this.velocity = -this.velocity * this.elasticity;

            // Stop if bounce is too small
            if (Math.abs(this.velocity) < 0.1) {
                this.isSimulating = false;
                this.velocity = 0;
            }
        }
    }

    updateStats() {
        if (!this.isSimulating && this.height <= 0) {
            document.getElementById('fall-time').textContent = '0.00s';
            document.getElementById('current-height').textContent = '0.00m';
            document.getElementById('current-velocity').textContent = '0.00 m/s';
            return;
        }

        document.getElementById('fall-time').textContent = Math.max(0, this.time).toFixed(2) + 's';
        document.getElementById('current-height').textContent = Math.max(0, this.height).toFixed(2) + 'm';
        document.getElementById('current-velocity').textContent = this.velocity.toFixed(2) + ' m/s';
    }

    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw ground
        this.ctx.fillStyle = 'rgba(0, 255, 242, 0.2)';
        this.ctx.fillRect(0, this.groundY, this.canvas.width, 2);

        // Draw height markers
        this.drawHeightMarkers();

        // Draw object
        const objectY = this.groundY - (this.height * this.pixelsPerMeter);
        
        // Draw object glow
        const gradient = this.ctx.createRadialGradient(
            this.canvas.width / 2, objectY,
            this.objectRadius / 2,
            this.canvas.width / 2, objectY,
            this.objectRadius * 2
        );
        gradient.addColorStop(0, 'rgba(0, 255, 242, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 255, 242, 0)');
        
        this.ctx.beginPath();
        this.ctx.arc(this.canvas.width / 2, objectY, this.objectRadius * 2, 0, Math.PI * 2);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();

        // Draw object
        this.ctx.beginPath();
        this.ctx.arc(this.canvas.width / 2, objectY, this.objectRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.objectColor;
        this.ctx.fill();
    }

    drawHeightMarkers() {
        const markerSpacing = 20; // meters
        const maxHeight = Math.ceil(this.initialHeight / markerSpacing) * markerSpacing;
        
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        this.ctx.font = '12px Arial';
        
        for (let h = 0; h <= maxHeight; h += markerSpacing) {
            const y = this.groundY - (h * this.pixelsPerMeter);
            
            // Draw marker line
            this.ctx.fillRect(50, y, 10, 1);
            
            // Draw height text
            this.ctx.fillText(h + 'm', 10, y + 4);
        }
    }

    animate(timestamp) {
        if (!this.lastTimestamp) {
            this.lastTimestamp = timestamp;
            this.animationId = requestAnimationFrame((t) => this.animate(t));
            return;
        }
        
        const deltaTime = Math.min((timestamp - this.lastTimestamp) / 1000, 0.1); // Convert to seconds, cap at 0.1s
        this.lastTimestamp = timestamp;

        if (this.isSimulating) {
            this.time += deltaTime;
            this.updatePhysics(deltaTime);
            this.updateStats();
        }

        this.draw();

        if (this.isSimulating) {
            this.animationId = requestAnimationFrame((t) => this.animate(t));
        } else {
            this.lastTimestamp = null;
        }
    }
}

// Initialize simulator when DOM is loaded
const simulator = new GravitySimulator();