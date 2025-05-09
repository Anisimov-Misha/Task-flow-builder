import '@xyflow/react/dist/style.css';
import { ReactFlow, Controls, useNodesState, useEdgesState, addEdge, type OnConnect } from '@xyflow/react';
import { useCallback, useEffect, useState } from 'react';
import { addTask, setInputValue, clearTasks } from './redux/inputValue/inputValueSlice';
import ResizableNodeSelected from './components/ResizableNodeSelected'; 
import { useAppDispatch, useAppSelector } from './types/hooks';
import { v4 as uuidv4 } from 'uuid'; 
import type { Node } from './types/Node';
import type { Edge } from './types/Edge';
import style from './styles/App.module.css'
 
export default function App() {
    // Змінні
    const [taskName, setTaskName] = useState<string | ''>('')

    const savedNodes = JSON.parse(localStorage.getItem('nodes') || '[]');
    const savedEdges = JSON.parse(localStorage.getItem('edges') || '[]');
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>(savedNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(savedEdges);
    
    const tasks = useAppSelector(state => state.input.tasks);
    const dispatch = useAppDispatch();
    
    const nodeTypes = {ResizableNodeSelected};

    // -------------------Функції------------------------------------------------------

    // З'єднання стрілок (edges)
    const onConnect: OnConnect = useCallback((params) => 
        setEdges((eds) => addEdge(params, eds)), [setEdges]
    );

    // Віправка форми (Взаємодія з Redux)
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!taskName.trim()) return;

        const id = uuidv4();

        dispatch(addTask({ id })); 
        dispatch(setInputValue({ id, value: taskName }));

        setNodes([...nodes, {
            id,
            position: { x: 0, y: 0 },
            data: { label: taskName, id},
            type: 'ResizableNodeSelected',
        }]);
        setTaskName('');
    }

    // Очистка всіх task
    const clearTasksHandler = () => {
        if (confirm('Точно очистити всі задачі?') === true){
            setNodes([]);
            setEdges([]);
            dispatch(clearTasks())
            localStorage.removeItem('nodes');
            localStorage.removeItem('edges');
        }
    }

    // Додавання у localStorage при взаємодії
    useEffect(() => {
        localStorage.setItem('nodes', JSON.stringify(nodes));
        localStorage.setItem('edges', JSON.stringify(edges));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [nodes, edges, tasks]);
 
  return (
    <>
        {/* Форма створення задачі та очищення */}
        <div className={style.nav}>
            <form onSubmit={handleSubmit}>
                <input 
                    placeholder='Enter task name...'
                    className={style.input}
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)} 
                />
                <button className={style.btn} type='submit'>Add Task</button>
            </form>
            <button className={style.btn} style={{ backgroundColor: 'rgb(255, 100, 100)' }} onClick={clearTasksHandler}>Clear all</button>
        </div>

        {/* Полотно React Flow */}
        <div className={style.container}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 4 }}
                minZoom={0.8}
                maxZoom={1.5}
            >
                <Controls />
            </ReactFlow>
        </div>
    </>
  );
}