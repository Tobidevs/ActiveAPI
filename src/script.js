import apiKey from "./config.js";
const bodyPartOptions = document.querySelectorAll('.filter-option');
const filterButton = document.querySelector('.filter-button');
const exerciseContainer = document.querySelector('.exercise-container');

let offset = 0;

const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };


const displayExercises = (data) => {
  exerciseContainer.innerHTML = data.map(exercise => `
      <div class="w-60 h-1/3 border-4 bg-customDarkPurple border-customPurple cursor-pointer duration-300 hover:text-customPurple rounded-3xl flex flex-col justify-center items-center">
        <img class="h-[58.3%] w-6/12 mt-3" src="${exercise.gifUrl}" alt="${exercise.name}">
        <div class="mt-1 text-2xl w-5/6 text-center overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-none">${exercise.name}</div>
        <div class="text-gray-500 text-xl">${exercise.target}</div>
      </div>
    `).join('');
}

// Fetch exercises based on body part
const getBodyPart = async (bodyPart) => {
  const endpoint = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart.toLowerCase()}?offset=${offset}&limit=12`;
  try {
    const response = await fetch(endpoint, options);
    if (!response.ok) {
      throw new Error('Failed to fetch exercises');
    }
    const data = await response.json();
    displayExercises(data);
  } catch (error) {
    console.error('Error fetching exercises:', error);
  }
}
// Add event listener to each option
bodyPartOptions.forEach(option => {
  
  option.addEventListener('click', event => {
    bodyPartOptions.forEach(option => option.classList.remove('active'));
    event.currentTarget.classList.add('active');
    // Update filter button text and fetch exercises
    filterButton.textContent = `Body Part: ${event.currentTarget.textContent}`;
    getBodyPart(event.currentTarget.textContent);
  });
});
