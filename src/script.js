import apiKey from "./config.js";
const clear_filters = document.querySelector('.clear-filters');
const TargetOptions = document.querySelectorAll('.T-filter-option');
const T_filterButton = document.querySelector('.T-filter-button');
const bodyPartOptions = document.querySelectorAll('.BP-filter-option');
const BP_filterButton = document.querySelector('.BP-filter-button');
const EquipmentOptions = document.querySelectorAll('.E-filter-option');
const E_filterButton = document.querySelector('.E-filter-button');


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
  exerciseContainer.innerHTML = '';
  exerciseContainer.classList.remove('background');
    exerciseContainer.innerHTML = data.map(exercise => `
      <div class="w-60 h-1/3 border-4 bg-customDarkPurple border-customPurple cursor-pointer duration-300 hover:text-customPurple rounded-3xl flex flex-col justify-center items-center">
        <img class="h-[58.3%] w-6/12 mt-3" src="${exercise.gifUrl}" alt="${exercise.name}">
        <div class="mt-1 text-2xl w-5/6 text-center overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-none">${exercise.name}</div>
        <div class="text-gray-500 text-xl">${exercise.target}</div>
      </div>
    `).join('');
}

// Fetch exercises
const callApi = async (option, type) => {
  const endpoint = `https://exercisedb.p.rapidapi.com/exercises/${type}/${option.toLowerCase()}?offset=${offset}&limit=12`;
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

// Add event listener to clear filters button
clear_filters.addEventListener('click', () => {
  bodyPartOptions.forEach(option => option.classList.remove('active'));
  TargetOptions.forEach(option => option.classList.remove('active'));
  EquipmentOptions.forEach(option => option.classList.remove('active'));
  exerciseContainer.innerHTML = '';
  exerciseContainer.innerHTML = '<div>Select an Exercise</div>';
  BP_filterButton.textContent = 'Body Part';
  T_filterButton.textContent = 'Target';
  E_filterButton.textContent = 'Equipment';
  exerciseContainer.classList.add('background');
});

// Add event listener to each option
bodyPartOptions.forEach(option => {
  option.addEventListener('click', event => {
    bodyPartOptions.forEach(option => option.classList.remove('active'));
    TargetOptions.forEach(option => option.classList.remove('active'));
    EquipmentOptions.forEach(option => option.classList.remove('active'));
    event.currentTarget.classList.add('active');
    // Update filter button text and fetch exercises
    T_filterButton.textContent = 'Target';
    E_filterButton.textContent = 'Equipment';
    BP_filterButton.textContent = `Body Part: ${event.currentTarget.textContent}`;
    callApi(event.currentTarget.textContent, "bodyPart");
  });
});

TargetOptions.forEach(option => {
  option.addEventListener('click', event => {
    TargetOptions.forEach(option => option.classList.remove('active'));
    bodyPartOptions.forEach(option => option.classList.remove('active'));
    EquipmentOptions.forEach(option => option.classList.remove('active'));
    event.currentTarget.classList.add('active');
    // Update filter button text and fetch exercises
    BP_filterButton.textContent = 'Body Part';
    E_filterButton.textContent = 'Equipment';
    T_filterButton.textContent = `Target: ${event.currentTarget.textContent}`;
    callApi(event.currentTarget.textContent, "target");
  });
});

EquipmentOptions.forEach(option => {
  option.addEventListener('click', event => {
    EquipmentOptions.forEach(option => option.classList.remove('active'));
    bodyPartOptions.forEach(option => option.classList.remove('active'));
    TargetOptions.forEach(option => option.classList.remove('active'));
    event.currentTarget.classList.add('active');
    // Update filter button text and fetch exercises
    BP_filterButton.textContent = 'Body Part';
    T_filterButton.textContent = 'Target';
    E_filterButton.textContent = `Equipment: ${event.currentTarget.textContent}`;
    callApi(event.currentTarget.textContent, "equipment");
  });
});