import { useState } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
// import { v4 as uuidv4 } from 'uuid';
import css from './TodoEditor.module.css';
import Input from '../Input/Input';

export default function TodoEditor({ addTodo }) {
  const [titleTodo, setTitleTodo] = useState('');
  const [textTodo, setTextTodo] = useState('');
  const [fileTodo, setFileTodo] = useState(null);
  const [dateTodo, setDateTodo] = useState('');

  const dayjs = require('dayjs');
  dayjs.extend(customParseFormat);

  const setForm = e => {
    const { files, value, name, valueAsDate } = e.target;
    // console.log(valueAsDate.toLocaleString());

    switch (name) {
      case 'title':
        setTitleTodo(value);
        break;
      case 'text':
        setTextTodo(value);
        break;
      case 'file':
        setFileTodo(files[0]);
        break;
      case 'date':
        setDateTodo(valueAsDate.toLocaleString());

        break;
      default:
        return;
    }
  };

  const submitForm = e => {
    e.preventDefault();

    //переводм формат даты с помощью dayjs
    let newDate = dayjs(dateTodo, 'DD-MM-YYYY')
      .add(3, 'h')
      .format('DD.MM.YYYY');

    // создаем новую заметку
    const newTodo = {
      title: titleTodo,
      text: textTodo,
      completed: false,
      file: fileTodo,
      date: newDate,
    };

    console.log(newDate);

    addTodo(newTodo);
    // отчищаем state после отправки созданной заметки
    setTitleTodo('');
    setTextTodo('');
    setFileTodo(null);
    // setDateTodo('')
  };

  return (
    <form className={css.form} onSubmit={submitForm}>
      <Input
        titleTodo={titleTodo}
        textTodo={textTodo}
        inputValue={fileTodo}
        handleImputValue={setForm}
        dateTodo={dateTodo}
      />
      <button className={css.btnCreate} onSubmit={submitForm}>
        Создать
      </button>
    </form>
  );
}
