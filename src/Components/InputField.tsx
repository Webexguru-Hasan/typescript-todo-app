import React, { FC, FormEvent, useRef } from "react";
import "./style.css";

interface props {
  toDo: string;
  setToDo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: FormEvent) => void;
}

const InputField: FC<props> = ({ toDo, setToDo, handleAdd }) => {
  let inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <form
        className="input"
        onSubmit={(e) => {
          handleAdd(e);
          inputRef.current?.blur();
        }}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter a Text"
          className="input__box"
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
        />
        <button className="input__submit" type="submit">
          Go
        </button>
      </form>
    </>
  );
};

export default InputField;
