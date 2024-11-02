function fetchUserProfile() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = {
        id: 1,
        name: 'Davis Jones',
        email: 'daveyjones@email.com'
      };
      //Randomly simulated failure
      if (Math.random() < 0.2){
        reject(new Error('Failed to fetch user profile'));
      } else {
        resolve(user);
      }
    }, 1000);
  });
}

async function fetchUserPosts(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
     const posts = [
      { id: 1, title: 'Post 1', content: 'Post 1 content' },
      { id: 2, title: 'Post 2', content: 'Post 2 content' }
     ];
    //Randomly simulated failure
    if (Math.random() < 0.1){
      reject(new Error('Failed to fetch user posts'));
    } else {
      resolve(posts);
    }
  }, 500);
});
}

async function fetchPostComments(postId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const comments = [
        { id: 1, text: 'comment 1' },
        { id: 2, text: 'comment 2' }
      ];
      //Randomly simulated failure
    if (Math.random() < 0.1){
      reject(new Error('Failed to fetch post comments'));
    } else {
      resolve(comments);
    }
  }, 500);
});
}

// Sequential Fetching
async function sequentialFetch(){
  try {
    const user = await fetchUserProfile();
    console.log('User profile retrieved', user);

    const posts = await fetchUserPosts(user.id);
    console.log('Posts retrieved:', posts);

    for (const post of posts) {
      const comments = await fetchPostComments(post.id);
      console.log(`Comments for post ${post.id}:`, comments);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Parallel Fetching
async function parallelFetch() {
  try {
    const [user, posts, comments] = await Promise.all([
      fetchUserProfile(),
      fetchUserPosts(1),
      fetchPostComments(1)
    ]);
    console.log('User, posts, and comments retrieved:', user, posts, comments);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Chaining Async Functions
async function getUserContent(userId){
  try {
    const user = await fetchUserProfile();
    console.log('User profile retrieved:', user);

    const posts = await fetchUserPosts(userId);
    console.log('Posts retrieved:', posts);
    posts.forEach(post => console.log(post));

    const comments = await Promise.all(posts.map(post => fetchPostComments(post.id)));
    console.log('Comments retrieved:', comments);
    comments.forEach(comment => console.log(comment));
      
    

    return { user, posts, comments };
  } catch (error) { 
    console.error('Error:', error.message);
    return null;
  }
}

// Calling the functions
sequentialFetch();
parallelFetch();
getUserContent();