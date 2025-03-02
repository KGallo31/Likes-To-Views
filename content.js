// content.js
function extractNumber() {
  const divWithStats = document.querySelector('div[aria-label*="likes"][aria-label*="views"]');

  if (!divWithStats) {
    return { likes: null, views: null };
  }

  const ariaLabel = divWithStats.getAttribute('aria-label');

  // Extract likes using regex
  const likesMatch = ariaLabel.match(/(\d+)\s+likes?/i);
  const likes = likesMatch ? parseInt(likesMatch[1], 10) : null;

  // Extract views using regex
  const viewsMatch = ariaLabel.match(/(\d+)\s+views?/i);
  const views = viewsMatch ? parseInt(viewsMatch[1], 10) : null;

  return { likes, views };
}

function addNumberNextToViews(numsToDisplay) {
  // Find the element containing "Views" text
  const viewsElements = document.querySelectorAll('span.css-1jxf684');
  let viewsContainer = null;
  
  // Find the specific span that contains "Views"
  for (const element of viewsElements) {
      if (element.textContent.trim() === "Views") {
          viewsContainer = element.closest('.css-146c3p1'); // Get the parent container
          break;
      }
  }
  
  if (!viewsContainer) {
      console.error("Views element not found");
      return;
  }

  const finalDisplayValue = ((numsToDisplay["likes"] / numsToDisplay["views"]) * 100).toFixed(2)
  
  // Create a new span element with the number
  const newNumberSpan = document.createElement('span');
  newNumberSpan.className = 'view-to-likes-extension r-37j5jr';
  newNumberSpan.textContent = "Likes to Views: " + finalDisplayValue; // The number you want to display
  
  // Insert the new element after the views container
  viewsContainer.parentNode.insertBefore(newNumberSpan, viewsContainer.nextSibling);
}



// Listen for clicks anywhere on the page.
document.addEventListener("click", (event) => {
  const post = event.target.closest("article");
  if (!post) return;
  if (document.getElementsByClassName("view-to-likes-extension").length > 0){
    return;
  }
  const numsToDisplay = extractNumber()
  addNumberNextToViews(numsToDisplay)
});