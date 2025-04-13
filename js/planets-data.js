const planetsData = {
    mercury: {
        name: "Mercury",
        type: "Terrestrial Planet",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Mercury_in_color_-_Prockter07_centered.jpg/1280px-Mercury_in_color_-_Prockter07_centered.jpg",
        description: "The smallest and innermost planet in the Solar System, Mercury is also the fastest, completing an orbit around the Sun in just 88 Earth days.",
        physicalCharacteristics: {
            diameter: "4,879 km",
            mass: "3.285 × 10^23 kg",
            gravity: "3.7 m/s²",
            temperature: "-180°C to 430°C"
        },
        keyFeatures: [
            "Smallest planet",
            "Closest to the Sun",
            "No moons",
            "No atmosphere"
        ],
        funFacts: [
            "Despite being the closest to the Sun, Mercury is not the hottest planet",
            "Mercury's surface resembles our Moon's",
            "A year on Mercury is just 88 Earth days"
        ]
    },
    venus: {
        name: "Venus",
        type: "Terrestrial Planet",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg",
        description: "Often called Earth's sister planet due to their similar size, Venus is the hottest planet in our solar system due to its thick atmosphere of carbon dioxide.",
        physicalCharacteristics: {
            diameter: "12,104 km",
            mass: "4.867 × 10^24 kg",
            gravity: "8.87 m/s²",
            temperature: "462°C (average)"
        },
        keyFeatures: [
            "Hottest planet",
            "Rotates backwards",
            "Thick atmosphere",
            "No moons"
        ],
        funFacts: [
            "A day on Venus is longer than its year",
            "Venus is the brightest natural object in Earth's night sky after the Moon",
            "The pressure on Venus's surface is 90 times that of Earth"
        ]
    },
    earth: {
        name: "Earth",
        type: "Terrestrial Planet",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/The_Blue_Marble_%28remastered%29.jpg/1280px-The_Blue_Marble_%28remastered%29.jpg",
        description: "Our home planet is the only known world to support life. Earth's atmosphere and magnetic field protect us from harmful solar radiation.",
        physicalCharacteristics: {
            diameter: "12,742 km",
            mass: "5.972 × 10^24 kg",
            gravity: "9.81 m/s²",
            temperature: "-88°C to 58°C"
        },
        keyFeatures: [
            "Only known planet with life",
            "71% covered by water",
            "Has one natural satellite (Moon)",
            "Has a protective magnetic field"
        ],
        funFacts: [
            "Earth is not perfectly spherical",
            "The Earth's core is as hot as the Sun's surface",
            "Earth's atmosphere is composed mainly of nitrogen (78%) and oxygen (21%)"
        ]
    },
    mars: {
        name: "Mars",
        type: "Terrestrial Planet",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/1280px-OSIRIS_Mars_true_color.jpg",
        description: "Known as the Red Planet, Mars has long captured human imagination and is a target for future human exploration.",
        physicalCharacteristics: {
            diameter: "6,779 km",
            mass: "6.39 × 10^23 kg",
            gravity: "3.71 m/s²",
            temperature: "-140°C to 20°C"
        },
        keyFeatures: [
            "Has two moons",
            "Red color from iron oxide",
            "Has the largest volcano in the solar system",
            "Features polar ice caps"
        ],
        funFacts: [
            "Mars has the largest dust storms in the solar system",
            "Sunsets on Mars appear blue",
            "Mars is home to Olympus Mons, the largest known volcano in the solar system"
        ]
    },
    jupiter: {
        name: "Jupiter",
        type: "Gas Giant",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg/1280px-Jupiter_and_its_shrunken_Great_Red_Spot.jpg",
        description: "The largest planet in our solar system, Jupiter's Great Red Spot is a giant storm that has been raging for hundreds of years.",
        physicalCharacteristics: {
            diameter: "139,820 km",
            mass: "1.898 × 10^27 kg",
            gravity: "24.79 m/s²",
            temperature: "-110°C (cloud top)"
        },
        keyFeatures: [
            "Largest planet",
            "Has the Great Red Spot",
            "Has at least 79 moons",
            "Has a faint ring system"
        ],
        funFacts: [
            "Jupiter's Great Red Spot is shrinking",
            "Jupiter's magnetic field is the strongest of all planets",
            "If Jupiter were hollow, it could contain more than 1,300 Earths"
        ]
    },
    saturn: {
        name: "Saturn",
        type: "Gas Giant",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/1280px-Saturn_during_Equinox.jpg",
        description: "Famous for its spectacular ring system, Saturn is a beautiful gas giant and the second-largest planet in our solar system.",
        physicalCharacteristics: {
            diameter: "116,460 km",
            mass: "5.683 × 10^26 kg",
            gravity: "10.44 m/s²",
            temperature: "-178°C (average)"
        },
        keyFeatures: [
            "Most prominent ring system",
            "Has 82 confirmed moons",
            "Least dense planet",
            "Visible to naked eye"
        ],
        funFacts: [
            "Saturn's rings are mostly made of ice and rock",
            "Saturn could float in water (if there was a pool big enough)",
            "One of Saturn's moons, Titan, has liquid lakes"
        ]
    },
    uranus: {
        name: "Uranus",
        type: "Ice Giant",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Uranus2.jpg/1280px-Uranus2.jpg",
        description: "Uranus is the coldest of the planets and unique because it rotates on its side, likely due to a collision early in its history.",
        physicalCharacteristics: {
            diameter: "50,724 km",
            mass: "8.681 × 10^25 kg",
            gravity: "8.69 m/s²",
            temperature: "-224°C (average)"
        },
        keyFeatures: [
            "Rotates on its side",
            "Has 27 known moons",
            "Has faint rings",
            "Blue-green color from methane"
        ],
        funFacts: [
            "Uranus was the first planet discovered using a telescope",
            "It takes 84 Earth years to orbit the Sun",
            "Its seasons last for 20-plus Earth years"
        ]
    },
    neptune: {
        name: "Neptune",
        type: "Ice Giant",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg/1280px-Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg",
        description: "The windiest planet, Neptune was the first planet located through mathematical calculations before being seen through a telescope.",
        physicalCharacteristics: {
            diameter: "49,244 km",
            mass: "1.024 × 10^26 kg",
            gravity: "11.15 m/s²",
            temperature: "-214°C (average)"
        },
        keyFeatures: [
            "Has 14 known moons",
            "Strongest winds in the solar system",
            "Has dark spots like Jupiter",
            "Has five main rings"
        ],
        funFacts: [
            "Neptune takes 165 Earth years to orbit the Sun",
            "It has a Great Dark Spot similar to Jupiter's Great Red Spot",
            "Neptune's winds can reach speeds of 2,100 km/hour"
        ]
    }
};