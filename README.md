# 🧠 Task List with Priority — React App

Это расширенное приложение **Task List**, написанное на **React**, с поддержкой:

- 📌 Приоритетов задач (High / Medium / Low)
- 🗓 Сортировки по дате и приоритету (по возрастанию/убыванию)
- ✅ Отдельного списка выполненных задач
- 🎛 Управления отображением секций (форма, список, завершённые задачи)
- 💾 Сохранения данных в `localStorage`

---

## 🚀 Основной функционал

- 📋 Добавление задачи с названием, приоритетом и сроком выполнения
- ✅ Отметка задачи как выполненной
- ❌ Удаление задачи
- 🔃 Сортировка задач по дате и приоритету (в обе стороны)
- 📂 Разделение задач: активные / завершённые
- 🧩 Управление отображением секций с задачами и формой
- 💾 Автоматическое сохранение и загрузка данных из `localStorage`

---

## ⚙️ Технологии

- React (v18+)
- Хуки: `useState`, `useEffect`
- Встроенное хранилище браузера: `localStorage`
- Чистый CSS (для стилизации компонентов)

---

## 🧩 Структура компонентов

- `App` — основной компонент приложения
- `TaskForm` — форма добавления задачи
- `TasksList` — список активных задач
- `CompletedTasksList` — список выполненных задач
- `TaskItem` — отдельный элемент задачи

---

## 🧠 Логика сортировки

Сортировка по дате (`deadline`) или приоритету (`priority`) выполняется по состояниям `sortType` и `sortOrder`:

```js
if (sortType === "priority") {
  const priorityOrder = { High: 1, Medium: 2, Low: 3 };
  return sortOrder === "asc"
    ? priorityOrder[a.priority] - priorityOrder[b.priority]
    : priorityOrder[b.priority] - priorityOrder[a.priority];
} else {
  return sortOrder === "asc"
    ? new Date(a.deadline) - new Date(b.deadline)
    : new Date(b.deadline) - new Date(a.deadline);
}
```

---

## 📦 Установка и запуск

```bash
git clone https://github.com/your-username/task-list-priority.git
cd task-list-priority
npm install
npm start
```

---

## 🌟 Идеи для развития

- ✏️ Редактирование задач
- 🔔 Уведомления о приближении дедлайна
- ☁️ Синхронизация с сервером/API
- 📊 График приоритетов и дедлайнов
- 🌙 Темная тема

---

## 🪪 Лицензия

Этот проект распространяется под лицензией MIT.

