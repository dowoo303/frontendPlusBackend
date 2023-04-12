import axios from "axios";
import TodoCard from "./components/TodoCard";
import { useEffect, useState } from "react";
import CreateToDo from "./components/CreateToDo";

function App() {
  const [toDoList, setToDoList] = useState();

  const getToDoList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/todo`
      );

      if (response.status !== 200) {
        alert("요청을 불러오지 못했습니다.");
        return;
      }

      setToDoList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // useEffect가 비동기함수이기 때문에 async로 함수생성필요?
    // useEffect가 side effect이기 때문에 async를 이 안에 넣어줌?
    getToDoList();
  }, []); // [] 빈 추적 배열 = 처음에 렌더링 될 때 한번만 실행됨

  return (
    <div className="min-h-screen flex flex-col justify-start items-center pt-16 bg-gray-500 text-yellow-400 font-mono">
      <h1 className="text-4xl font-bold">AWESOME TO DO LIST 😎</h1>

      <div>
        <div className="mt-8 text-sm font-semibold">
          많은 인생의 실패자들이 포기할 때 자신이 얼마나 성공에 가까이
          있었는지를 모른다. - 토마스 A. 에디슨 -
        </div>
        <div className="text-xs">수신제가치국평천하(修身齊家治國平天下)</div>
      </div>
      <CreateToDo getToDoList={getToDoList} />
      <ul className="mt-16 flex flex-col w-1/2">
        {toDoList /* 값이 없을때를 대비 */ &&
          toDoList.map((v, i) => {
            return (
              <TodoCard
                key={i}
                title={v.title}
                isDone={v.isDone}
                index={i}
                getToDoList={getToDoList}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default App;
