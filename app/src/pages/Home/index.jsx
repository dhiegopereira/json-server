import './styles.css';
import * as React from 'react';
import api from '../../services/api'

export default function Home() {

    const [tasks, setTasks] = React.useState([]);
    const [name, setName] = React.useState('');

    const getTasks = async () => {
        const response = await api.get('/tasks');
        console.log(response);
        setTasks(response.data);
    }

    React.useEffect(() => {
        getTasks()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post('/tasks', { name });
        setName('');
        await getTasks();
    }

    const handleDelete = async (id) => {
        await api.delete(`/tasks/${id}`);
        await getTasks();
    }

    return (
        <div className="page-content page-container" id="page-content">
            <div className="container">
                <div className="card">
                    <h1 className="project-title" id="title">
                        Aprendendo React
                    </h1>
                    <div className="card-body">
                        <h4 className="card-title">Todo List</h4>
                        <div className="add-items">
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    className="form-control add-items-input"
                                    placeholder="Adicionar tarefa"
                                    id="todo-input"
                                    name='name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <button className="add add-items-btn" id="add">
                                    <i className="fa fa-plus-circle"></i>
                                </button>
                            </form>
                        </div>

                        <div className="list-wrapper">
                            <ul className="todo-list">
                                {
                                    tasks.map(task => (
                                        <li key={task.id} className="todo-list-element">
                                            <span className="todo-list-element-title">{task.name}</span>
                                            <span onClick={() => handleDelete(task.id)} className="todo-list-element-trash">
                                                <i className="fa fa-trash"></i>
                                            </span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}