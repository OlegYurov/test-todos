import { useState, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import TodoEditor from './components/TodoEditor/TodoEditor.jsx';
import { db, storage } from './firebase';
import { uid } from 'uid';
import * as allStorage from 'firebase/storage';
import { set, ref, onValue, remove, update } from 'firebase/database';

//приведение new Date к числу для сравнения с  Deadline
const handeleData = () => {
  const year = new Date().getFullYear().toString();
  const month = (new Date().getMonth() + 1).toString();

  let date = new Date().getDate().toString();
  if (date.length < 2) {
    date = String(0 + date);
  }
  return Number(year + month + date);
};

console.log(handeleData());

function App() {
  const [todos, setTodos] = useState([]);
  const [newDate, setNewDate] = useState(handeleData());

  const storageFromStorage = allStorage.getStorage();
  const refStorage = allStorage.ref(storageFromStorage, 'files');

  // write( записываем данные в fireBase)
  const writeToDatabase = newTodo => {
    const uuid = uid();
    const fileTodo = newTodo.file;

    console.log(fileTodo);
    (async () => {
      if (fileTodo !== null) {
        const refFile = allStorage.ref(
          storageFromStorage,
          `files/${fileTodo.name + uuid}`
        );

        await allStorage.uploadBytes(refFile, fileTodo).then(snapshot => {
          //возвращает мета данные
          // console.log(snapshot);
        });

        await set(ref(db, `/${uuid}`), {
          ...newTodo,
          file: fileTodo.name + uuid,
          fileName: fileTodo.name,
          id: uuid,
        });
      } else {
        set(ref(db, `/${uuid}`), {
          ...newTodo,
          id: uuid,
        });
      }
    })();
  };

  // read;( считываем данные в fireBase)
  useEffect(() => {
    onValue(ref(db), snapshot => {
      setTodos([]);
      const data = snapshot.val();

      console.log(data);
      if (data !== null) {
        // setTodos([]);
        Object.values(data).map(todo => {
          // обновляем todos если прикреплен файл,
          //проверка длины при ререндере, после изменений чекбокса,в fileTodo
          // лежит ссылка, а не имя файла.

          if (todo.file && todo.file.length < 50) {
            console.log(todo.file);
            (async () => {
              try {
                const refItemStorage = allStorage.ref(
                  refStorage,
                  `${todo.file}`
                );
                const resUrl = await allStorage.getDownloadURL(refItemStorage);

                console.log(resUrl);
                const todoFile = await {
                  ...todo,
                  file: resUrl,
                };
                setTodos(prevTodos => [...prevTodos, todoFile]);
              } catch (error) {
                console.log(error);
              }
            })();
            // обновляем todos без файла
          } else setTodos(prevTodos => [...prevTodos, todo]);
        });
      }
    });
    console.log('i fire once');
  }, []);

  //delete (удаляем заметку, и файл при наличии)
  const hundleDelete = (id, fileName) => {
    remove(ref(db, `/${id}`));
    console.log(id);
    if (fileName) {
      console.log(fileName);
      const desertRef = allStorage.ref(refStorage, `${fileName + id}`);
      allStorage
        .deleteObject(desertRef)
        .then(() => {
          console.log('файл удален');
        })
        .catch(error => {
          // Uh-oh, an error occurred!
          console.log('ошибка при удалении файла');
        });
    }
  };

  //change (обновляем статус чекбокса)
  const toggleCompleted = (id, index) => {
    // console.log(id,.completed);
    const checkTodo = todos[index];

    update(ref(db, `/${id}`), {
      ...checkTodo,
      completed: !checkTodo.completed,
    });
  };
  console.log(todos);
  return (
    <div className="App">
      <h1 className="hero-title">Todo-list</h1>
      <TodoEditor addTodo={writeToDatabase} />

      {todos && (
        <TodoList
          todos={todos}
          deliteTodo={hundleDelete}
          toggleCompleted={toggleCompleted}
          newDateforComparison={newDate}
        />
      )}
    </div>
  );
}

export default App;
