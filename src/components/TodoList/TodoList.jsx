import React from 'react';
import css from './TodoList.module.css';

export default function TodoList({
  newDateforComparison,
  deliteTodo,
  todos,
  toggleCompleted,
}) {
  let dateTodoDeadline = [];

  if (todos.length) {
    todos.map(todo => {
      let x = Number(todo.date.split('.').reverse().join(''));
      if (newDateforComparison > x || newDateforComparison.length < x.length) {
        return dateTodoDeadline.push(true);
      } else {
        return dateTodoDeadline.push(false);
      }
    });
  }

  return (
    <>
      {todos && (
        <ul className={css.todo_list}>
          {todos.map(
            ({ id, title, text, completed, file, date, fileName }, index) => (
              <li
                className={`${css.todo_item} ${
                  completed && css.todo_item__completed
                } 
           `}
                key={id}
              >
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={() => toggleCompleted(id, index)}
                />

                <h3>{title}</h3>
                <p>{text}</p>
                {date && (
                  <div>
                    {dateTodoDeadline[index] ? (
                      <p className={css.deadLineFail}> Expired Deadline:</p>
                    ) : (
                      <p>Deadline:</p>
                    )}
                    <p>{date}</p>
                  </div>
                )}

                {file && (
                  <>
                    <p> Прикрепленные файлы:</p>

                    <a href={file}>{fileName}</a>
                  </>
                )}
                <button onClick={() => deliteTodo(id, fileName)}>
                  Удалить
                </button>
              </li>
            )
          )}
        </ul>
      )}
    </>
  );
}
