'use strict'
let facts = []; 
    let currentFactIndex = -1; // keep track of the displayed fact

    //fetch data from the API
    function fetchFacts() {
      fetch('https://catfact.ninja/facts')
        .then(response => response.json())
        .then(data => {
          facts = data.data;
          showFacts();
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }

    //Display cat facts in a list
    function showFacts() {
      const factList = document.getElementById('factList');
      const noResultsMessage = document.getElementById('noResultsMessage');

      factList.innerHTML = '';
      noResultsMessage.style.display = 'none';

      if (facts.length === 0) {
        noResultsMessage.style.display = 'block';
      } else {
        facts.forEach((fact, index) => {
          const listItem = document.createElement('li');
          listItem.textContent = fact.fact;

          // Add event listener to redirect to detail page on click
          listItem.addEventListener('click', () => {
            showDetailPage(index);
          });

          factList.appendChild(listItem);
        });
      }
    }

    // show details of each fact
    function showDetailPage(index) {
      currentFactIndex = index;

      // Hide the fact list and show the detail page
      const factList = document.getElementById('factList');
      const detailPage = document.getElementById('detailPage');
      factList.style.display = 'none';
      detailPage.style.display = 'block';

      // Display the fact details
      const factDetails = document.getElementById('factDetails');
      factDetails.textContent = facts[index].fact;

      // Add event listener to back button
      const backButton = document.getElementById('backButton');
      backButton.addEventListener('click', showListPage);

      // Add event listener to delete button
      const deleteButton = document.getElementById('deleteButton');
      deleteButton.addEventListener('click', deleteFact);
    }
    function showListPage() {
      currentFactIndex = -1;
      const factList = document.getElementById('factList');
      const detailPage = document.getElementById('detailPage');
      factList.style.display = 'block';
      detailPage.style.display = 'none';
    }
    
    function deleteFact() {
      if (currentFactIndex >= 0) {
        const confirmation = confirm('Are you sure you want to delete this fact?');
        if (confirmation) {
          facts.splice(currentFactIndex, 1);
          showListPage();
          showFacts();
        }
      }
    }

    // filter the list 
    function searchFacts() {
      const searchInput = document.getElementById('searchInput');
      const searchElement = searchInput.value.toLowerCase();
      const factList = document.getElementById('factList');
      const noResultsMessage = document.getElementById('noResultsMessage');

      let filteredFacts = facts.filter(fact => fact.fact.toLowerCase().includes(searchElement));

      factList.innerHTML = '';
      noResultsMessage.style.display = 'none';

      if (filteredFacts.length === 0) {
        noResultsMessage.style.display = 'block';
      } else {
        filteredFacts.forEach((fact, index) => {
          const listItem = document.createElement('li');
          listItem.textContent = fact.fact;

          // Add event listener to redirect to detail page on click
          listItem.addEventListener('click', () => {
            showDetailPage(index);
          });

          factList.appendChild(listItem);
        });
      }
    }

    // Fetch the facts and show them on page load
    document.addEventListener('DOMContentLoaded', () => {
      fetchFacts();
    });
    
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', searchFacts);