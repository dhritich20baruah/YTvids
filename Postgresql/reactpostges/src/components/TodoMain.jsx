import { useRecoilValue } from "recoil";
import { todoListAtom } from "../recoil/atom/todoAtom";

export const TodoMain = () => {
  const noteList = useRecoilValue(todoListAtom);

  return (
    <>
    <div>
      {noteList}
    </div>
    </>
  );
};
