import logo from "./images/title.png";
import empty from "./images/empty.svg";
import { useState } from "react";

function App() {
  return <TodoPage />;
}

function TodoPage() {
  return (
    <div className="container h-full">
      <Header />
      <TodoContainer />
    </div>
  );
}

function Header() {
  return (
    <nav className="flex flex-col md:flex-row items-center justify-between my-8 ">
      <img src={logo} alt="logo" width="300" />
      <div className="flex space-x-8 text-primary">
        <span>Hello,王曉明！</span>
        <span>登出</span>
      </div>
    </nav>
  );
}

function TodoContainer() {
  const [todo, setTodo] = useState([
    {
      id: 1,
      finish: true,
      content: "年假過得太開心",
    },
    {
      id: 2,
      finish: false,
      content: "開始補作業",
    },
    {
      id: 3,
      finish: false,
      content: "努力跟 react 培養感情",
    },
  ]);

  return (
    <div className="container">
      <AddTodo todo={todo} setTodo={setTodo} />
      {todo.length === 0 ? (
        <TodoEmpty />
      ) : (
        <TodoContent todo={todo} setTodo={setTodo} />
      )}
    </div>
  );
}

function AddTodo({ todo, setTodo }) {
  const [value, setValue] = useState("");
  const addTodo = () => {
    if (value === "") {
      return alert("請確實輸入內容");
    }
    setTodo([
      ...todo,
      {
        id: todo.length + 1,
        finish: false,
        content: value,
      },
    ]);
    setValue("");
  };
  return (
    <div className="relative mb-4">
      <input
        type="text"
        placeholder="新增待辦事項"
        className="h-12 rounded-lg pl-4 w-full bg-primary text-white focus:outline-none focus:border-black focus:ring-black focus:ring-2"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <a
        href="#"
        type="button"
        onClick={() => {
          addTodo();
        }}
        className="w-10 h-10 rounded-lg text-black bg-white absolute right-1 top-1 hover:bg-pink-200 hover:text-white p-2"
      >
        <span className="material-icons">add</span>
      </a>
    </div>
  );
}

function TodoEmpty() {
  return (
    <div>
      <div className="text-center py-10">目前無待辦事項</div>
      <img src={empty} alt="empty" className="mx-auto" />
    </div>
  );
}

function TodoContent({ todo, setTodo }) {
  // Tab CSS 狀態切換
  const [tab, setTab] = useState([
    {
      content: "全部",
      className: "tabActive",
    },
    {
      content: "待完成",
      className: "tabNormal",
    },
    {
      content: "已完成",
      className: "tabNormal",
    },
  ]);
  const tabClass = (index) => {
    const newTab = [...tab];
    newTab.map((newItem, newIndex) => {
      if (index === newIndex) {
        newItem.className = "tabActive";
      } else {
        newItem.className = "tabNormal";
      }
    });
    setTab(newTab);
  };

  // 刪除 Todo
  const delTodo = (index) => {
    const newTodo = [...todo];
    newTodo.splice(index, 1);
    setTodo(newTodo);
  };

  // 更改完成狀態
  const finishStatus = (id) => {
    const newTodo = [...todo];
    newTodo.map((newItem) => {
      if (id === newItem.id) {
        newItem.finish = !newItem.finish;
      } else {
        return;
      }
    });
    setTodo(newTodo);
  };

  // 清除已完成項目
  const cleanTodo = () => {
    let newTodo = todo.filter((item) => item.finish === false);
    setTodo(newTodo);
  };

  return (
    <div>
      <ul className="flex text-center mb-6">
        {tab.map((item, index) => {
          return (
            <li key={index} className={item.className}>
              <a
                href="#"
                className="block"
                onClick={() => {
                  tabClass(index);
                }}
              >
                {item.content}
              </a>
            </li>
          );
        })}
      </ul>

      <ul className="space-y-4 overflow-y-auto h-80">
        {/* 全部 */}
        {tab[0].className === "tabActive" &&
          todo.map(({ id, finish, content }, index) => {
            return (
              <li
                className="flex items-center justify-between px-8 py-4 bg-white border border-black rounded-lg"
                key={id}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 w-4 h-4"
                    checked={finish ? "checked" : null}
                    onChange={() => {
                      finishStatus(id);
                    }}
                  />
                  <span
                    className={
                      finish ? "text-gray-400 line-through" : "text-black"
                    }
                  >
                    {content}
                  </span>
                </div>
                <a
                  href="#"
                  className="flex items-center"
                  onClick={(e) => {
                    delTodo(index);
                  }}
                >
                  <span className="material-icons">delete_outline</span>
                </a>
              </li>
            );
          })}
        {/* 待完成 */}
        {tab[1].className === "tabActive" &&
          todo
            .filter((item) => item.finish === false)
            .map(({ id, finish, content }, index) => {
              return (
                <li
                  className="flex items-center justify-between px-8 py-4 bg-white border border-black rounded-lg"
                  key={id}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2 w-4 h-4"
                      checked={finish ? "checked" : null}
                      onChange={() => {
                        finishStatus(id);
                      }}
                    />
                    <span
                      className={
                        finish ? "text-gray-400 line-through" : "text-black"
                      }
                    >
                      {content}
                    </span>
                  </div>
                  <a
                    href="#"
                    className="flex items-center"
                    onClick={(e) => {
                      delTodo(index);
                    }}
                  >
                    <span className="material-icons">delete_outline</span>
                  </a>
                </li>
              );
            })}
        {/* 已完成 */}
        {tab[2].className === "tabActive" &&
          todo
            .filter((item) => item.finish === true)
            .map(({ id, finish, content }, index) => {
              return (
                <li
                  className="flex items-center justify-between px-8 py-4 bg-white border border-black rounded-lg"
                  key={id}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2 w-4 h-4"
                      checked={finish ? "checked" : null}
                      onChange={() => {
                        finishStatus(id);
                      }}
                    />
                    <span
                      className={
                        finish ? "text-gray-400 line-through" : "text-black"
                      }
                    >
                      {content}
                    </span>
                  </div>
                  <a
                    href="#"
                    className="flex items-center"
                    onClick={(e) => {
                      delTodo(index);
                    }}
                  >
                    <span className="material-icons">delete_outline</span>
                  </a>
                </li>
              );
            })}
      </ul>
      <div className="flex items-center justify-between px-8 py-4">
        <span>
          {todo.filter((item) => item.finish === false).length} 個待完成項目
        </span>
        <a
          href="#"
          className="block hover:text-primary"
          onClick={(e) => {
            cleanTodo();
          }}
        >
          清除已完成項目
        </a>
      </div>
    </div>
  );
}

export default App;