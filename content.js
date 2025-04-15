// content.js
function extractNumber() {
  const divWithStats = document.querySelector('div[aria-label*="view"]');

  if (!divWithStats) {
    return { likes: null, views: null };
  }

  const ariaLabel = divWithStats.getAttribute('aria-label');

  // Extract likes using regex
  const likesMatch = ariaLabel.match(/(\d+)\s+likes?/i) ? ariaLabel.match(/(\d+)\s+likes?/i) : ariaLabel.match(/(\d+)\s+like?/i);
  const likes = likesMatch ? parseInt(likesMatch[1], 10) : 0;

  // Extract views using regex
  const viewsMatch = ariaLabel.match(/(\d+)\s+views?/i) ? ariaLabel.match(/(\d+)\s+views?/i) : ariaLabel.match(/(\d+)\s+view?/i);
  const views = viewsMatch ? parseInt(viewsMatch[1], 10) : 0;

  const repostsMatch = ariaLabel.match(/(\d+)\s+reposts?/i) ? ariaLabel.match(/(\d+)\s+reposts?/i) : ariaLabel.match(/(\d+)\s+repost?/i);
  const reposts = repostsMatch ? parseInt(repostsMatch[1], 10) : 0;

  const repliesMatch = ariaLabel.match(/(\d+)\s+replies?/i) ? ariaLabel.match(/(\d+)\s+replies?/i) : ariaLabel.match(/(\d+)\s+reply?/i);
  const replies = repliesMatch ? parseInt(repliesMatch[1], 10) : 0;

  const bookmarksMatch = ariaLabel.match(/(\d+)\s+bookmarks?/i) ? ariaLabel.match(/(\d+)\s+bookmarks?/i) : ariaLabel.match(/(\d+)\s+bookmark?/i);
  const bookmarks = bookmarksMatch ? parseInt(bookmarksMatch[1], 10) : 0;


  return { likes, views, reposts, replies, bookmarks };
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

  const weightedBookmarks = numsToDisplay["bookmarks"] * 2

  const weightedLikes = numsToDisplay["likes"] * 1.5

  const weightedReposts = numsToDisplay["reposts"] * 3

  const weightedReplies = numsToDisplay["replies"] * 5

  const finalDisplayValue = (( weightedLikes + weightedBookmarks + weightedReposts + weightedReplies / numsToDisplay["views"]) / 100 ).toFixed(2)
  
  // Create a new span element with the number
  const newNumberSpan = document.createElement('span');
  newNumberSpan.className = 'view-to-likes-extension r-37j5jr';
  newNumberSpan.textContent = "Engagement to Views points: " + finalDisplayValue; // The number you want to display
  
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
  console.log(numsToDisplay)
  addNumberNextToViews(numsToDisplay)
});