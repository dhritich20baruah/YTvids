import { useRecoilValue } from "recoil";
import { todoListAtom } from "../recoil/atom/todoAtom";

export const TodoMain = () => {
  const todoList = useRecoilValue(todoListAtom);
  console.log(todoList)

  return (
    <>
    <div>
      {todoList.map((item)=>{
        return(
          <p key={item.id}>{item.note}</p>
        )
      })}
    </div>
    </>
  );
};
