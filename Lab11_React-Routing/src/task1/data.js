export const recipesData = [
  {
    id: 1,
    name: "Spaghetti Carbonara",
    cuisine: "Italian",
    prepTime: 20,
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&h=400&fit=crop",
    description: "Creamy pasta dish with eggs, cheese, and pancetta.",
    rating: 4.6,
    isVegetarian: false,
    ingredients: [
      "200g spaghetti",
      "100g pancetta",
      "2 eggs",
      "50g pecorino cheese",
      "Black pepper"
    ],
    instructions: [
      "Boil pasta in salted water.",
      "Fry pancetta until crispy.",
      "Whisk eggs and cheese.",
      "Combine everything with pasta water.",
      "Serve with black pepper."
    ],
    reviews: [
      { id: 1, user: "HomeChef", comment: "So authentic!", rating: 5 },
      { id: 2, user: "Foodie", comment: "Creamy and delicious.", rating: 4.5 }
    ]
  },
  {
    id: 2,
    name: "Chicken Tikka Masala",
    cuisine: "Indian",
    prepTime: 45,
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1565557613262-c8bf640bd9db?w=600&h=400&fit=crop",
    description: "Roasted marinated chicken chunks in a spiced sauce.",
    rating: 4.8,
    isVegetarian: false,
    ingredients: [
      "500g chicken breast",
      "200ml yogurt",
      "Spices (garam masala, turmeric, cumin)",
      "400g tomato purée",
      "100ml heavy cream"
    ],
    instructions: [
      "Marinate chicken in yogurt and spices for 2 hours.",
      "Grill the chicken until charred.",
      "Prepare tomato sauce with remaining spices.",
      "Add cream and simmer.",
      "Combine chicken and sauce, serve hot."
    ],
    reviews: []
  },
  {
    id: 3,
    name: "Classic Caesar Salad",
    cuisine: "American",
    prepTime: 15,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=600&h=400&fit=crop",
    description: "Crisp romaine salad with homemade croutons and dressing.",
    rating: 4.3,
    isVegetarian: true,
    ingredients: [
      "1 romaine lettuce heart",
      "1/2 cup croutons",
      "1/4 cup parmesan cheese",
      "Caesar dressing"
    ],
    instructions: [
      "Wash and chop lettuce.",
      "Toss with dressing.",
      "Top with croutons and cheese."
    ],
    reviews: []
  },
  {
    id: 4,
    name: "Beef Wellington",
    cuisine: "British",
    prepTime: 120,
    difficulty: "Hard",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&h=400&fit=crop",
    description: "Beef tenderloin wrapped in puff pastry with mushroom duxelles.",
    rating: 4.9,
    isVegetarian: false,
    ingredients: [
      "800g center-cut beef tenderloin",
      "500g mushrooms",
      "Prosciutto slices",
      "Puff pastry",
      "Egg wash"
    ],
    instructions: [
      "Sear the beef and let cool.",
      "Make mushroom duxelles and let cool.",
      "Wrap beef in prosciutto and duxelles, then puff pastry.",
      "Brush with egg wash and bake until golden."
    ],
    reviews: []
  },
  {
    id: 5,
    name: "Vegetable Stir Fry",
    cuisine: "Asian",
    prepTime: 20,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
    description: "Quick and healthy mix of fresh vegetables in soy-ginger sauce.",
    rating: 4.5,
    isVegetarian: true,
    ingredients: [
      "Broccoli florets",
      "Bell peppers",
      "Carrots",
      "Soy sauce",
      "Ginger and garlic"
    ],
    instructions: [
      "Chop all vegetables.",
      "Stir fry aromatics.",
      "Add vegetables and cook until tender-crisp.",
      "Toss with soy sauce and serve over rice."
    ],
    reviews: []
  }
];
