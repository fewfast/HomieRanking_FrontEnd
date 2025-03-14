import { useEffect, useState } from "react";
import axios from "axios";

function QuizList() {
  const [get_quizzes, setQuizzes] = useState([]); // ใช้ useState เก็บข้อมูล

  // ใช้ useEffect เพื่อดึงข้อมูลเมื่อคอมโพเนนต์โหลด
  useEffect(() => {
    axios
      .get("http://localhost:3001/get_quizzes")
      .then((response) => {
        setQuizzes(response.data); // อัปเดต State
      })
      .catch((error) => console.error("Error fetching quizzes:", error));
  }, []);

  return (
    <div>
      <h1>Quizzes</h1>
      <ul>
        {get_quizzes.map((quiz, index) => (
          <li key={index}>
            <h3>{quiz.title}</h3>
            <p>{quiz.description}</p>
            <img src={quiz.thumbnail} alt="thumbnail" width="200" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizList;
