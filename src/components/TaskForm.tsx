import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react'

//CSS
import styles from "./TaskForm.module.css";

// Interface
import {ITask} from '../interfaces/Task';


interface Props {
  btnText: string
  taskList: ITask[]
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>
  task?: ITask | null;
  handleUpdate?(id:  number, title: string, difficulty: number|null): void;
}

// React.Dispatch: This is a type in React that represents a function that can be used to dispatch
// actions to change the state. It's often used with the useState hook in React.

// React.SetStateAction<ITask[]>: This type is a union of either a function or a value of type ITask[].
// When used in combination with useState, this allows you to either pass the new state directly as an array
// of ITask or provide a function that receives the current state and returns the new state.

const TaskForm = ({btnText, taskList, setTaskList, task, handleUpdate}: Props) => {

  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [difficulty, setDifficulty] = useState<number | null>(0);



  useEffect(()=> {
    if(task) {
      setId(task.id);
      setTitle(task.title)
      setDifficulty(task.difficulty)
    }
  }, [task])


  const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(handleUpdate) {

      handleUpdate(id, title, difficulty)

    } else {
      const id = Math.floor(Math.random() * 1000)

      const newTask: ITask = {id, title, difficulty}

      setTaskList!([...taskList, newTask])

      setTitle("")
      setDifficulty(null)
    }

    

  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if(e.target.name === "title") {
        setTitle(e.target.value)
      } else {
        const value = parseInt(e.target.value);
        setDifficulty( isNaN(value) ? null : value)
      }
  }

  return (
    <form onSubmit={addTaskHandler} className={styles.form}>
      <div className={styles.input_container}>
        <label htmlFor="title">Título</label>
        <input
          type="text"
          name="title"
          placeholder="Título da tarefa"
          onChange={handleChange}
          value={title}
        />
      </div>

      <div className={styles.input_container}>
        <label htmlFor="difficulty">Dificuldade</label>
        <input
          type="text"
          name="difficulty"
          placeholder="Dificuldade da tarefa"
          onChange={handleChange}
          value={difficulty !== null ? difficulty : ""}
        />
      </div>
      <input type="submit" value={btnText} />
    </form>
  );

}

export default TaskForm;