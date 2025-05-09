import ReactDOM from 'react-dom';
import { useAppDispatch, useAppSelector } from '../types/hooks';
import { setInputValue } from '../redux/inputValue/inputValueSlice';
import { setFalse } from '../redux/toogle/toggleSlice';
import style from '../styles/Sidebar.module.css';

export default function Sidebar() {

    const activeId = useAppSelector(state => state.toggle.activeTaskId);

    const value = useAppSelector(state =>
        state.input.tasks.find(task => task.id === activeId)?.value || ''
    );
    const dispatch = useAppDispatch();

    const handleChange = (e: any) => {
        dispatch(setInputValue({ id: activeId, value: e.target.value }));
    };

  return ReactDOM.createPortal(
    <div className={style.container}>
        <div className={style.title}>Change title: </div>
            <input 
                type="text" 
                className={style.input}
                value={value}
                onChange={handleChange}
            />
        <button className={style.closeBtn} onClick={() => dispatch(setFalse())}>x</button>
        <p style={{marginTop: '20px', fontWeight: '700', lineHeight: '1.4', color: 'gray'}}>Щоб видалити задачу натисніть на край цієї задачі та кнопку <span style={{color: 'red', fontWeight: '700'}}>Delete</span></p>
    </div>,
    document.body
  );
}
