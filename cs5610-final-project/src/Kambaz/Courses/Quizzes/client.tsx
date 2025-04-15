// Function to fetch all quizzes for a course
// I hard coded the URL to test, fell free to change it
export async function fetchQuizzesForCourse(courseId: string): Promise<any[]> {
  const response = await fetch(
    `http://localhost:3000/api/courses/${courseId}/quizzes`,
    {
      credentials: "include", // if you are using session cookies
    }
  );
  if (!response.ok) {
    throw new Error(
      `Error fetching quizzes for course ${courseId}: ${response.statusText}`
    );
  }
  return response.json();
}

// Function to get a single quiz by its ID
export async function getQuizById(quizId: string): Promise<any> {
  const response = await fetch(`http://localhost:3000/api/quizzes/${quizId}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`Error fetching quiz ${quizId}: ${response.statusText}`);
  }
  return response.json();
}

// Function to create a new quiz for a course
export async function createQuiz(
  courseId: string,
  quizData: any
): Promise<any> {
  const response = await fetch(
    `http://localhost:3000/api/courses/${courseId}/quizzes`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(quizData),
    }
  );
  if (!response.ok) {
    throw new Error(
      `Error creating quiz for course ${courseId}: ${response.statusText}`
    );
  }
  return response.json();
}

// Function to update an existing quiz by its ID
export async function updateQuiz(quizId: string, quizData: any): Promise<any> {
  const response = await fetch(`http://localhost:3000/api/quizzes/${quizId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(quizData),
  });
  if (!response.ok) {
    throw new Error(`Error updating quiz ${quizId}: ${response.statusText}`);
  }
  return response.json();
}

// Function to delete a quiz by its ID
export async function deleteQuiz(quizId: string): Promise<any> {
  const response = await fetch(`http://localhost:3000/api/quizzes/${quizId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`Error deleting quiz ${quizId}: ${response.statusText}`);
  }
  return response.json();
}

// Function to fetch the total points of a quiz
export async function fetchQuizPoints(quizId: string): Promise<number> {
  const response = await fetch(
    `http://localhost:3000/api/quizzes/${quizId}/points`,
    {
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error(
      `Error fetching points for quiz ${quizId}: ${response.statusText}`
    );
  }
  const data = await response.json();
  return data.totalPoints;
}
