document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('menu');
  const navigation = document.querySelector('.navigation');
  const gridBtn = document.getElementById('gridBtn');
  const listBtn = document.getElementById('listBtn');
  const membersGrid = document.getElementById('members-grid');
  const membersList = document.getElementById('members-list');

  // --- Navigation Toggle ---
  if (menuButton && navigation) {
      menuButton.addEventListener('click', () => {
          navigation.classList.toggle('open');
          // Change hamburger icon to 'X' or similar if desired
          menuButton.textContent = navigation.classList.contains('open') ? 'X' : '☰';
      });
  }

  // --- Footer Update Function ---
  function updateFooter() {
      const copyrightYear = document.getElementById('copyrightYear');
      const lastModified = document.getElementById('lastModified');
      if (copyrightYear) {
          copyrightYear.textContent = new Date().getFullYear();
      }
      if (lastModified) {
          lastModified.textContent = document.lastModified;
      }
  }
  updateFooter(); // Call once on initial load

  // --- Member Data Fetching and Display ---
  let allMembersData = []; // To store the fetched data globally for toggling

  /**
   * Fetches member data from members.json using async/await.
   * Populates both grid and list views and sets initial display.
   */
  async function loadMembers() {
      try {
          console.log('Attempting to fetch members.json...');
          // Fetch the JSON data
          const response = await fetch('data/members.json');

          // Check if the response was successful (status code 200-299)
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
          }

          // Parse the JSON data
          const data = await response.json();
          allMembersData = data.members; // Assuming the JSON has a 'members' array

          console.log('Members data fetched successfully:', allMembersData);

          // Clear any loading messages
          membersGrid.innerHTML = '';
          membersList.innerHTML = '';

          // Display members in both grid and list formats
          displayMembersGrid(allMembersData);
          displayMembersList(allMembersData);

          // Set initial view state: Grid view active, List view hidden
          membersGrid.classList.remove('hidden');
          membersList.classList.add('hidden');
          gridBtn.classList.add('active');
          listBtn.classList.remove('active');

      } catch (error) {
          console.error('Error fetching members:', error);
          // Display an error message to the user
          membersGrid.innerHTML = '<p class="error-message">Failed to load member data. Please ensure "data/members.json" exists and your page is served via a local web server (e.g., VS Code Live Server).</p>';
          membersList.innerHTML = ''; // Clear list view as well
      }
  }

  /**
   * Populates the grid container with member cards.
   * @param {Array} members - An array of member objects.
   */
  function displayMembersGrid(members) {
      membersGrid.innerHTML = ''; // Clear previous content
      members.forEach(member => {
          const card = document.createElement('div');
          card.classList.add('member-card');

          const image = document.createElement('img');
          image.src = `images/${member.image}`;
          image.alt = `Logo of ${member.name}`;
          // Fallback for missing images: Use a generic placeholder
          image.onerror = function() {
              this.onerror = null; // Prevent infinite loop if fallback also fails
              this.src = `https://placehold.co/120x120/cccccc/333333?text=${encodeURIComponent(member.name.charAt(0))}`; // Placeholder with first letter
          };

          const name = document.createElement('h2');
          name.textContent = member.name;

          const address = document.createElement('p');
          address.textContent = member.address;

          const phone = document.createElement('p');
          phone.textContent = member.phone;

          const website = document.createElement('p');
          const websiteLink = document.createElement('a');
          websiteLink.href = member.website;
          websiteLink.textContent = 'Visit Website';
          websiteLink.setAttribute('target', '_blank'); // Open in new tab for external links
          websiteLink.setAttribute('rel', 'noopener noreferrer'); // Security best practice
          website.appendChild(websiteLink);

          card.appendChild(image);
          card.appendChild(name);
          card.appendChild(address);
          card.appendChild(phone);
          card.appendChild(website);

          membersGrid.appendChild(card);
      });
  }

  /**
   * Populates the list container with member information.
   * @param {Array} members - An array of member objects.
   */
  function displayMembersList(members) {
      membersList.innerHTML = ''; // Clear previous content
      members.forEach(member => {
          const listItem = document.createElement('div');
          listItem.classList.add('member-list-item');

          const name = document.createElement('h2');
          name.textContent = member.name;

          const address = document.createElement('p');
          address.textContent = `Address: ${member.address}`;

          const phone = document.createElement('p');
          phone.textContent = `Phone: ${member.phone}`;

          const website = document.createElement('p');
          const websiteLink = document.createElement('a');
          websiteLink.href = member.website;
          websiteLink.textContent = 'Website';
          websiteLink.setAttribute('target', '_blank'); // Open in new tab
          websiteLink.setAttribute('rel', 'noopener noreferrer'); // Security best practice
          website.appendChild(websiteLink);

          listItem.appendChild(name);
          listItem.appendChild(address);
          listItem.appendChild(phone);
          listItem.appendChild(website);

          membersList.appendChild(listItem);
      });
  }

  // --- View Toggle Event Listeners ---
  gridBtn.addEventListener('click', () => {
      membersGrid.classList.remove('hidden');
      membersList.classList.add('hidden');
      gridBtn.classList.add('active');
      listBtn.classList.remove('active');
      console.log('Switched to Grid View');
  });

  listBtn.addEventListener('click', () => {
      membersGrid.classList.add('hidden');
      membersList.classList.remove('hidden');
      listBtn.classList.add('active');
      gridBtn.classList.remove('active');
      console.log('Switched to List View');
  });

  // Initial call to load members when the DOM is fully loaded
  loadMembers();
});