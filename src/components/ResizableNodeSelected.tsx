import { memo } from 'react';
import { Handle, Position, NodeResizer, type NodeProps } from '@xyflow/react';
import { useAppDispatch, useAppSelector } from '../types/hooks';
import { setTrue } from '../redux/toogle/toggleSlice';
import { setInputValue } from '../redux/inputValue/inputValueSlice';
import Sidebar from './Sidebar';
 
const ResizableNodeSelected = ({ data, selected }: NodeProps) => {

    const sidebar = useAppSelector(state => state.toggle.value);
    const dispatch = useAppDispatch();

    const value = useAppSelector(state =>
        state.input.tasks.find(task => task.id === data.id)?.value || ''
    );

    const handleChange = (e: any) => {
        dispatch(setInputValue({ id: data.id, value: e.target.value }));
    };

  return (
    <>

        <NodeResizer
            color="black"
            isVisible={selected}
            minWidth={100}
            maxWidth={500}
            minHeight={35}
            maxHeight={35}
        />

        <Handle type="target" position={Position.Left} />

        <input 
            type='text' 
            style={{ border: 'none', resize: 'unset', overflow: 'hidden', width: '100%'}} 
            value={value}
            onChange={handleChange} 
            onClick={() => dispatch(setTrue(data.id))}
        />

        <Handle type="source" position={Position.Right}/>

        {sidebar && <Sidebar/>}    

    </>
  );
};
 
export default memo(ResizableNodeSelected);