import css from './Input.module.css';

export default function Input({
  inputValue,
  textTodo,
  titleTodo,
  dateTodo,
  handleImputValue,
}) {
  return (
    <>
      <h3>Title todo</h3>
      <input
        className={css.inputTitle}
        type="text"
        maxLength="25"
        value={titleTodo}
        onChange={handleImputValue}
        placeholder="Enter title..."
        name="title"
        required
      />

      <h3>Text todo</h3>
      <textarea
        spellCheck="false"
        className={css.textArea}
        type="text"
        cols="25"
        rows="5"
        maxLength="100"
        value={textTodo}
        onChange={handleImputValue}
        placeholder="Enter text..."
        name="text"
        required
      ></textarea>

      <h3>Deadline</h3>
      <input
        className={css.inputTitle}
        type="date"
        maxLength="25"
        // value={}
        onChange={handleImputValue}
        placeholder=""
        name="date"
        max="2025-12-31"
        required
      />

      <h3>Add files</h3>
      <input type="file" name="file" onChange={handleImputValue} />
    </>
  );
}
