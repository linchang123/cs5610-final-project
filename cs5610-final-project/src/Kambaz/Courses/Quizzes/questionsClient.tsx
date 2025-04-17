// Fetch all questions for a given quiz using the GET /api/quizzes/:quizId/questions route
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export async function fetchQuestionsForQuiz(quizId: string): Promise<any[]> {
    const response = await fetch(
      `${REMOTE_SERVER}/api/quizzes/${quizId}/questions`,
      {
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error(
        `Error fetching questions for quiz ${quizId}: ${response.statusText}`
      );
    }
    return response.json();
  }
  
  // Get a single question by its ID using the GET /api/questions/:questionId route
  export async function getQuestionById(questionId: string): Promise<any> {
    const response = await fetch(
      `${REMOTE_SERVER}/api/questions/${questionId}`,
      {
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error(
        `Error fetching question ${questionId}: ${response.statusText}`
      );
    }
    return response.json();
  }
  
  // Create a generic question for a specific quiz using the POST /api/quizzes/:quizId/questions route
  export async function createQuestionForQuiz(
    quizId: string,
    questionData: any
  ): Promise<any> {
    const response = await fetch(
      `${REMOTE_SERVER}/api/quizzes/${quizId}/questions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(questionData),
      }
    );
    if (!response.ok) {
      throw new Error(
        `Error creating question for quiz ${quizId}: ${response.statusText}`
      );
    }
    return response.json();
  }
  
  // Update an existing question using the PUT /api/questions/:questionId route
  export async function updateQuestion(
    questionId: string,
    questionData: any
  ): Promise<any> {
    const response = await fetch(
      `${REMOTE_SERVER}/api/questions/${questionId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(questionData),
      }
    );
    if (!response.ok) {
      throw new Error(
        `Error updating question ${questionId}: ${response.statusText}`
      );
    }
    return response.json();
  }
  
  // Delete a question using the DELETE /api/questions/:questionId route
  export async function deleteQuestion(questionId: string): Promise<any> {
    const response = await fetch(
      `${REMOTE_SERVER}/api/questions/${questionId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error(
        `Error deleting question ${questionId}: ${response.statusText}`
      );
    }
    return response.json();
  }
  
  // Specialized function: create a multiple-choice question (POST /api/questions/multiple-choice)
  export async function createMultipleChoiceQuestion(
    questionData: any
  ): Promise<any> {
    const response = await fetch(
      `${REMOTE_SERVER}/api/questions/multiple-choice`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(questionData),
      }
    );
    if (!response.ok) {
      throw new Error(
        `Error creating multiple-choice question: ${response.statusText}`
      );
    }
    return response.json();
  }
  
  // Specialized function: create a true/false question (POST /api/questions/true-false)
  export async function createTrueFalseQuestion(questionData: any): Promise<any> {
    const response = await fetch(
      `${REMOTE_SERVER}/api/questions/true-false`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(questionData),
      }
    );
    if (!response.ok) {
      throw new Error(
        `Error creating true/false question: ${response.statusText}`
      );
    }
    return response.json();
  }
  
  // Specialized function: create a fill-in-the-blank question (POST /api/questions/fill-in-blank)
  export async function createFillInBlankQuestion(
    questionData: any
  ): Promise<any> {
    const response = await fetch(
      `${REMOTE_SERVER}/api/questions/fill-in-blank`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(questionData),
      }
    );
    if (!response.ok) {
      throw new Error(
        `Error creating fill-in-the-blank question: ${response.statusText}`
      );
    }
    return response.json();
  }